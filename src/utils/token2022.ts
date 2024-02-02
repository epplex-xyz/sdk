import {Connection, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {
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

export async function nftTransferIxs(
    inputs: NftTransferTxInputs
): Promise<TransactionInstruction[]> {
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

    // Must create the destination ATA
    const ix = await tryCreateATAIx(
        inputs.connection,
        inputs.payer, // payer
        destinationAta,
        inputs.destination, // owner
        inputs.mint, // mint
        TOKEN_2022_PROGRAM_ID
    );

    const ixs = [
        ...ix,
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

    return ixs
}