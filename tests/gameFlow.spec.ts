import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";

const newTimestamp = (Math.floor((new Date()).getTime() / 1000 + 3600)).toString()
describe("Testing Game Flow", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    // it("Start Game", async () => {
    //     const tx = await burgerProvider.gameStartTx({
    //         endTimestamp: Number(newTimestamp),
    //         voteType: { voteOnce: {} },
    //         inputType: { text: {} },
    //         gamePrompt: "What is your favorite burger?",
    //         gameName: "Game1",
    //         isEncrypted: false,
    //         publicEncryptKey: "",
    //     });
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });

    it("Update Game", async () => {
        const tx = await burgerProvider.gameUpdateTx({
            phaseStartTimestamp: null,
            phaseEndTimestamp: Number(newTimestamp),
            // voteType: { voteMany: {} }
        });
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });



    // it("Evaluate Game", async () => {
    //     const tx = await burgerProvider.gameEvaluateTx();
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });
    //
    //
    // it("Close Game", async () => {
    //     const tx = await burgerProvider.gameCloseTx();
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });

});

