import {sendAndConfirmRawTransaction} from "../src";
import {setupGlobals} from "./utils/setup";
import {expect} from "chai";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {Keypair} from "@solana/web3.js";
import {setupCollection} from "./setupUtils";
import {sleep} from "./utils/testUtils";

const newTimestamp = (Math.floor((new Date()).getTime() / 1000 + 3600 * 12)).toString()
const now = (Math.floor((new Date()).getTime() / 1000)).toString()

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
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    const collectionMint = Keypair.generate();
    const connection = burgerProvider.provider.connection;

    const metadata = getDefaultMetadata({})
    const maxSize = 1;
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }
    const seed = Math.floor(Math.random() * 100000)

    const mints = setupCollection(
        burgerProvider, coreProvider, collectionMint, collectionArgs, metadata, wallet, undefined, seed
    )
    // const mint = mints[0]; For some reason this is not possible

    /*
        Note game state has been default reset in setup collection
     */
    // it("Reset All Tokens (None gamestate)", async() => {
    //     const tx = await burgerProvider.tokenGameResetTx({mint: mints[0] })
    //     const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])
    //     expect(id).to.not.be.empty;
    // })

    it("Start Game", async () => {
        const tx = await burgerProvider.gameStartTx({
            endTimestamp: Number(newTimestamp),
            voteType: { voteOnce: {} },
            inputType: { text: {} },
            gamePrompt: "What is your favorite burger?",
            gameName: "Game1",
            isEncrypted: false,
            publicEncryptKey: "",
            ruleSeed: seed,
            tokenGroup: burgerProvider.getGroupAccountPda(collectionMint.publicKey)
        });
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.not.be.empty;
    });

    it("Token Game vote", async() => {
        const tx = await burgerProvider.tokenGameVoteTx({mint: mints[0], message: "hello"})
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    })

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
        await sleep(500);
        const tx = await burgerProvider.gameEvaluateTx();
        const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.not.be.empty;
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