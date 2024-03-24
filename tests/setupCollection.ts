import {setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {Keypair} from "@solana/web3.js";
import {setupCollection} from "./setupUtils";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider, coreProvider } = setupGlobals();
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

    console.log("ruleSeed", seed);
    console.log("collectionMint", collectionMint.publicKey.toString());
    const receiver = undefined
    // const receiver = new PublicKey("")

    const mints = setupCollection(
        burgerProvider, coreProvider, collectionMint, collectionArgs, metadata, wallet, receiver, seed
    )
});