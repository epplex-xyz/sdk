import {Keypair, PublicKey} from "@solana/web3.js";
import { RawAccount } from "@solana/spl-token";
import {TokenMetadata} from "@solana/spl-token-metadata";

export type EpNFT = RawAccount & Partial<TokenMetadata>

export interface CreateWhitelistMintTxParams {
    expiryDate: string,
    mint: Keypair,
    name: string,
    symbol: string,
    uri: string
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