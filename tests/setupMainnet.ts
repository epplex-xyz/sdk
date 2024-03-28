import {setupGlobals} from "./utils/setup";
import {PAYER_ADMIN} from "../src/constants/keys";
import {sendAndConfirmRawTransaction} from "../src";
import {expect} from "chai";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider, coreProvider } = setupGlobals();
    const seed = 69_420
    const renewalPrice = 1000_000_000_000

    it("Creates a new Rule", async () => {
        // const res = await coreProvider.getRuleData(seed) // Account data
        // const acc = await coreProvider.getEphemeralRule(seed) // Account
        // console.log("res",Number(res.seed), acc.toString())

        const tx = await burgerProvider.ephemeralRuleCreateTx({
            seed: seed,
            renewalPrice: renewalPrice,
            treasury: PAYER_ADMIN
        })
        const id = await sendAndConfirmRawTransaction(burgerProvider.provider.connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    });

});