import {Keypair, PublicKey} from "@solana/web3.js";
import { RawAccount } from "@solana/spl-token";
import {TokenMetadata} from "@solana/spl-token-metadata";

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
