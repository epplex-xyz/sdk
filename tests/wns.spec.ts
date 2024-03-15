import {Keypair,} from "@solana/web3.js";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {sendAndConfirmRawVersionedTransaction} from "../src/utils/generic";

describe("WNS", () => {
    const {wallet, burgerProvider, wenProvider} = setupGlobals()
    const collectionMint = Keypair.generate();

    const metadata = getDefaultMetadata({})
    const maxSize = 3;
    const collectionArgs ={
        groupMint: collectionMint.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }

    it("Create a collection", async () => {
        const tx = await burgerProvider.wnsGroupMintTx(collectionArgs)
        await sendAndConfirmRawVersionedTransaction(CONNECTION, tx.instructions, wallet.publicKey, wallet, [collectionMint]);
    });

    it("Max mint nfts into collection", async () => {
        for(let i = 0; i < maxSize; i++){
            const mint = Keypair.generate();
            const mintArgs ={
                groupMint: collectionMint.publicKey,
                mint: mint.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                expiryDate: metadata.expiryDate,
            }

            const tx = await burgerProvider.wnsMemberMintTx(mintArgs);
            await sendAndConfirmRawVersionedTransaction(
                CONNECTION, [...tx.instructions,], wallet.publicKey, wallet, [mint]
            );
        }
    });

});