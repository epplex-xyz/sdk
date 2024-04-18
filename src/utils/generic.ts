// https://solana.stackexchange.com/questions/107/how-can-i-get-the-owner-wallet-of-an-nft-mint-using-web3-js
import {
    Commitment,
    Connection,
    Keypair,
    ParsedAccountData,
    PublicKey, SendOptions,
    Transaction,
    TransactionInstruction, TransactionMessage,
    TransactionSignature, VersionedTransaction
} from "@solana/web3.js";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {COMMITMENT, CONFIRM_OPTIONS} from "./settings";

export const getProgramAddress = (seeds: Uint8Array[], programId: PublicKey) => {
    const [key] = PublicKey.findProgramAddressSync(seeds, programId);
    return key;
};

export function getAtaAddress(mint: string, owner: string, tokenProgramId: PublicKey = TOKEN_2022_PROGRAM_ID): PublicKey {
    return getProgramAddress(
        [new PublicKey(owner).toBuffer(), tokenProgramId.toBuffer(), new PublicKey(mint).toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID,
    )
};

export function getAtaAddressPubkey(mint: PublicKey, owner: PublicKey, tokenProgramId: PublicKey = TOKEN_2022_PROGRAM_ID): PublicKey {
    return getProgramAddress(
        [owner.toBuffer(), tokenProgramId.toBuffer(), mint.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID,
    )
};

// export function getAtaAddress(mint: PublicKey | string, owner: PublicKey | string, tokenProgramId: PublicKey = TOKEN_2022_PROGRAM_ID): PublicKey {
//     const mintKey = typeof mint === 'string' ? new PublicKey(mint) : mint;
//     const ownerKey = typeof owner === 'string' ? new PublicKey(owner) : owner;
//
//     return getProgramAddress(
//         [ownerKey.toBuffer(), tokenProgramId.toBuffer(), mintKey.toBuffer()],
//         ASSOCIATED_TOKEN_PROGRAM_ID,
//     );
// }

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

/**
 * Get all T22 token accounts
 */
export async function getTokenAccounts(connection: Connection, owner: PublicKey) {
    const allTokenAccounts = await connection.getTokenAccountsByOwner(
        owner,
        {programId: TOKEN_2022_PROGRAM_ID}
    );

    return allTokenAccounts
}

export function explorerUrl(connection: Connection, tx: string): string {
    // localhost default
    let cluster = "localnet-solana"
    if (connection.rpcEndpoint.includes("devnet")) {
        cluster = "devnet-solana"
    } else if (connection.rpcEndpoint.includes("mainnet")) {
        cluster = "mainnet-alpha"
    } else if (connection.rpcEndpoint.includes("burgerbob")) {
        cluster = "mainnet-alpha"
    }

    // return `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`
    // return `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`
    return `\nhttps://solana.fm/tx/${tx}?cluster=${cluster}`
}

export async function sendAndConfirmRawTransaction(
    connection: Connection,
    tx: Transaction,
    feePayer: PublicKey,
    wallet?: NodeWallet,
    signers: Keypair[] = [],
    commitment: Commitment = COMMITMENT,
    logTx: boolean = true,
    confirmOptions: SendOptions = CONFIRM_OPTIONS,
): Promise<TransactionSignature | null> {
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
        if (logTx) {
            console.log(explorerUrl(connection, txId));
        }

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
            throw res.value.err;
        }

        return txId;
    } catch (e: any) {
        console.error("Caught TX error", e);
        return null;
    }
}

export async function sendAndConfirmRawVersionedTransaction(
    connection: Connection,
    ixs: TransactionInstruction[],
    feePayer: PublicKey,
    wallet?: NodeWallet,
    signers: Keypair[] = [],
    commitment: Commitment = COMMITMENT,
    logTx: boolean = true,
    confirmOptions: SendOptions = CONFIRM_OPTIONS,
): Promise<TransactionSignature | null> {
    const {value, context} = await connection
        .getLatestBlockhashAndContext(commitment)
    const messageV0 = new TransactionMessage({
        payerKey: feePayer,
        recentBlockhash: value.blockhash,
        instructions: ixs,
    }).compileToV0Message();

    let tx = new VersionedTransaction(messageV0);
    let txId = "";
    try {
        if (wallet !== undefined) {
            tx = await wallet.signTransaction(tx);
        }
        tx.sign(signers);

        // const simulation = await connection.simulateTransaction(tx as any);
        // console.log("[wallet] simulated tx", simulation.value.logs);

        txId = await connection.sendRawTransaction(
            tx.serialize(),
            {
                ...confirmOptions,
                minContextSlot: context.slot,
                maxRetries: 1
            }
        );

        if (logTx) {
            console.log(explorerUrl(connection, txId));
        }
        const res = (
            await connection.confirmTransaction(
                {
                    signature: txId,
                    blockhash: value.blockhash,
                    lastValidBlockHeight: value.lastValidBlockHeight,
                },
                commitment
            )
        );

        if (res.value.err) {
            throw res.value.err;
        }

        return txId;
    } catch (e: any) {
        console.error("Caught TX error", e);
        return null;
    }
}

export async function sendAndConfirmRawVersionedTransactionWithRetries(
    connection: Connection,
    ixs: TransactionInstruction[],
    feePayer: PublicKey,
    wallet?: NodeWallet,
    signers: Keypair[] = [],
    commitment: Commitment = COMMITMENT,
    logTx: boolean = true,
    confirmOptions: SendOptions = CONFIRM_OPTIONS,
): Promise<TransactionSignature | null> {
    const {value, context} = await connection
        .getLatestBlockhashAndContext(commitment)
    const messageV0 = new TransactionMessage({
        payerKey: feePayer,
        recentBlockhash: value.blockhash,
        instructions: ixs,
    }).compileToV0Message();

    let tx = new VersionedTransaction(messageV0);
    if (wallet !== undefined) {
        tx = await wallet.signTransaction(tx);
    }
    tx.sign(signers);

    const lastValidBlockHeight = context.slot + 150

    let blockHeight = await this._connection.getBlockHeight()

    // retry until block height is greater than last valid block height
    let retries = 0
    let txId;
    while (blockHeight < lastValidBlockHeight) {
        console.log("Retry: ", retries)

        try {
            txId = await connection.sendRawTransaction(
                tx.serialize(),
                {
                    ...confirmOptions,
                    minContextSlot: context.slot,
                    maxRetries: 1
                }
            );

            if (logTx) {
                console.log(explorerUrl(connection, txId));
            }

            const res = (
                await connection.confirmTransaction(
                    {
                        signature: txId,
                        blockhash: value.blockhash,
                        lastValidBlockHeight: value.lastValidBlockHeight,
                    },
                    commitment
                )
            );

            if (res.value.err) {
                console.log("Res", res.value.err);
            }
        } catch {
            blockHeight = await connection.getBlockHeight()
        }
        retries = retries + 1
    }

    return txId;
}


// Taken from switchboard
// https://github.com/switchboard-xyz/solana-sdk/blob/d049b53fe70769493bb8195685a1bcf737bdee9b/javascript/solana.js/src/TransactionObject.ts#L353
export function getTransactionSize(payer: PublicKey, ixns: TransactionInstruction[]){
    const encodeLength = (len: number) => {
        const bytes = new Array<number>();
        let remLen = len;
        for (;;) {
            let elem = remLen & 0x7f;
            remLen >>= 7;
            if (remLen === 0) {
                bytes.push(elem);
                break;
            } else {
                elem |= 0x80;
                bytes.push(elem);
            }
        }
        return bytes;
    };

    const reqSigners = ixns.reduce((signers, ixn) => {
        ixn.keys.map((a) => {
            if (a.isSigner) {
                signers.add(a.pubkey.toBase58());
            }
        });
        return signers;
    }, new Set<string>());

    // need to include the payer as a signer
    if (!reqSigners.has(payer.toBase58())) {
        reqSigners.add(payer.toBase58());
    }

    const txn = new Transaction({
        feePayer: PublicKey.default,
        blockhash: "1".repeat(32),
        lastValidBlockHeight: 200000000,
    }).add(...ixns);

    const txnSize =
        txn.serializeMessage().length +
        reqSigners.size * 64 +
        encodeLength(reqSigners.size).length;

    return txnSize;
}
