import {PublicKey} from "@solana/web3.js";
import {getTokenMetadata} from "@solana/spl-token";
import {expect} from "chai";
import {getSetup} from "./setup";
import {sendAndConfirmRawTransaction} from "../lib";

const {wallet, burgerProvider} = getSetup();

describe('Test Collection', () => {
    const nTokens = 2

    // In 1 hour
    const destroyTimestamp: string = (Math.floor((new Date()).getTime() / 1000) + 3600).toString()

    it("Create burger delegate ", async() => {
        await burgerProgram.createProgramDelegate();
    })

    it('Mint token', async () => {
        await coreProgram.createGlobalCollectionConfig();
        const globalCollectionAddress = coreProgram.getGlobalCollectionConfigAddress();
        console.log("globalCollectionAddress", globalCollectionAddress.toString());

        const globalCollectionData = await coreProgram.program.account.globalCollectionConfig.fetch(
            coreProgram.getGlobalCollectionConfigAddress());
        const [collectionConfigAddress, _bump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("CONFIG"),
                globalCollectionData.collectionCounter.toArrayLike(Buffer, "le", 8)
            ],
            coreProgram.program.programId
        )

        await coreProgram.createCollection(collectionConfigAddress, burgerProgram.getProgramDelegate());
        const [mint, _] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("COLLECTION_MINT"),
                globalCollectionData.collectionCounter.toArrayLike(Buffer, "le", 8)
            ],
            coreProgram.program.programId
        );
        console.log("mint", mint.toString());
        const metadata = await getTokenMetadata(burgerProvider.connection, mint);
        console.log("Collection Mint Metadata", metadata);

        // Mint 10 tokens into the collection
        for (let i = 0; i < nTokens; i++) {
            const mint = await mintTokenIntoCollection(
                provider,
                burgerProgram,
                coreProgram,
                globalCollectionData.collectionCounter,
                destroyTimestamp
            );
            const metadata = await getTokenMetadata(provider.connection, mint);
            expect(metadata.additionalMetadata.find(md => md[0] == "collection_id")[1]).to.equal(globalCollectionData.collectionCounter.toString());
            expect(metadata.additionalMetadata.find(md => md[0] == "mint_count")[1]).to.equal(i.toString());
            expect(await coreProgram.verifyInCollection(provider.connection, mint)).to.equal(true);
        }

    });

});
