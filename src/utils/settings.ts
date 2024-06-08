import { Cluster, SendOptions } from "@solana/web3.js";

export const CONFIRM_OPTIONS: SendOptions = {
    skipPreflight: false,
    // maxRetries: 1,
};

export const COMMITMENT = "confirmed";

export function getClusterByEndpoint(
    endpointUrl: string,
): Cluster | "localnet" {
    if (endpointUrl.includes("mainnet")) {
        return "mainnet-beta";
    } else if (endpointUrl.includes("devnet")) {
        return "devnet";
    } else if (endpointUrl.includes("local")) {
        return "localnet";
    } else if (endpointUrl.includes("127")) {
        return "localnet";
    } else if (endpointUrl.includes("8899")) {
        return "localnet";
    } else if (endpointUrl.includes("burgerbob")) {
        return "mainnet-beta";
    } else {
        throw new Error("Unknown network");
    }
}
