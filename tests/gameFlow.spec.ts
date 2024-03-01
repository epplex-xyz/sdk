import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";


describe("Testing Game Flow", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    it("Start Game", async () => {
        const tx = await burgerProvider.gameCreateTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Close Game", async () => {
        const tx = await burgerProvider.gameCloseTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

});

