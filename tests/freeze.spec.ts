import {PublicKey} from "@solana/web3.js";
import {getMint, sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {BN} from "@coral-xyz/anchor";


const metadata = getDefaultMetadata({});
const gameEndTimestamp =  (Math.floor((new Date()).getTime() / 1000) + 3600 * 12).toString() // 3 secs

describe("Testing Burger Program", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    let mint: PublicKey;


    it('Mint token', async () => {
        console.log("\n \n");
        const globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(coreProvider.getGlobalCollectionConfig());

        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
        })

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Freeze token", async () => {
        const tx = await burgerProvider.tokenFreezeTx({
            mint: mint,
            owner: wallet.publicKey,
        });

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });
});

