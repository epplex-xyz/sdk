import {Connection, PublicKey} from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import {getCollectionMint} from "../constants/coreSeeds";
import {getTokenMetadata} from "@solana/spl-token";

export async function verifyInCollection(connection: Connection, mint: PublicKey): Promise<boolean> {
    try {
        const metadata = await getTokenMetadata(connection, mint);
        const collectionIdString = metadata!
            .additionalMetadata
            .find((m) => m[0] == "collection_id")![1];
        const mintCountString = metadata!
            .additionalMetadata
            .find((m) => m[0] == "mint_count")![1];

        const mintAddress = getCollectionMint(
            new BN(collectionIdString),
            new BN(mintCountString)
        );

        return mintAddress.toString() === mint.toString();
    } catch {
        return false;
    }
}