import * as anchor from "@coral-xyz/anchor";
import {Keypair,} from "@solana/web3.js";
import {CONNECTION, PAYER_ADMIN, setupGlobals} from "./utils/setup";
import {sendAndConfirmRawTransaction} from "../src";

describe("Ephemeral Membership", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    const membership = Keypair.generate();

    const seed =  new anchor.BN(Math.floor(Math.random() * 100000))
    const ruleCreator = wallet.publicKey;
    const renewalPrice = new anchor.BN(1000); // In Lamports
    const treasury = PAYER_ADMIN.publicKey;

    const endingTime = Date.now() + 7 * 24 * 3600;
    const name = "Epplex Membership";
    const symbol = "EPPLEX";
    const uri = "https://epplex.io/membership";


    it("Creates a new Rule", async () => {
        const tx = await coreProvider.ruleCreateTx({
            seed, ruleCreator, renewalPrice, treasury
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Modify the Rule", async () => {
        const tx = await coreProvider.ruleModifyTx({
            seed, ruleCreator, renewalPrice, treasury
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Create a new Membership NFT", async () => {
        const tx = await coreProvider.membershipCreateTx(
            endingTime, name, symbol, uri, membership.publicKey, ruleCreator, seed
        )
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [membership]);
    });

    it("Add time to Membership", async () => {
        const tx = await coreProvider.timeAddTx({
            time: 7 * 24, seed, membership: membership.publicKey, treasury
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Remove time from Membership", async () => {
        const tx = await coreProvider.timeRemoveTx({
            time: 7 * 24, seed, membership: membership.publicKey, treasury
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Burn Membership", async () => {
        const tx = await coreProvider.memberShipBurnTx(membership.publicKey, seed)
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });
});