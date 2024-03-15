import {Keypair} from "@solana/web3.js";

export function getReadonlyWallet() {
    const readonlyKeypair = Keypair.generate();
    const wallet = {
        publicKey: readonlyKeypair.publicKey,
        signTransaction: (() => {}) as any,
        signAllTransactions: (() => {}) as any,
    };

    return wallet;
}

