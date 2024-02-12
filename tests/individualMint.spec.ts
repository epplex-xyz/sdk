import {PublicKey} from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";
import {getSetup} from "./setup";
import {getGlobalCollectionConfig, getMint} from "../src/constants/coreSeeds";
import {sendAndConfirmRawTransaction} from "../lib";

const {wallet, burgerProvider, coreProvider} = getSetup();

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
        const tx = await burgerProvider.createWhitelistMintTx(
            destroyTimestamp,
            mint,
            globalCollectionConfigAddress
        )

        await sendAndConfirmRawTransaction(
            burgerProvider.provider.connection,
            tx,
            burgerProvider.provider.wallet.publicKey,
            wallet,
            []
        );


        const metadata = await getTokenMetadata(burgerProvider.provider.connection, mint);
        console.log("Individual Mint Metadata", metadata);
    });
});
