import { IdlAccounts, IdlTypes } from "@coral-xyz/anchor";
import { RawAccount } from "@solana/spl-token";
import { TokenMetadata } from "@solana/spl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { EpplexBurger } from "./epplexBurgerTypes";

export interface TokenMetadataField {
    tokenMetadata: TokenMetadata;
}

export interface TokenAccount {
    tokenAccount: PublicKey;
}

export type EpNFT = RawAccount &
    Partial<TokenMetadataField> &
    Partial<TokenAccount>;

// Todo need to extend this with the below
export interface EpMintParams {
    expiryDate: string;
    name: string;
    symbol: string;
    uri: string;
}

export interface CreateWhitelistMintTxParams {
    expiryDate: string;
    name: string;
    symbol: string;
    uri: string;
    mint: PublicKey;
    globalCollectionConfig?: PublicKey;
    computeBudget?: number;
}

export interface WnsMemberMintParams {
    groupMint: PublicKey,
    mint: PublicKey;
    expiryDate: string;
    name: string;
    symbol: string;
    uri: string;
    computeBudget?: number;
}

export interface WnsGroupMintParams {
    groupMint: PublicKey,
    name: string;
    symbol: string;
    uri: string;
    maxSize: number;
    paymentMint?: PublicKey;
    computeBudget?: number;
}

export interface CreateCollectionMintTxTxParams {
    collectionId: number;
    expiryDate: string;
    mint: PublicKey;
    name: string;
    symbol: string;
    uri: string;
    computeBudget?: number;
}

export interface TokenGameVoteTxParams {
    mint: PublicKey;
    message: string;
    owner?: PublicKey;
}

export interface TokenGameBurnTxParams {
    mint: PublicKey;
    owner?: PublicKey;
    seed?: number;
}
export interface BurnTxParams {
    mint: PublicKey;
    owner?: PublicKey;
    useGameConfig?: boolean;
}

export interface TokenGameResetParams {
    mint: PublicKey;
}

export interface GameStartParams {
    endTimestamp: number;
    voteType: IdlVoteType;
    inputType: IdlInputType;
    gamePrompt: string;
    gameName: string;
    isEncrypted: boolean;
    publicEncryptKey: string;
    ruleSeed: number,
    tokenGroup: PublicKey,
}

export interface GameUpdateParams {
    phaseStartTimestamp?: number;
    phaseEndTimestamp?: number;
    voteType?: IdlVoteType;
}

export type IdlVoteType = IdlTypes<EpplexBurger>["VoteType"];
export type IdlInputType = IdlTypes<EpplexBurger>["InputType"];
export type GameConfig = IdlAccounts<EpplexBurger>["gameConfig"];
