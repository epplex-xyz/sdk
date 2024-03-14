import {Keypair,} from "@solana/web3.js";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {sendAndConfirmRawVersionedTransaction} from "../src/utils/generic";

describe("WNS", () => {
    const {wallet, wenProvider} = setupGlobals()
    const collectionMint = Keypair.generate();

    const metadata = getDefaultMetadata({})
    const maxSize = 3;
    const collectionArgs ={
        mint: collectionMint.publicKey.toString(),
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }

    it("Create a collection", async () => {
        const ixs = await wenProvider.createCollectionIxes({
            ...collectionArgs,
            payer: wallet.publicKey.toString(),
            authority: wallet.publicKey.toString(),
            receiver: wallet.publicKey.toString()
        })
        await sendAndConfirmRawVersionedTransaction(CONNECTION, ixs, wallet.publicKey, wallet, [collectionMint]);

    });

    // it("Max mint nfts into collection", async () => {
    //     for(let i = 0; i < maxSize; i++){
    //         const mint = Keypair.generate();
    //         const mintArgs ={
    //             name: metadata.name,
    //             symbol: metadata.symbol,
    //             uri: metadata.uri,
    //             collection: collectionMint.publicKey.toString(),
    //             royaltyBasisPoints: 500,
    //             creators: [
    //                 {
    //                     address: wallet.publicKey.toString(),
    //                     share: 100
    //                 }
    //             ],
    //             mint: mint.publicKey.toString(),
    //             minter: wallet.publicKey.toString(),
    //             groupAuthority: wallet.publicKey.toString(),
    //             nftAuthority: wallet.publicKey.toString(),
    //             permanentDelegate: null
    //         }
    //
    //         const tx = await wenProvider.mintNft(mintArgs);
    //         await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [mint]);
    //
    //         const memberAccount = getMemberAccount(mint.publicKey.toString())
    //         const acc = await wenProvider
    //             .metadataProgram
    //             .account
    //             .tokenGroupMember
    //             .fetch(memberAccount)
    //         console.log("Member account data", i, memberAccount.toString(), acc);
    //     }
    // });

});