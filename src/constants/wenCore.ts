import { AnchorProvider, Idl, Program, Provider, utils } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import {WenNewStandard, IDL as WenNewStandardIdl} from "../types/wenNewStandardTypes";
import {WenRoyaltyDistribution, IDL as WenRoyaltyDistributionIdl} from "../types/wenRoyaltyDistributionTypes";
import WenIdlJson from "../idl/wen_new_standard.json";
import WrdIdlJson from "../idl/wen_royalty_distribution.json";

export const WNS_PROGRAM_ID = new PublicKey(WenIdlJson.metadata.address);
export const DISTRIBUTION_PROGRAM_ID = new PublicKey(WrdIdlJson.metadata.address);

export type WnsProgram = Program < WenNewStandard >;
export type DistributionProgram = Program < WenRoyaltyDistribution >;

export const getProvider = (connectionUrl: string) => {
    const connection = new Connection(connectionUrl);
    const anchorProvider = AnchorProvider.env();
    const provider = new AnchorProvider(connection, anchorProvider.wallet, AnchorProvider.defaultOptions());

    return provider;
}

export const getMetadataProgram = (provider: Provider, programId: PublicKey = WNS_PROGRAM_ID) => {
    return new Program(
        WenNewStandardIdl as Idl,
        programId,
        provider
    ) as WnsProgram;
}

export const getDistributionProgram = (provider: Provider, programId: PublicKey = DISTRIBUTION_PROGRAM_ID) => {
    return new Program(
        WenRoyaltyDistributionIdl as Idl,
        programId,
        provider
    ) as DistributionProgram;
}
export const getGroupAccount = (mint: string, programId: PublicKey = WNS_PROGRAM_ID) => {
    const [groupAccount] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("group"), new PublicKey(mint).toBuffer()], programId);

    return groupAccount;
}

export const getMemberAccount = (mint: string, programId: PublicKey = WNS_PROGRAM_ID) => {
    const [groupAccount] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("member"), new PublicKey(mint).toBuffer()], programId);

    return groupAccount;
}

export const getApprovalAccount = (mint: string, programId: PublicKey = WNS_PROGRAM_ID) => {
    const [approvalAccount] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("approve-account"), new PublicKey(mint).toBuffer()], programId);

    return approvalAccount;
}

export const getExtraMetasAccount = (mint: string, programId: PublicKey = WNS_PROGRAM_ID) => {
    const [extraMetasAccount] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("extra-account-metas"), new PublicKey(mint).toBuffer()], programId);

    return extraMetasAccount;
}

export const getDistributionAccount = (collection: string, programId: PublicKey = DISTRIBUTION_PROGRAM_ID) => {
    const [distributionAccount] = PublicKey.findProgramAddressSync([new PublicKey(collection).toBuffer()], programId);

    return distributionAccount;
}

export const getManagerAccount = (programId: PublicKey = WNS_PROGRAM_ID) => {
    const [managerAccount] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("manager")], programId);

    return managerAccount;
}

// Create collection
export interface CreateCollectionArgs {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    maxSize: number;
}

/*
    INDIVIDUAL NFT
*/
// Create NFT
export interface CreateNftArgs {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    additionalExtensions: string[];
}

// Add NFT to Group
export interface AddToGroupArgs {
    mint: string;
    group: string;
}

// Creator Details
export interface Creator {
    address: string;
    share: number;
}

export interface RoyaltyEnforcementArgs {
    royaltyBasisPoints: number;
    creators: Creator[];
}

// Purchase NFT
export interface PurchaseNftArgs {
    collection: string;
    nftMint: string;
    paymentLamports: number;
    buyer: string;
}

// Transfer NFT
export interface TransferNftArgs {
    nftMint: string;
    to: string;
}