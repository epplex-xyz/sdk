import {Connection} from "@solana/web3.js";
import {loadOrGenerateKeypair} from "./keyUtils";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {CoreProvider, EpplexProvider} from "../src";
import {AnchorProvider, Provider} from "@coral-xyz/anchor";

const COMMITMENT = "confirmed";

const CONFIRM_OPTIONS = {skipPreflight: true}

export const CONNECTION = new Connection(
    "http://127.0.0.1:8899",
    // clusterApiUrl("devnet"),
    COMMITMENT
);
export const PAYER_ADMIN = loadOrGenerateKeypair("epplex_PAYER_ADMIN");

interface GetSetupReturn {
    wallet: NodeWallet,
    burgerProvider: EpplexProvider,
    coreProvider: CoreProvider
}
export function getSetup(): GetSetupReturn {
    const wallet = new NodeWallet(PAYER_ADMIN);

    // const burgerProvider = new EpplexProvider(
    //     wallet,
    //     CONNECTION,
    //     CONFIRM_OPTIONS
    // );
    //

    const provider = new anchor.AnchorProvider(
        CONNECTION,
        wallet,
        CONFIRM_OPTIONS
    )
    // anchor.setProvider(provider);

    const burgerProvider = EpplexProvider.fromAnchorProvider(provider)

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

