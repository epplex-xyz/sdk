import { Cluster, SendOptions } from "@solana/web3.js";

export const CONFIRM_OPTIONS: SendOptions = {
    skipPreflight: false,
    // maxRetries: 1,
};

export const COMMITMENT = "confirmed";

export function getClusterByEndpoint(
    endpointUrl: string,
): Cluster | "local" | "mainnet" {
    if (endpointUrl.includes("mainnet")) {
        return "mainnet";
    } else if (endpointUrl.includes("devnet")) {
        return "devnet";
    } else if (endpointUrl.includes("local")) {
        return "local";
    } else if (endpointUrl.includes("127")) {
        return "local";
    } else if (endpointUrl.includes("8899")) {
        return "local";
    } else if (endpointUrl.includes("burgerbob")) {
        return "mainnet";
    } else {
        throw new Error("Unknown network");
    }
}
