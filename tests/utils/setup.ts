import {clusterApiUrl, Connection} from "@solana/web3.js";
import {loadOrGenerateKeypair} from "./keyUtils";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {CoreProvider, EpplexProvider} from "../../src";
import {trySetupBurgerProgramDelegate, trySetupGameConfig, trySetupGlobalCollectionConfig} from "../setupUtils";
import WenProvider from "../../src/WenProvider";

/*
    How to use:
    1. .local_keys/epplex_PAYER_ADMIN.json needs to exist
    2. yarn test-collection or another test in package.json
 */


const COMMITMENT = "confirmed";
const CONFIRM_OPTIONS = {skipPreflight: true}
export const CONNECTION = new Connection(
    "http://127.0.0.1:8899",
    // clusterApiUrl("devnet"),
    COMMITMENT
);
console.log("CONNECTION", CONNECTION.rpcEndpoint)

export const PAYER_ADMIN = loadOrGenerateKeypair("epplex_PAYER_ADMIN");

interface GetSetupReturn {
    wallet: NodeWallet,
    burgerProvider: EpplexProvider,
    coreProvider: CoreProvider,
    wenProvider: WenProvider
}
export function getSetup(): GetSetupReturn {
    const wallet = new NodeWallet(PAYER_ADMIN);

    const provider = new anchor.AnchorProvider(
        CONNECTION,
        wallet,
        CONFIRM_OPTIONS
    )
    // Another way of doing it
    const burgerProvider = EpplexProvider.fromAnchorProvider(provider)

    const coreProvider = new CoreProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS
    );

    const wenProvider = new WenProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS
    );

    return {
        wallet,
        burgerProvider,
        coreProvider,
        wenProvider,
    }
}


export function setupGlobals(executeTests: boolean = true): GetSetupReturn {
    const {wallet, burgerProvider, coreProvider, wenProvider} = getSetup();
    const connection = burgerProvider.provider.connection

    if (executeTests) {
        trySetupGlobalCollectionConfig(coreProvider, wallet, connection);
        trySetupBurgerProgramDelegate(burgerProvider, wallet, connection);
        trySetupGameConfig(burgerProvider, wallet, connection);
    }

    return {
        wallet,
        burgerProvider,
        coreProvider,
        wenProvider
    }
}
