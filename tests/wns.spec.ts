import * as anchor from "@coral-xyz/anchor";
import {Keypair,} from "@solana/web3.js";
import {CONNECTION, PAYER_ADMIN, setupGlobals} from "./utils/setup";
import {sendAndConfirmRawTransaction} from "../src";

describe("Ephemeral Membership", () => {
    const {wallet, wenProvider} = setupGlobals(false)
    const mint = Keypair.generate();

    const seed =  new anchor.BN(Math.floor(Math.random() * 100000))
    const ruleCreator = wallet.publicKey;
    const renewalPrice = new anchor.BN(1000); // In Lamports
    const treasury = PAYER_ADMIN.publicKey;

    const endingTime = Date.now() + 7 * 24 * 3600;
    const name = "Epplex Membership";
    const symbol = "EPPLEX";
    const uri = "https://epplex.io/membership";

    // export interface CreateCollectionArgs {
    //     mint: string;
    //     name: string;
    //     symbol: string;
    //     uri: string;
    //     maxSize: number;
    // }
    it("Creates a new Rule", async () => {
        const tx = await coreProvider.ruleCreateTx({
            seed, ruleCreator, renewalPrice, treasury
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

});