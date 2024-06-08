import { Connection } from "@solana/web3.js";
import { loadOrGenerateKeypair } from "./keyUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { CoreProvider, EpplexProvider } from "../../src";
import {
    trySetupBurgerProgramDelegate,
    trySetupGameConfig,
    trySetupGlobalCollectionConfig,
    trySetupManagerAccount,
} from "../setupUtils";
import WenProvider from "../../src/WenProvider";
import {
    COMMITMENT,
    CONFIRM_OPTIONS,
    getClusterByEndpoint,
} from "../../src/utils/settings";
import { getIdsByNetwork } from "../../src/constants/ids";

export const SDK_TEST_VERSION = "6.0";
export const DEFAULT_NFT_NAME = "DEFAULT_DEV";

const RPC = process.env.RPC as string;
if (!RPC) {
    throw new Error("RPC is not defined in .env file");
}

const cluster = getClusterByEndpoint(RPC);
export const CONNECTION = new Connection(RPC, COMMITMENT);

export const PAYER_ADMIN = loadOrGenerateKeypair("epplex_PAYER_ADMIN");
console.log("CONNECTION", CONNECTION.rpcEndpoint, CONFIRM_OPTIONS);
console.log("NETWORK", cluster);
console.log("Payer Admin: ", PAYER_ADMIN.publicKey.toString());

interface GetSetupReturn {
    wallet: NodeWallet;
    burgerProvider: EpplexProvider;
    coreProvider: CoreProvider;
    wenProvider: WenProvider;
}

export function getSetup(): GetSetupReturn {
    const wallet = new NodeWallet(PAYER_ADMIN);
    const ids = getIdsByNetwork(cluster);
    const burgerProvider = new EpplexProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS,
        cluster,
    );

    const coreProvider = new CoreProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS,
        ids.core,
    );

    const wenProvider = new WenProvider(wallet, CONNECTION, CONFIRM_OPTIONS, {
        metadata: ids.wns,
        royalty: ids.royalty,
    });

    return {
        wallet,
        burgerProvider,
        coreProvider,
        wenProvider,
    };
}

export function setupGlobals(executeTests: boolean = true): GetSetupReturn {
    const { wallet, burgerProvider, coreProvider, wenProvider } = getSetup();

    if (executeTests) {
        trySetupGlobalCollectionConfig(coreProvider, wallet);
        trySetupBurgerProgramDelegate(burgerProvider, wallet);
        trySetupGameConfig(burgerProvider, wallet);
        trySetupManagerAccount(wenProvider, wallet);
    }

    return {
        wallet,
        burgerProvider,
        coreProvider,
        wenProvider,
    };
}
