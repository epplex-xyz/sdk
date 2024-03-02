import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";


describe("WNS integration", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    it("Mint", async() => {
        const tx = await burgerProvider.gameCloseTx()
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })



});

