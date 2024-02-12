import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";
import {CONNECTION, getSetup} from "./setup";
import {getGlobalCollectionConfig, getMint} from "../src/constants/coreSeeds";
import {sendAndConfirmRawTransaction} from "../lib";
import {trySetupBurgerProgramDelegate, trySetupGlobalCollectionConfig} from "./testUtils";
const {wallet, burgerProvider, coreProvider} = getSetup();
const metadata = {
    expiryDate: (Math.floor((new Date()).getTime() / 1000) + 3600).toString(), // in 1 hr
    name: "(SDK tests) Ephemeral burger",
    symbol: "EP",
    uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
}

describe('Individual mint', () => {
    trySetupGlobalCollectionConfig(coreProvider, wallet);
    trySetupBurgerProgramDelegate(burgerProvider, wallet);

    it('Mint token', async () => {
        console.log("\n \n");
        const globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(getGlobalCollectionConfig());

        const mint = getMint(globalCollectionData.collectionCounter, new BN(0));
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
        })

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
        console.log("Individual Mint Metadata", await getTokenMetadata(burgerProvider.provider.connection, mint));
    });
});
