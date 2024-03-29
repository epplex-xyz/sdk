import {setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {Keypair} from "@solana/web3.js";
import {setupCollection} from "./setupUtils";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider , coreProvider} = setupGlobals();
    const collectionMint = Keypair.generate();

    // TEST PARAMS
    const seed = 1337
    const name = "BOB"
    const maxSize = 5;

    const metadata = getDefaultMetadata({name})
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }

    console.log("ruleSeed", seed);
    console.log("collectionMint", collectionMint.publicKey.toString());
    const receiver = undefined
    // const receiver = new PublicKey("")

    setupCollection(
        burgerProvider, coreProvider, collectionMint, collectionArgs, metadata, wallet, receiver, seed
    )
});