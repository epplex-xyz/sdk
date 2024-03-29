import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";


describe("Close game", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    it("Reset game", async() => {
        const tx = await burgerProvider.gameCloseTx()
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])
    })

});
