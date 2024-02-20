import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { sendAndConfirmRawTransaction } from "../src";
import { CONNECTION, getSetup } from "./setup";
// import {
//     trySetupBurgerProgramDelegate,
//     trySetupGlobalCollectionConfig,
// } from "./testUtils";

const { wallet, burgerProvider } = getSetup();

describe("Test Game Functionality", () => {
    let mint = new PublicKey("DCBwLTGVUS5HqwYjjHo9gCgkRrVEdioLQVeoE4ef3Wmj"); // ! UPDATE ME

    it("creates a new game", async () => {
        const tx = await burgerProvider.gameCreateTx();

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
    });

    it("start a new game", async () => {
        const nowDate = new Date();

        const currentTs = nowDate.getTime();
        const oneYrLater = nowDate.setFullYear(nowDate.getFullYear() + 1);

        const tx = await burgerProvider.gameStartTx({
            mint,
            gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
            phaseStart: new BN(currentTs),
            endTimestampOffset: new BN(oneYrLater),
            voteType: { voteOnce: {} },
            inputType: { text: {} },
            gamePrompt: "burger is awesome",
            isEncrypted: false,
        });

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
    });

    // it("expect game config to be initialized", async () => {
    //     let result = await burgerProvider.getGameConfig();

    //     console.log(result);
    // });

    // it("votes", async () => {
    //     const tx = await burgerProvider.tokenGameVoteTx({
    //         mint,
    //         message: "this is awesome", // ! what is this message. what should be contained here
    //     });

    //     await sendAndConfirmRawTransaction(
    //         CONNECTION,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         []
    //     );
    // });

    // it("game ends", async () => {
    //     const tx = await burgerProvider.gameEndTx(mint);

    //     await sendAndConfirmRawTransaction(
    //         CONNECTION,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         []
    //     );
    // });

    // // ? should we create an admin folder for these
    // it("resets game", async () => {
    //     const tx = await burgerProvider.tokenGameResetTx({ mint });

    //     await sendAndConfirmRawTransaction(
    //         CONNECTION,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         []
    //     );
    // });
});
