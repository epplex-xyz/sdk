import {PublicKey, Transaction, VersionedTransaction} from "@solana/web3.js";

/**
 * Wallet interface for objects that can be used to sign provider transactions.
 */
export interface EpplexProviderWallet {
    publicKey: PublicKey;
    signTransaction < T extends Transaction | VersionedTransaction > (transaction: T) : Promise < T > ;
    signAllTransactions < T extends Transaction | VersionedTransaction > (transactions: T[]) : Promise < T[] > ;
}
