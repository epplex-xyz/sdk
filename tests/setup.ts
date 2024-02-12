import {Connection} from "@solana/web3.js";
import {loadOrGenerateKeypair} from "./testUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {CoreProvider, EpplexProvider} from "../src";

const COMMITMENT = "confirmed";

const CONFIRM_OPTIONS = {skipPreflight: true}

export const CONNECTION = new Connection(
    "http://localhost:8899",
    // clusterApiUrl("devnet"),
    COMMITMENT
);
export const PAYER_ADMIN = loadOrGenerateKeypair("epplex_PAYER_ADMIN.json");

export function getSetup() {
    const wallet = new NodeWallet(PAYER_ADMIN);
    const burgerProvider = new EpplexProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS
    );

    const coreProvider = new CoreProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS
    );

    return {
        wallet,
        burgerProvider,
        coreProvider
    }
}

