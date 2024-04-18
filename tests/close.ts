import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {ComputeBudgetProgram, Transaction} from "@solana/web3.js";


describe("Close game should not be run in prod", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    it("Reset game", async() => {
        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 200_000
            }),
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 50_000,
            }),
        ];
        const tx = await burgerProvider.gameCloseTx()
        await sendAndConfirmRawTransaction(CONNECTION, new Transaction().add(...[...ixs, ...tx.instructions]), wallet.publicKey, wallet, [])
    })
});
