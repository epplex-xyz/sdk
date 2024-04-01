import {sendAndConfirmRawTransaction} from "../src";
import {setupGlobals} from "./utils/setup";
import {expect} from "chai";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {Keypair, Transaction} from "@solana/web3.js";
import {setupCollection} from "./setupUtils";
import {readJson} from "./utils/keyUtils";
import {importKey, generateNonce, encrypt} from "../src";
import {createApproveCheckedInstruction, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {getAtaAddress, getAtaAddressPubkey} from "../lib/utils/generic";

/*
    Ephemerality:
    0. Create rule
    1. Create collection mint
    2. Mint NFTs
        - Could add the ephemeral data at the same time - could add a flag for this
        - Or all at once after mint has finished
    3. Each NFT needs the rule as well
    5. Start game (DONE)
        - add pda from collectionMint
        - add rule seed
 */

describe("Testing Game Flow: mint ->\n create ->\n reset mints ->\n start ->\n vote ->\n evaluate ->\n burn ->\n end ->\n close", () => {
    const {wallet, burgerProvider, coreProvider, wenProvider} = setupGlobals()
    const connection = burgerProvider.provider.connection;

    const seed = Math.floor(Math.random() * 100000)
    const collectionMint = Keypair.generate();

    const newTimestamp = (Math.floor((new Date()).getTime() / 1000 + 3600 * 12)).toString()
    const now = (Math.floor((new Date()).getTime() / 1000)).toString()
    const metadata = getDefaultMetadata({})
    const maxSize = 2;
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }

    const encryptKeypair: {public: string, private: string} = readJson("/Users/Mac/Documents/Crypto/epPlex-xyz/burger-game/encryptKeypair.json")
    const useEncrypt = true

    // Setup
    const mints = setupCollection(
        burgerProvider, coreProvider, collectionMint, collectionArgs, metadata, wallet, undefined, seed
    )

    const freeze = Keypair.generate()

    it('Token Game Immunity Mint[1] ', async () => {
        console.log("mint asodmfkoasdmfkoas d", mints[1])
        const tx = await burgerProvider.tokenGameImmunityTx({mint: mints[1]});
        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
    });


    it("Start Game", async () => {
        const tx = await burgerProvider.gameStartTx({
            endTimestamp: Number(newTimestamp),
            voteType: { voteOnce: {} },
            inputType: { text: {} },
            gamePrompt: "What is your favorite burger?",
            gameName: "Game1",
            isEncrypted: useEncrypt,
            publicEncryptKey: useEncrypt ? encryptKeypair.public : "",
            ruleSeed: seed,
            tokenGroup: collectionMint.publicKey
        });
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.not.be.empty;
    });


    it("Token Game vote fail due to encryption", async() => {
        // Perform test if we have encrypt, otherwise return
        if (!useEncrypt)
            return

        try {
            const tx = await burgerProvider.tokenGameVoteTx({mint: mints[0], message: "randomNonEncryptedMsg"})
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [], undefined, undefined, {skipPreflight: true})
        } catch (e) {
            console.log("Token vote failed")
        }
    })

    // it("Token Freeze before voting", async() => {
    //     const approveIx = createApproveCheckedInstruction(
    //         getAtaAddressPubkey(mints[0], wallet.publicKey),
    //         mints[0],
    //         freeze.publicKey,
    //         wallet.publicKey,
    //         1,
    //         0,
    //         undefined,
    //         TOKEN_2022_PROGRAM_ID,
    //     );
    //
    //     const freezeIx = await wenProvider.getFreezeNftIx({
    //         mint: mints[0].toBase58(),
    //         delegateAuthority: freeze.publicKey.toBase58(),
    //         payer: wallet.publicKey.toBase58(),
    //         authority: wallet.publicKey.toBase58(),
    //     });
    //
    //     const id = await sendAndConfirmRawTransaction(connection, new Transaction().add(...[approveIx, freezeIx]), wallet.publicKey, wallet, [freeze])
    //     expect(id).to.not.be.empty;
    // })

    it("Token Game vote", async() => {
        let message: string;
        if (useEncrypt) {
            const context = "node"
            const key = await importKey(encryptKeypair.public, "public", context);
            const data = {
                answer: "hello",
                nonce: generateNonce(undefined, context),
            };
            message = await encrypt(JSON.stringify(data), key, context);
        } else {
            message = "hello"
        }

        const tx = await burgerProvider.tokenGameVoteTx({mint: mints[0], message})
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    })

    // it("Token Freeze before voting", async() => {
    //     const thawIx = await wenProvider.getThawNftIx({
    //         mint: mints[0].toBase58(),
    //         delegateAuthority: freeze.publicKey.toBase58(),
    //         payer: wallet.publicKey.toBase58(),
    //         authority: wallet.publicKey.toBase58(),
    //     });
    //
    //     const id = await sendAndConfirmRawTransaction(connection, new Transaction().add(...[thawIx]), wallet.publicKey, wallet, [freeze])
    //     expect(id).to.not.be.empty;
    // })

    it("Force Game End: update endTime to now", async () => {
        const tx = await burgerProvider.gameUpdateTx({
            phaseStartTimestamp: null,
            phaseEndTimestamp: Number(now),
            voteType: { voteOnce: {} }
        });
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.not.be.empty;
    });

    it("Evaluate Game", async () => {
        const tx = await burgerProvider.gameEvaluateTx();
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.not.be.empty;
    });

    it('Try burn immunity token', async () => {
        try {
            const tx = await burgerProvider.tokenGameBurnTx({
                mint: mints[1],
                groupMint: collectionMint.publicKey,
                owner: wallet.publicKey,
                seed,
            });
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [], undefined, undefined, {skipPreflight: true});
        } catch (e) {
            console.log("Could not burn")
        }
    });

    it('Token Game Burn', async () => {
        const tx = await burgerProvider.tokenGameBurnTx({
            mint: mints[0],
            groupMint: collectionMint.publicKey,
            owner: wallet.publicKey,
            seed,
        });
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.not.be.empty;
    });

    it("End game", async () => {
        const tx = await burgerProvider.gameEndTx();
        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
    });

    it("Close Game", async () => {
        const tx = await burgerProvider.gameCloseTx();
        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
    });

});