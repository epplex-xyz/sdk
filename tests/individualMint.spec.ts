import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";
import {CONNECTION, getSetup} from "./setup";
import {getDefaultMetadata} from "./getDefaultMetadata";
import {sendAndConfirmRawTransaction, getGlobalCollectionConfig, getMint, nftTransferIxs} from "../src";
import {trySetupBurgerProgramDelegate, trySetupGlobalCollectionConfig} from "./testUtils";
import {PublicKey, Transaction} from "@solana/web3.js";

const {wallet, burgerProvider, coreProvider} = getSetup();
const metadata = getDefaultMetadata({});

describe('Individual mint', () => {
    trySetupGlobalCollectionConfig(coreProvider, wallet);
    trySetupBurgerProgramDelegate(burgerProvider, wallet);


    const collection = {
        collectionMintNme: "SDK Test",
        collectionMintSymbol: "SDK TEST",
        collectionMintUri: "https://example.com",
        collectionName: "epplex",
        collectionSymbol: "EPX",
        collectionSize: 0,
    };

    let mint: PublicKey;
    it('Mint token', async () => {
        console.log("\n \n");
        const globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(coreProvider.getGlobalCollectionConfig());

        const tx = await burgerProvider.createIndividualMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            collectionId: Number(globalCollectionData.collectionCounter),
        })

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
    });

    it("Transfer NFT", async() => {
        const ixs = nftTransferIxs({
            connection: CONNECTION,
            mint: mint,
            source: wallet.publicKey,
            destination: new PublicKey("2N6aJDX1TNs6RKkPsuufbAe4JjRAZPs1iLPcEUL4DX4z"),
            payer: wallet.publicKey,
        })
        const tx = new Transaction().add(...ixs)

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])
        console.log("\n")
    })
});
