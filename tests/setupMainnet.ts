import {setupGlobals} from "./utils/setup";
import {PAYER_ADMIN} from "../src/constants/keys";
import {sendAndConfirmRawTransaction} from "../src";
import {expect} from "chai";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider } = setupGlobals();
    const seed = 69420
    const renewalPrice = 1000_000_000_000

    it("Creates a new Rule", async () => {
        const tx = await burgerProvider.ephemeralRuleCreateTx({
            seed: seed,
            renewalPrice: renewalPrice,
            treasury: PAYER_ADMIN
        })
        const id = await sendAndConfirmRawTransaction(burgerProvider.provider.connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    });

});