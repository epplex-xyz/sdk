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
    collectionName: string,
    collectionSymbol: string,
    collectionSize: number,
    computeBudget?: number
}

export type GlobalCollectionConfig = IdlAccounts<EpplexCore>["globalCollectionConfig"];