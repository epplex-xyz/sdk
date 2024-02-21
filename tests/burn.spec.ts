import {CONNECTION, getSetup, setupGlobals} from "./setup";
import {
    getProgramDelegate,
    sendAndConfirmRawTransaction
} from "../src";
import {BN} from "@coral-xyz/anchor";
import {sleep} from "./testUtils";
import {PublicKey} from "@solana/web3.js";
import {expect} from "chai";

/*
******* SETUP
*/

// 3 second expiry
const expiryTime = 3;
const expiryDate: string = (Math.floor((new Date()).getTime() / 1000) + expiryTime).toString()


const nTokens = 1
const collection = {
    collectionMintNme: "SDK Test",
    collectionMintSymbol: "SDK TEST",
    collectionMintUri: "https://example.com",
    collectionName: "epplex",
    collectionSymbol: "EPX",
    collectionSize: nTokens,
}

describe('Test Burn', () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    let globalCollectionData;
    let mints: PublicKey[] = [];

    it('Create collection mint and config', async () => {
        console.log("\n \n");
        globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(coreProvider.getGlobalCollectionConfig());

        const tx = await coreProvider.createCollectionTx({
            collectionConfigAddress: coreProvider.getCollectionConfig(globalCollectionData.collectionCounter),
            mint: coreProvider.getCollectionMint(globalCollectionData.collectionCounter),
            collectionMintName: collection.collectionMintNme,
            collectionMintSymbol: collection.collectionMintSymbol,
            collectionMintUri: collection.collectionMintUri,
            collectionName: collection.collectionName,
            collectionSize: collection.collectionSize,
            collectionSymbol: collection.collectionSymbol,
            authority: getProgramDelegate(),
        });

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it('Create token mint into collection', async () => {
        const collectionConfigAddress = coreProvider.getCollectionConfig(globalCollectionData.collectionCounter)
        const collectionConfigData = await coreProvider
            .program
            .account
            .collectionConfig
            .fetch(collectionConfigAddress);
        const mintCount = Number(collectionConfigData.mintCount);

        for (let i = 0; i < nTokens; i++) {
            const newMintCount = mintCount + i;
            const mint = coreProvider.getMint(
                globalCollectionData.collectionCounter,
                new BN(newMintCount)
            );

            const tx = await burgerProvider.createCollectionMintTx({
                expiryDate,
                collectionId: Number(globalCollectionData.collectionCounter),
                mint,
                name: `${collection.collectionMintNme} ${i + 1}`,
                symbol: collection.collectionMintSymbol,
                uri: collection.collectionMintUri,
            })
            await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
            mints.push(mint);
        }
    });

    it('Burn token should FAIL', async () => {
        const tx = await burgerProvider.burnTokenTx({
            mint: mints[0],
            owner: wallet.publicKey,
            useGameConfig: false
        });
        const res = await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
        expect(res).to.be.equal(null);
    });


    it('Burn token SUCCESS', async () => {
        console.log("Sleeping for 4 seconds");
        await sleep(4_000);

        const tx = await burgerProvider.burnTokenTx({
            mint: mints[0],
            owner: wallet.publicKey,
            useGameConfig: false
        });
        const res = await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
        console.log("res", res)
        expect(res).to.not.be.empty;
    });

});
