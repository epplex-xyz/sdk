import {
    AnchorProvider,
    Idl,
    Program,
    Provider,
    utils,
} from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { WenNewStandard } from "../types/wenNewStandardTypes";
import { WenRoyaltyDistribution } from "../types/wenRoyaltyDistributionTypes";
import WenIdlJson from "../idl/wen_new_standard.json";
import WrdIdlJson from "../idl/wen_royalty_distribution.json";

export const WNS_PROGRAM_ID = new PublicKey(WenIdlJson.address);
export const DISTRIBUTION_PROGRAM_ID = new PublicKey(WrdIdlJson.address);

export type WnsProgram = Program<WenNewStandard>;
export type DistributionProgram = Program<WenRoyaltyDistribution>;

export const getProvider = (connectionUrl: string) => {
    const connection = new Connection(connectionUrl);
    const anchorProvider = AnchorProvider.env();
    const provider = new AnchorProvider(
        connection,
        anchorProvider.wallet,
        AnchorProvider.defaultOptions(),
    );

    return provider;
};

export const getMetadataProgram = (
    provider: Provider,
    programId: PublicKey = WNS_PROGRAM_ID,
) => {
    const idl = {
        ...WenIdlJson,
        address: programId.toString(),
    } as Idl;
    const program = new Program(idl, provider) as unknown as WnsProgram;
    return program;
};

export const getDistributionProgram = (
    provider: Provider,
    programId: PublicKey = DISTRIBUTION_PROGRAM_ID,
) => {
    const idl = {
        ...WrdIdlJson,
        address: programId.toString(),
    } as Idl;
    const program = new Program(
        idl,
        provider,
    ) as unknown as DistributionProgram;
    return program;
};
export const getGroupAccount = (
    mint: string | PublicKey,
    programId: PublicKey = WNS_PROGRAM_ID,
) => {
    const mintKey = typeof mint === "string" ? new PublicKey(mint) : mint;
    const [groupAccount] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("group"), new PublicKey(mintKey).toBuffer()],
        programId,
    );

    return groupAccount;
};

export const getMemberAccount = (
    mint: string | PublicKey,
    programId: PublicKey = WNS_PROGRAM_ID,
) => {
    const mintKey = typeof mint === "string" ? new PublicKey(mint) : mint;
    const [groupAccount] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("member"), new PublicKey(mintKey).toBuffer()],
        programId,
    );

    return groupAccount;
};

export const getApproveAccountPda = (
    mint: PublicKey,
    programId: PublicKey = WNS_PROGRAM_ID,
) => {
    const [approvalAccount] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("approve-account"), mint.toBuffer()],
        programId,
    );

    return approvalAccount;
};

export const getExtraMetasAccount = (
    mint: string | PublicKey,
    programId: PublicKey = WNS_PROGRAM_ID,
) => {
    const mintKey = typeof mint === "string" ? new PublicKey(mint) : mint;

    const [extraMetasAccount] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("extra-account-metas"), mintKey.toBuffer()],
        programId,
    );

    return extraMetasAccount;
};

export const getDistributionAccount = (
    groupMint: string | PublicKey,
    paymentMint: string | PublicKey,
    programId: PublicKey = DISTRIBUTION_PROGRAM_ID,
) => {
    const groupMintKey =
        typeof groupMint === "string" ? new PublicKey(groupMint) : groupMint;
    const paymentMintKey =
        typeof paymentMint === "string"
            ? new PublicKey(paymentMint)
            : paymentMint;

    const [distributionAccount] = PublicKey.findProgramAddressSync(
        [groupMintKey.toBuffer(), paymentMintKey.toBuffer()],
        programId,
    );

    return distributionAccount;
};

export const getManagerAccount = (programId: PublicKey = WNS_PROGRAM_ID) => {
    const [managerAccount] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("manager")],
        programId,
    );

    return managerAccount;
};
