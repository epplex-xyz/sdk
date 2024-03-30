import {Connection, PublicKey} from "@solana/web3.js";
import {loadOrGenerateKeypair} from "./keyUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {CoreProvider, EpplexProvider} from "../../src";
import {
    trySetupBurgerProgramDelegate,
    trySetupGameConfig,
    trySetupGlobalCollectionConfig,
    trySetupManagerAccount
} from "../setupUtils";
import WenProvider from "../../src/WenProvider";
import {COMMITMENT, CONFIRM_OPTIONS, getClusterByEndpoint} from "../../src/utils/settings";

export const SDK_TEST_VERSION = "6.0";
export const DEFAULT_NFT_NAME = "DEFAULT_DEV";

/*
    How to use:
    1. .local_keys/epplex_PAYER_ADMIN.json needs to exist
    2. yarn test-collection or another test in package.json
 */
const RPC = process.env.RPC;
if (!RPC) {
    throw new Error("RPC is not defined in .env file");
}

const cluster = getClusterByEndpoint(RPC);
let PROGRAM_IDS;
if (cluster === "local") {
    PROGRAM_IDS = {
        wns: new PublicKey("WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"),
        royalty: new PublicKey("WRDeuzdXF7QmJbTRfiyKz7CUCXX6EbZo1dpH7G7W744"),
        burger: undefined,
        core: undefined
        // burger: new PublicKey("LepByYNXCXLAQicahdRvvxBD45SMNHJgoNsAUDLyG1N"),
        // core: new PublicKey("LepCn3tW66Fh7CGsJ7qjQaontU7SvEoURnxkEY78j1j")
    }
} else {
    PROGRAM_IDS = {
        wns: new PublicKey("wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM"),
        royalty: new PublicKey("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay"),
        burger: new PublicKey("epBuJysRKuFMMWTWoX6ZKPz5WTZWb98mDqn1emVj84n"),
        core: new PublicKey("epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"),
    }
}

export const CONNECTION = new Connection(
    RPC,
    COMMITMENT
);


export const PAYER_ADMIN = loadOrGenerateKeypair("epplex_PAYER_ADMIN");
console.log("CONNECTION", CONNECTION.rpcEndpoint, CONFIRM_OPTIONS)
console.log("PROGRAM_IDS", Object.values(PROGRAM_IDS).map((obj) => obj ? obj.toString() : undefined ))
console.log("Payer Admin: ", PAYER_ADMIN.publicKey.toString())

interface GetSetupReturn {
    wallet: NodeWallet,
    burgerProvider: EpplexProvider,
    coreProvider: CoreProvider,
    wenProvider: WenProvider
}

export function getSetup(): GetSetupReturn {
    const wallet = new NodeWallet(PAYER_ADMIN);

    const burgerProvider = new EpplexProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS,
        PROGRAM_IDS,
    );

    const coreProvider = new CoreProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS,
        PROGRAM_IDS.core,
    );

    const wenProvider = new WenProvider(
        wallet,
        CONNECTION,
        CONFIRM_OPTIONS,
        {metadata: PROGRAM_IDS.wns, royalty: PROGRAM_IDS.royalty}
    );

    return {
        wallet,
        burgerProvider,
        coreProvider,
        wenProvider,
    }
}


export function setupGlobals(executeTests: boolean = true): GetSetupReturn {
    const {
        wallet,
        burgerProvider,
        coreProvider,
        wenProvider
    } = getSetup();

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
        wenProvider
    }
}
