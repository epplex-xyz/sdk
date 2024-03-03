import {Keypair, Transaction,} from "@solana/web3.js";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {sendAndConfirmRawTransaction} from "../src";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";

describe("WNS", () => {
    const {wallet, wenProvider} = setupGlobals(false)
    const mint = Keypair.generate();

    const metadata = getDefaultMetadata({})

    const collectionArgs ={
        mint: mint.publicKey.toString(),
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: 5
    }

    it("Create a collection", async () => {
        const {ix} = await wenProvider.buildCreateCollectionIx(
            collectionArgs, wallet.publicKey.toString()
        )
        await sendAndConfirmRawTransaction(CONNECTION, new Transaction().add(ix), wallet.publicKey, wallet, [mint]);
    });

});