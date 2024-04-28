import { IdlAccounts } from "@coral-xyz/anchor";
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
    groupMint: PublicKey;
    mint: PublicKey;
    expiryDate: string;
    name: string;
    symbol: string;
    uri: string;
    computeBudget?: number;
    computeUnit?: number;
    addGameReset?: boolean;
    ephemeralDataSeed?: number;
}

export interface WnsGroupMintParams {
    groupMint: PublicKey;
    name: string;
    symbol: string;
    uri: string;
    maxSize: number;
    paymentMint?: PublicKey;
    computeBudget?: number;
    computeUnit?: number;
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
    groupMint: PublicKey;
    sourceAta?: PublicKey;
    owner?: PublicKey;
    seed?: number;
}

export interface TokenGameFreezeTxParams {
    mint: PublicKey;
    owner?: PublicKey;
}
export interface BurnTxParams {
    mint: PublicKey;
    owner?: PublicKey;
    useGameConfig?: boolean;
}

export interface ThawTxParams {
    mint: PublicKey;
    owner?: PublicKey;
}

export interface TokenUpdateParams {
    name?: string;
    symbol?: string;
    uri?: string;
    mint: PublicKey;
    additionalMetadata?: { field: string; value: string };
}

export interface TokenGameResetParams {
    mint: PublicKey;
}

export interface TokenGameImmunityParams {
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
    ruleSeed: number;
    tokenGroup: PublicKey;
}

export interface GameUpdateParams {
    phaseStartTimestamp?: number;
    phaseEndTimestamp?: number;
    voteType?: IdlVoteType;
    tokenGroup?: PublicKey;
}

export interface EphemeralDataAppendTxParams {
    time: number;
    seed: number;
    membership: PublicKey;
    payer?: PublicKey;
}

export interface EphemeralRuleCreateTxParams {
    seed: number;
    renewalPrice: number;
    treasury: PublicKey;
}

// export type IdlVoteType = IdlTypes<EpplexBurger>["VoteType"];
// export type IdlInputType = IdlTypes<EpplexBurger>["InputType"];
export type IdlVoteType = any;
export type IdlInputType = any;
export type GameConfig = IdlAccounts<EpplexBurger>["gameConfig"];
