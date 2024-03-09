import {getTokenMetadata} from "@solana/spl-token";
import {expect} from "chai";
import {CONNECTION, getSetup, setupGlobals} from "./utils/setup";
import {
    EpNFTService,
    getProgramDelegate, nftTransferIxs,
    sendAndConfirmRawTransaction
} from "../src";
import {BN} from "@coral-xyz/anchor";
import {writeLinesToFile} from "./utils/testUtils";
import {trySetupBurgerProgramDelegate, trySetupGlobalCollectionConfig} from "./setupUtils";
import {PublicKey, Transaction} from "@solana/web3.js";

/*
******* SETUP
*/

const expiryDate: string = (Math.floor((new Date()).getTime() / 1000) + 3600).toString() // In 1 hour
const nTokens = 3
const collection = {
    collectionMintNme: "SDK Test", // shows up directly on the Collection NFT
    collectionMintSymbol: "SDK TEST", // shows up directly on the Collection NFT
    collectionMintUri: "https://example.com", // shows up directly on the Collection NFT
    collectionSize: nTokens,  // can just check on-chain, but not really super important
}

describe('Test Collection', () => {
    let globalCollectionData;
    let addresses: string[] = []
    const recipient: PublicKey = new PublicKey("G4QhBg3fF2U7RSwC734ViwL3DeZVrR2TyHMNWHSLwMj")
    const {wallet, burgerProvider, coreProvider} = setupGlobals();

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
            collectionSize: collection.collectionSize,
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
                Number(globalCollectionData.collectionCounter),
                newMintCount
            );

            const tx = await burgerProvider.createCollectionMintTx({
                expiryDate,
                collectionId: Number(globalCollectionData.collectionCounter),
                mint,
                name: `${collection.collectionMintNme} #${i + 1}`,
                symbol: collection.collectionMintSymbol,
                uri: collection.collectionMintUri,
            })
            await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);

            // NFT transfer
            // const ixs = nftTransferIxs({
            //     connection: CONNECTION,
            //     mint: mint,
            //     source: wallet.publicKey,
            //     destination: new PublicKey("G4QhBg3fF2U7RSwC734ViwL3DeZVrR2TyHMNWHSLwMj"),
            //     payer: wallet.publicKey,
            // })
            //
            // const sendTx = new Transaction().add(...ixs)
            // const res = await sendAndConfirmRawTransaction(CONNECTION, sendTx, wallet.publicKey, wallet, [])
            // if (res) {
            //     addresses.push(mint.toString())
            // }


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

    // // it("Write addresses", async () => {
    // it("Write addresses", async () => {
    //     writeLinesToFile(addresses, `/Users/Mac/Documents/Crypto/epPlex-xyz/sdk/.output/mints.txt`)
    // });
});
