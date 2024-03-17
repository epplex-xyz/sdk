import {Keypair, PublicKey,} from "@solana/web3.js";
import {setupGlobals} from "./utils/setup";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {setupCollection} from "./setupUtils";
import {PAYER_ADMIN} from "../src/constants/keys";
import {sendAndConfirmRawTransaction} from "../src";
import {expect} from "chai";

describe("WNS", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
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

    const seed = Math.floor(Math.random() * 100000)
    it("Creates a new Rule", async () => {
        const tx = await coreProvider.ruleCreateTx({
            seed,
            ruleCreator: wallet.publicKey,
            renewalPrice: 1000,
            treasury: PAYER_ADMIN
        })
        const id = await sendAndConfirmRawTransaction(burgerProvider.provider.connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    });

    setupCollection(burgerProvider, coreProvider, collectionMint, collectionArgs, metadata, wallet, receiver, seed)
});