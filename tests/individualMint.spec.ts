import {PublicKey} from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";
import {getSetup} from "./setup";
import {getGlobalCollectionConfig, getMint} from "../src/constants/coreSeeds";
import {sendAndConfirmRawTransaction} from "../lib";

const {wallet, burgerProvider, coreProvider} = getSetup();
const metadata = {
    expiryDate: (Math.floor((new Date()).getTime() / 1000) + 3600).toString(), // in 1 hr
    name: "(SDK tests) Ephemeral burger",
    symbol: "EP",
    uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
}


describe('Environment setup', () => {
    const destroyTimestamp: string = (Math.floor((new Date()).getTime() / 1000) + 3600).toString()
    console.log("destroy", destroyTimestamp);

    let mint: PublicKey;
    let globalCollectionConfigAddress: PublicKey;

    before(async () => {
        console.log("Creating global collection config");
        await coreProvider.createGlobalCollectionConfigTx();

        globalCollectionConfigAddress = getGlobalCollectionConfig();
        console.log("globalCollectionAddress", globalCollectionConfigAddress.toString());

        const globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(globalCollectionConfigAddress);

        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
    });


    it('Mint token', async () => {
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
            globalCollectionConfig: globalCollectionConfigAddress,
        })

        await sendAndConfirmRawTransaction(
            burgerProvider.provider.connection,
            tx,
            burgerProvider.provider.wallet.publicKey,
            wallet,
            []
        );

        console.log("Individual Mint Metadata", await getTokenMetadata(burgerProvider.provider.connection, mint));
    });
});
