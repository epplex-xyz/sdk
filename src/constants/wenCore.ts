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

export const getDistributionAccount = (groupMint: string, paymentMint: string, programId: PublicKey) => {
    const [distributionAccount] = PublicKey.findProgramAddressSync([new PublicKey(groupMint).toBuffer(), new PublicKey(paymentMint).toBuffer()], programId);

    return distributionAccount;
};

export const getManagerAccount = (programId: PublicKey = WNS_PROGRAM_ID) => {
    const [managerAccount] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("manager")], programId);

    return managerAccount;
}