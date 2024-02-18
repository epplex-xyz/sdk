import { IdlTypes } from "@coral-xyz/anchor";
import { RawAccount } from "@solana/spl-token";
import { TokenMetadata } from "@solana/spl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { EpplexBurger } from "../types/epplexBurgerTypes";

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

// Maybe should extend the above
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
}

type GameStatus = IdlTypes<EpplexBurger>["GameStatus"];
type VoteType = IdlTypes<EpplexBurger>["VoteType"];
type InputType = IdlTypes<EpplexBurger>["InputType"];

export interface gameCreateParams {
    mint: PublicKey,
    gameRound: number;
    gameStatus: GameStatus; // ! I think we should remove this and set it when game create is called
    phaseStart: number;
    endTimestampOffset: number;
    voteType: VoteType;
    inputType: InputType;
    gamePrompt: string,
    isEncrypted: boolean,
}

export interface TokenGameResetParams {
    mint: PublicKey
}