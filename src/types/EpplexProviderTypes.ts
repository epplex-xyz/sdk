import {PublicKey} from "@solana/web3.js";
import { RawAccount } from "@solana/spl-token";
import {TokenMetadata} from "@solana/spl-token-metadata";

export interface TokenMetadataField {
    tokenMetadata: TokenMetadata
}

export interface TokenAccount {
    tokenAccount: PublicKey
}

export type EpNFT = RawAccount & Partial<TokenMetadataField> & Partial<TokenAccount>

export interface CreateWhitelistMintTxParams {
    expiryDate: string,
    name: string,
    symbol: string,
    uri: string
    mint: PublicKey,
    globalCollectionConfig?: PublicKey,
    computeBudget?: number
}

// Maybe should extend the above
export interface CreateCollectionMintTxTxParams {
    collectionId: number
    expiryDate: string,
    mint: PublicKey,
    name: string,
    symbol: string,
    uri: string
    computeBudget?: number
}


export interface TokenGameVoteTxParams {
    mint: PublicKey,
    message: string,
    owner?: PublicKey
}

export interface BurnTxParams {
    mint: PublicKey,
    owner?: PublicKey
}