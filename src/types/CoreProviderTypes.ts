import {PublicKey} from "@solana/web3.js";

export interface CreateCollectionTxParams {
    collectionConfigAddress: PublicKey,
    authority: PublicKey,
    mint: PublicKey,
    collectionMintName: string,
    collectionMintSymbol: string,
    collectionMintUri: string,
    collectionName: string,
    collectionSymbol: string,
    collectionSize: number,
    computeBudget?: number
}
