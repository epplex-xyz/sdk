import {Keypair, Transaction,} from "@solana/web3.js";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {sendAndConfirmRawTransaction} from "../src";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {getGroupAccount, getMemberAccount} from "../src/constants/wenCore";

describe("WNS", () => {
    const {wallet, wenProvider} = setupGlobals(false)
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
        const tx = await wenProvider.createCollectionWithRoyaltiesTx(
            collectionArgs, wallet.publicKey.toString()
        )
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [collectionMint]);

        const groupAccount = getGroupAccount(collectionArgs.mint);
        const acc = await wenProvider
            .metadataProgram
            .account
            .tokenGroup
            .fetch(groupAccount)
        console.log("Collection account data", groupAccount.toString(), acc);
    });

    it("Max mint nfts into collection", async () => {
        for(let i = 0; i < maxSize; i++){
            const mint = Keypair.generate();
            const mintArgs ={
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                collection: collectionMint.publicKey.toString(),
                royaltyBasisPoints: 500,
                creators: [
                    {
                        address: wallet.publicKey.toString(),
                        share: 100
                    }
                ],
                mint: mint.publicKey.toString(),
                minter: wallet.publicKey.toString(),
                groupAuthority: wallet.publicKey.toString(),
                nftAuthority: wallet.publicKey.toString(),
                permanentDelegate: null
            }

            const tx = await wenProvider.mintNft(mintArgs);
            await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [mint]);

            const memberAccount = getMemberAccount(mint.publicKey.toString())
            const acc = await wenProvider
                .metadataProgram
                .account
                .tokenGroupMember
                .fetch(memberAccount)
            console.log("Member account data", i, memberAccount.toString(), acc);
        }
    });

});