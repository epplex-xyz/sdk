import {CONNECTION, getSetup} from "./setup";
import {
    getCollectionConfig,
    getCollectionMint,
    getGlobalCollectionConfig,
    getMint,
    getProgramDelegate,
    sendAndConfirmRawTransaction
} from "../src";
import {BN} from "@coral-xyz/anchor";
import {trySetupBurgerProgramDelegate, trySetupGlobalCollectionConfig} from "./testUtils";
import {PublicKey} from "@solana/web3.js";

/*
******* SETUP
*/
const {wallet, burgerProvider, coreProvider} = getSetup();

const expiryDate: string = (Math.floor((new Date()).getTime() / 1000) + 5).toString() // In 1 hour
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
    let globalCollectionData;
    let mints: PublicKey[] = [];

    trySetupGlobalCollectionConfig(coreProvider, wallet);
    trySetupBurgerProgramDelegate(burgerProvider, wallet);

    it('Create collection mint and config', async () => {
        console.log("\n \n");
        globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(getGlobalCollectionConfig());

        const tx = await coreProvider.createCollectionTx({
            collectionConfigAddress: getCollectionConfig(globalCollectionData.collectionCounter),
            mint: getCollectionMint(globalCollectionData.collectionCounter),
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
        const collectionConfigAddress = getCollectionConfig(globalCollectionData.collectionCounter)
        const collectionConfigData = await coreProvider
            .program
            .account
            .collectionConfig
            .fetch(collectionConfigAddress);
        const mintCount = Number(collectionConfigData.mintCount);

        for (let i = 0; i < nTokens; i++) {
            const newMintCount = mintCount + i;
            const mint = getMint(
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

    it('Burn token FAIL', async () => {


    });


    it('Burn token SUCCESS', async () => {

    });

});
