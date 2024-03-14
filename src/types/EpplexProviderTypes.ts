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

export interface CreateWhitelistMintTxParams {
    expiryDate: string;
    name: string;
    symbol: string;
    uri: string;
    mint: PublicKey;
    globalCollectionConfig?: PublicKey;
    computeBudget?: number;
    coreProgramId?: PublicKey;
}

export interface WnsMintParams {
    expiryDate: string;
    name: string;
    symbol: string;
    uri: string;
    mint: PublicKey;
    globalCollectionConfig?: PublicKey;
    computeBudget?: number;
    coreProgramId?: PublicKey;
}

export interface CreateCollectionMintTxTxParams {
    collectionId: number;
    expiryDate: string;
    mint: PublicKey;
    name: string;
    symbol: string;
    uri: string;
    computeBudget?: number;
    coreProgramId?: PublicKey;
}

export interface TokenGameVoteTxParams {
    mint: PublicKey;
    message: string;
    owner?: PublicKey;
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
}

export interface GameUpdateParams {
    phaseStartTimestamp?: number;
    phaseEndTimestamp?: number;
    voteType?: IdlVoteType;

}

export type IdlVoteType = IdlTypes<EpplexBurger>["VoteType"];
export type IdlInputType = IdlTypes<EpplexBurger>["InputType"];
export type GameConfig = IdlAccounts<EpplexBurger>["gameConfig"];
