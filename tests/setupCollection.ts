import {setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {Keypair, PublicKey} from "@solana/web3.js";
import {setupCollection} from "./setupUtils";

/*
    Test guide:
    1. Load the local test admin keypair into
 */

describe("Testing Game Flow: mint ->\n create ->\n reset mints ->\n start ->\n vote ->\n evaluate ->\n burn ->\n end ->\n close", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    const collectionMint = Keypair.generate();

    const metadata = getDefaultMetadata({})
    const maxSize = 5;
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }
    const seed = Math.floor(Math.random() * 100000)

    console.log("seed", seed);
    console.log("collection", burgerProvider.getGroupAccountPda(collectionMint.publicKey).toString());
    const receiver = undefined
    // const receiver = new PublicKey("")

    const mints = setupCollection(
        burgerProvider, coreProvider, collectionMint, collectionArgs, metadata, wallet, receiver, seed
    )
});