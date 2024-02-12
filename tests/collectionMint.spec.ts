import {getTokenMetadata} from "@solana/spl-token";
import {expect} from "chai";
import {CONNECTION, getSetup} from "./setup";
import {sendAndConfirmRawTransaction} from "../lib";
import {getCollectionConfig, getCollectionMint, getGlobalCollectionConfig, getMint} from "../src/constants/coreSeeds";
import {getProgramDelegate} from "../src/constants/burgerSeeds";
import {verifyInCollection} from "../src/utils/collection";
import {BN} from "@coral-xyz/anchor";

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
    let collectionConfigAddress;

    it("Create burger delegate ", async() => {
        const tx = await burgerProvider.createProgramDelegateTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    })

    it("Create global collection config ", async() => {
        const tx = await coreProvider.createGlobalCollectionConfigTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    })

    it('Create collection mint and config', async () => {
        const globalCollectionAddress = getGlobalCollectionConfig();
        console.log("globalCollectionAddress", globalCollectionAddress.toString());

        globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(globalCollectionAddress);

        collectionConfigAddress = getCollectionConfig(globalCollectionData.collectionCounter);
        const mint = getCollectionMint(globalCollectionData.collectionCounter);
        const tx = await coreProvider.createCollectionTx({
            collectionConfigAddress,
            mint,
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
                await verifyInCollection(CONNECTION, mint)
            ).to.equal(true);
        }

    });

});
