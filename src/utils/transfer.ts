import {Connection, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {
    createAssociatedTokenAccountInstruction,
    createCloseAccountInstruction,
    createTransferCheckedInstruction, createTransferCheckedWithTransferHookInstruction, getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import {getAtaAddressPubkey} from "./generic";
import {getApproveAccountPda, getExtraMetasAccount, WNS_PROGRAM_ID} from "../constants/wenCore";

export type NftTransferTxInputs = {
    connection: Connection;
    mint: PublicKey;
    source: PublicKey;
    destination: PublicKey;
    payer: PublicKey;
    allowOwnerOffCurveSource?: boolean;
    allowOwnerOffCurveDestination?: boolean;
    tokenProgramId?: PublicKey;
};

export function nftTransferIxs(
    inputs: NftTransferTxInputs
): TransactionInstruction[] {
    const allowOwnerOffCurveSource = inputs.allowOwnerOffCurveSource ?? false;
    const allowOwnerOffCurveDestination = inputs.allowOwnerOffCurveDestination ?? false;
    const tokenProgramId = inputs.tokenProgramId ?? TOKEN_2022_PROGRAM_ID

    const sourceAta = getAssociatedTokenAddressSync(
        inputs.mint, // mint
        inputs.source, // source wllaet
        allowOwnerOffCurveSource,
        tokenProgramId
    );

    const destinationAta = getAssociatedTokenAddressSync(
        inputs.mint, // mint
        inputs.destination, // destination wallet
        allowOwnerOffCurveDestination,
        tokenProgramId
    );

    return [
        // Must create the destination ATA
        createAssociatedTokenAccountInstruction(
            inputs.payer,
            destinationAta,
            inputs.destination,
            inputs.mint,
            tokenProgramId
        ),
        createTransferCheckedInstruction(
            sourceAta, // from
            inputs.mint,
            destinationAta, // to
            inputs.source, // owner of sourceAta
            1,
            0,
            [],
            tokenProgramId
        ),
        createCloseAccountInstruction(
            sourceAta,
            inputs.source, // receives fees
            inputs.source, // owner of account
            undefined,
            tokenProgramId
        )
    ]
}

export type CreateAtaInputs = {
    mint: PublicKey;
    receiver: PublicKey;
    payer: PublicKey;
    tokenProgramId?: PublicKey;
};


export function myCreateAssociatedTokenAccountInstruction(inputs: CreateAtaInputs) {
    const tokenProgramId = inputs.tokenProgramId ?? TOKEN_2022_PROGRAM_ID
    return createAssociatedTokenAccountInstruction(
        inputs.payer,
        getAtaAddressPubkey(inputs.mint, inputs.receiver, tokenProgramId),
        inputs.receiver,
        inputs.mint,
        tokenProgramId
    );
}

export type NftTransferHookInputs = {
    connection: Connection;
    mint: PublicKey;
    source: PublicKey;
    destination: PublicKey;
    payer: PublicKey;
    allowOwnerOffCurveSource?: boolean;
    allowOwnerOffCurveDestination?: boolean;
    tokenProgramId?: PublicKey;
};
export async function buildTransferHookTransferIx(inputs: NftTransferHookInputs) {
    const tokenProgramId = inputs.tokenProgramId ?? TOKEN_2022_PROGRAM_ID

    const sourceAta = getAtaAddressPubkey(
        inputs.mint, // mint
        inputs.source, // source wllaet
        tokenProgramId
    );

    const destinationAta = getAtaAddressPubkey(
        inputs.mint, // mint
        inputs.destination, // destination wallet
        tokenProgramId
    );

    // get transfer ix
    const transferIx = await createTransferCheckedWithTransferHookInstruction(
        inputs.connection,
        sourceAta,
        inputs.mint,
        destinationAta,
        inputs.source,
        BigInt(1),
        0,
        [],
        undefined,
        tokenProgramId
    );

    return transferIx;
}

export type TransferNftArgs = {
    mint: PublicKey;
    sender: PublicKey;
    receiver: PublicKey;
    tokenProgramId?: PublicKey;
    wnsProgramId?: PublicKey;
};

/*
    * Get the transfer instruction for a WNS NFT, we should use this since this is non-async
 */
export function getWnsNftTransferIx(args: TransferNftArgs) {
    const transferIx = createTransferCheckedInstruction(
        getAtaAddressPubkey(args.mint, args.sender),
        args.mint,
        getAtaAddressPubkey(args.mint, args.receiver),
        args.sender,
        1,
        0,
        [],
        args.tokenProgramId ?? TOKEN_2022_PROGRAM_ID,
    );
    // Add token hook extra keys
    transferIx.keys = transferIx.keys.concat([
        // System program
        {pubkey: getApproveAccountPda(args.mint), isSigner: false, isWritable: true},
        {pubkey: args.wnsProgramId ?? WNS_PROGRAM_ID, isSigner: false, isWritable: false},
        // Extra metas list account
        {pubkey: getExtraMetasAccount(args.mint), isSigner: false, isWritable: false},
    ]);
    return transferIx;
};

export type TransferNftIxsArgs = {
    mint: PublicKey;
    sender: PublicKey;
    receiver: PublicKey;
    payer: PublicKey;
    tokenProgramId?: PublicKey;
    wnsProgramId?: PublicKey;
};

export function getWnsNftTransferIxs(args: TransferNftIxsArgs): TransactionInstruction[] {
    return [
        myCreateAssociatedTokenAccountInstruction({
            mint: args.mint,
            payer: args.payer,
            receiver: args.receiver,
            tokenProgramId: args.tokenProgramId
        }),
        getWnsNftTransferIx(args)
    ];
};
