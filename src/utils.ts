// https://solana.stackexchange.com/questions/107/how-can-i-get-the-owner-wallet-of-an-nft-mint-using-web3-js
import {
    Commitment,
    Connection,
    Keypair,
    ParsedAccountData,
    PublicKey, SendOptions,
    Transaction,
    TransactionInstruction,
    TransactionSignature
} from "@solana/web3.js";
import {createAssociatedTokenAccountInstruction} from "@solana/spl-token";
import {AnchorWallet} from "@solana/wallet-adapter-react";

export async function getMintOwner(connection: Connection, mint: PublicKey): Promise<PublicKey> {
    const largestAccounts = await connection.getTokenLargestAccounts(mint);
    const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address  //first element is the largest account, assumed with 1
    );

    if (largestAccountInfo.value === null){
        throw Error("Largest account does not exist");
    }

    const owner = (largestAccountInfo.value.data as ParsedAccountData).parsed.info.owner;

    return new PublicKey(owner);
}

export async function tryCreateATAIx(
    connection: Connection,
    payer: PublicKey,
    ata: PublicKey,
    owner: PublicKey,
    mint: PublicKey,
    tokenProgramId: PublicKey,
): Promise<TransactionInstruction[]> {
    const acc = await connection.getAccountInfo(ata);
    if (acc === null) {
        return [createAssociatedTokenAccountInstruction(payer, ata, owner, mint, tokenProgramId)];
    } else {
        return [];
    }
}

export async function sendAndConfirmRawTransaction(
    connection: Connection,
    tx: Transaction,
    feePayer: PublicKey,
    wallet?: AnchorWallet,
    signers: Keypair[] = [],
    commitment: Commitment = "confirmed",
    confirmOptions: SendOptions = {skipPreflight: false}
): Promise<TransactionSignature> {
    const latestBlockhash = await connection.getLatestBlockhash(commitment);
    tx.recentBlockhash = latestBlockhash.blockhash;
    tx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    tx.feePayer = feePayer;

    if (signers) {
        signers.forEach((s) => tx.sign(s));
    }

    let txId = "";
    try {
        if (wallet !== undefined) {
            tx = await wallet.signTransaction(tx);
        }

        txId = await connection.sendRawTransaction(tx.serialize(), confirmOptions);
        console.log("Tx id", txId);

        const res = (
            await connection.confirmTransaction(
                {
                    signature: txId,
                    blockhash: latestBlockhash.blockhash,
                    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                },
                commitment
            )
        );

        if (res.value.err) {
            // For some reason this is not logged
            console.log(`Raw transaction ${txId} failed (${JSON.stringify(res.value.err)})`);
            throw res.value.err;
        }
    } catch (e: any) {
        console.log("Caught TX error", e);
    }

    return txId;
}