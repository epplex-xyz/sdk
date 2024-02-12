import {getTokenMetadata} from "@solana/spl-token";
import {expect} from "chai";
import {CONNECTION, getSetup} from "./setup";
import {
    EpNFTService,
    getCollectionConfig,
    getCollectionMint,
    getGlobalCollectionConfig,
    getMint,
    getProgramDelegate,
    sendAndConfirmRawTransaction
} from "../src";
import {BN} from "@coral-xyz/anchor";
import {trySetupBurgerProgramDelegate, trySetupGlobalCollectionConfig} from "./testUtils";

/*
******* SETUP
*/
const {wallet, burgerProvider, coreProvider} = getSetup();
const expiryDate: string = (Math.floor((new Date()).getTime() / 1000) + 3600).toString() // In 1 hour
const nTokens = 2
const collection = {
    collectionMintNme: "SDK Test",
    collectionMintSymbol: "SDK TEST",
    collectionMintUri: "https://example.com",
    collectionName: "epplex",
    collectionSymbol: "EPX",
    collectionSize: 2,
}

describe('Test Collection', () => {
    let globalCollectionData;

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


            // Verification
            const metadata = await getTokenMetadata(CONNECTION, mint);
            expect(
                metadata.additionalMetadata.find(md => md[0] == "collection_id")[1]
            ).to.equal(globalCollectionData.collectionCounter.toString());

            expect(
                metadata.additionalMetadata.find(md => md[0] == "mint_count")[1]
            ).to.equal(i.toString());

            expect(
                await EpNFTService.verifyInCollection(CONNECTION, mint)
            ).to.equal(true);
        }
    });

});
