import {Connection, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {
    createAssociatedTokenAccountInstruction,
    createCloseAccountInstruction,
    createTransferCheckedInstruction, getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import {tryCreateATAIx} from "./generic";

export type NftTransferTxInputs = {
    connection: Connection;
    mint: PublicKey;
    source: PublicKey;
    destination: PublicKey;
    payer: PublicKey;
    allowOwnerOffCurveSource?: boolean;
    allowOwnerOffCurveDestination?: boolean;
};

export function nftTransferIxs(
    inputs: NftTransferTxInputs
): TransactionInstruction[] {
    const allowOwnerOffCurveSource = inputs.allowOwnerOffCurveSource ?? false;
    const allowOwnerOffCurveDestination = inputs.allowOwnerOffCurveDestination ?? false;

    const sourceAta = getAssociatedTokenAddressSync(
        inputs.mint, // mint
        inputs.source, // source wllaet
        allowOwnerOffCurveSource,
        TOKEN_2022_PROGRAM_ID
    );

    const destinationAta = getAssociatedTokenAddressSync(
        inputs.mint, // mint
        inputs.destination, // destination wallet
        allowOwnerOffCurveDestination,
        TOKEN_2022_PROGRAM_ID
    );

    return [
        // Must create the destination ATA
        createAssociatedTokenAccountInstruction(
            inputs.payer,
            destinationAta,
            inputs.destination,
            inputs.mint,
            TOKEN_2022_PROGRAM_ID
        ),
        createTransferCheckedInstruction(
            sourceAta, // from
            inputs.mint,
            destinationAta, // to
            inputs.source, // owner of sourceAta
            1,
            0,
            [],
            TOKEN_2022_PROGRAM_ID
        ),
        createCloseAccountInstruction(
            sourceAta,
            inputs.source, // receives fees
            inputs.source, // owner of account
            undefined,
            TOKEN_2022_PROGRAM_ID
        )
    ]
}