import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, Keypair} from "@solana/web3.js";

const COMMITMENT = "confirmed";

export const CONNECTION = new Connection(
    "http://localhost:8899",
    // clusterApiUrl("devnet"),
    COMMITMENT
);