import {setupGlobals} from "./utils/setup";
import {Keypair, PublicKey} from "@solana/web3.js";
import {PAYER_ADMIN} from "../src/constants/keys";
import {sendAndConfirmRawTransaction, sendAndConfirmRawVersionedTransaction} from "../src";
import {expect} from "chai";
// import fs from "fs";
// import {explorerUrl} from "../src/utils/generic";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider } = setupGlobals();
    const collectionMint = Keypair.generate();
    const maxSize = 3;
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        name: "Collection Name",
        symbol: "Collection Symbol",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo",
        maxSize: maxSize
    }
    const seed = Math.floor(Math.random() * 100000)
    // const seed = 69420
    const renewalPrice = 1000_000_000_000
    const expiryDate = 3133634400 // 2069 4 20
    // const expiryDate = Math.floor(Number.MAX_SAFE_INTEGER / 1000)
    console.log("expirydate", Math.floor(Number.MAX_SAFE_INTEGER / 1000), 3133634400)
    const addGameReset = true;

    console.log("ruleSeed", seed);
    console.log("collectionMint", collectionMint.publicKey.toString());

    const mints: PublicKey[] = [];
    // const output: {id: string, mint: string, appendResetTx: string}[] = []

    it("Creates a new Rule", async () => {
        const tx = await burgerProvider.ephemeralRuleCreateTx({
            seed: seed,
            renewalPrice: renewalPrice,
            treasury: PAYER_ADMIN
        })
        const id = await sendAndConfirmRawTransaction(burgerProvider.provider.connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    });

    it("Create a collection", async () => {
        const tx = await burgerProvider.wnsGroupMintTx(collectionArgs)
        const id = await sendAndConfirmRawVersionedTransaction(burgerProvider.provider.connection, tx.instructions, wallet.publicKey, wallet, [collectionMint]);
        expect(id).to.not.be.empty;
    });

    it("Max mint nfts into collection", async () => {
        for(let i = 0; i < collectionArgs.maxSize; i++){
            const mint = Keypair.generate();
            console.log(`mint ${i + 1}`, mint.publicKey.toString());

            const mintArgs = {
                expiryDate: expiryDate.toString(),
                name: `Burger #${i + 1}`,
                symbol: "BB",
                uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo",
                groupMint: collectionMint.publicKey,
                mint: mint.publicKey,
                computeBudget: 600_000,
                addGameReset,
                ephemeralDataSeed: seed,
            }
            const mintTx = await burgerProvider.wnsMemberMintTx(mintArgs);

            const id = await sendAndConfirmRawVersionedTransaction(
                burgerProvider.provider.connection, [
                    ...mintTx.instructions,
                ], wallet.publicKey, wallet, [mint]
            );

            expect(id).to.not.be.empty;
            mints.push(mint.publicKey)
        }
        expect(mints.length).to.be.equal(collectionArgs.maxSize);
    });


    // it("Resets token and adds rule", async () => {
    //     for(let i = 0; i < collectionArgs.maxSize; i++){
    //         const mint = mints[i]
    //
    //         // Membership
    //         const membershipTx = await burgerProvider.ephemeralDataAddTx({
    //             membership: mint,
    //             time: expiryDate,
    //             seed: seed,
    //             payer: wallet.publicKey,
    //         });
    //
    //         const resetTx = await burgerProvider.tokenGameResetTx({mint})
    //         const id = await sendAndConfirmRawVersionedTransaction(
    //             burgerProvider.provider.connection, [
    //                 ...membershipTx.instructions,
    //                 ...resetTx.instructions
    //             ], wallet.publicKey, wallet, []
    //         );
    //         expect(id).to.not.be.empty;
    //         output.push({id: `${i + 1}`, mint: mint.toString(), appendResetTx: explorerUrl(burgerProvider.provider.connection, id)})
    //     }
    //
    //     expect(output.length).to.be.equal(collectionArgs.maxSize);
    //
    //     // Create collection config file
    //     const collectionJSON = {
    //         key: collectionMint.publicKey.toString(),
    //         mints: output,
    //         seed: seed,
    //     };
    //     fs.mkdirSync("tests/.output", { recursive: true });
    //     fs.writeFileSync(
    //         "tests/.output/append.json",
    //         JSON.stringify(collectionJSON, null, 2)
    //     );
    // });

});