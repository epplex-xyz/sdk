import {Keypair, PublicKey} from "@solana/web3.js";

export interface CreateWhitelistMintTxParams {
    expiryDate: string,
    mint: Keypair,
    name: string,
    symbol: string,
    uri: string
}

export interface TokenGameVoteTxParams {
    mint: PublicKey,
    owner?: PublicKey
}