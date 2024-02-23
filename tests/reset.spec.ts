import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";


describe("Reset States", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    it("Reset game", async() => {
        const tx = await burgerProvider.gameCloseTx()
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

});

