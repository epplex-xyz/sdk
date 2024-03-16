import {Keypair, PublicKey,} from "@solana/web3.js";
import {setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";

import {setupCollection} from "./setupUtils";

describe("WNS", () => {
    const {wallet, burgerProvider} = setupGlobals()
    const collectionMint = Keypair.generate();
    const receiver = new PublicKey("G4QhBg3fF2U7RSwC734ViwL3DeZVrR2TyHMNWHSLwMj");

    const metadata = getDefaultMetadata({})
    const maxSize = 1;
    const collectionArgs ={
        groupMint: collectionMint.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        maxSize: maxSize
    }

    setupCollection(burgerProvider, collectionMint, collectionArgs, metadata, wallet, receiver)
});