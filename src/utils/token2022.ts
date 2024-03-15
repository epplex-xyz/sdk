import {Connection, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {
    createAssociatedTokenAccountInstruction,
    createCloseAccountInstruction,
    createTransferCheckedInstruction, createTransferCheckedWithTransferHookInstruction, getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";

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

    const sourceAta = getAssociatedTokenAddressSync(
        inputs.mint, // mint
        inputs.source, // source wllaet
        undefined,
        tokenProgramId
    );

    const destinationAta = getAssociatedTokenAddressSync(
        inputs.mint, // mint
        inputs.destination, // destination wallet
        undefined,
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