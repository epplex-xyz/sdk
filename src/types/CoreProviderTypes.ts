import {PublicKey} from "@solana/web3.js";
import {IdlAccounts} from "@coral-xyz/anchor";
import { EpplexCore } from "../types/epplexCoreTypes";

export interface CreateCollectionTxParams {
    collectionConfigAddress: PublicKey,
    authority: PublicKey,
    mint: PublicKey,
    collectionMintName: string,
    collectionMintSymbol: string,
    collectionMintUri: string,
    collectionSize: number,
    computeBudget?: number
}
export type GlobalCollectionConfig = IdlAccounts<EpplexCore>["globalCollectionConfig"];

export interface RuleTxParams {
    seed: number;
    ruleCreator: PublicKey;
    renewalPrice: number;
    treasury?: PublicKey;
}
export interface TimeTxParams {
    time: number;
    seed: number;
    membership: PublicKey;
    treasury?: PublicKey;
}
export type EphemeralRule = IdlAccounts<EpplexCore>["ephemeralRule"];
export type EphemeralData = IdlAccounts<EpplexCore>["ephemeralData"];