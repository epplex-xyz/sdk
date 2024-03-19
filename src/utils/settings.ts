import {Cluster} from "@solana/web3.js";

export const CONFIRM_OPTIONS = {skipPreflight: false}

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
    } else {
        throw new Error("Unknown network");
    }
}
