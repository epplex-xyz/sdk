import {setupGlobals} from "./utils/setup";
import {Keypair, PublicKey} from "@solana/web3.js";
import {PAYER_ADMIN} from "../src/constants/keys";
import {sendAndConfirmRawTransaction, sendAndConfirmRawVersionedTransaction} from "../src";
import {expect} from "chai";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider } = setupGlobals();
    const collectionMint = Keypair.generate();
    const maxSize = 2;
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        name: "Name \uD83C\uDF54",
        symbol: "Collection Symbol",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo",
        maxSize: maxSize
    }
    const seed = Math.floor(Math.random() * 100000)
    // const seed = 69420
    const renewalPrice = 1000_000_000_000
    const expiryDate = 3133677600 // 2069 4 20
    const addGameReset = true;

    console.log("ruleSeed", seed);
    console.log("collectionMint", collectionMint.publicKey.toString());

    const mints: PublicKey[] = [];
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

});