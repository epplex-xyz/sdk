import {Keypair, PublicKey,} from "@solana/web3.js";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {sendAndConfirmRawVersionedTransaction} from "../src/utils/generic";

import {getWnsNftTransferIxs} from "../src/utils/transfer";

describe("WNS", () => {
    const {wallet, burgerProvider} = setupGlobals()
    const collectionMint = Keypair.generate();
    const receiver = new PublicKey("G4QhBg3fF2U7RSwC734ViwL3DeZVrR2TyHMNWHSLwMj");

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
                computeBudget: 500_000
            }
            console.log(`mint ${i}`, mint.publicKey.toString());
            const tx = await burgerProvider.wnsMemberMintTx(mintArgs);

            const transferIxs = getWnsNftTransferIxs({
                mint: mint.publicKey,
                sender: wallet.publicKey,
                payer: wallet.publicKey,
                receiver
            })

            await sendAndConfirmRawVersionedTransaction(
                CONNECTION, [
                    ...tx.instructions,
                    ...transferIxs
                ], wallet.publicKey, wallet, [mint]
            );
        }
    });

});