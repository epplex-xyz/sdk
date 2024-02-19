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

    // it("create game", async () => {
    //     const nowDate = new Date();

    //     const currentTs = nowDate.getTime();
    //     const oneYrLater = nowDate.setFullYear(nowDate.getFullYear() + 1);

    //     // console.log(currentTs);
    //     // console.log(oneYrLater);

    //     const tx = await burgerProvider.gameCreateTx({
    //         mint,
    //         gameRound: new BN(0), // ? should we be passing this in. we should read from game config and use that or just default from zero
    //         gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
    //         phaseStart: new BN(currentTs), // ! update me with correct timestamp
    //         endTimestampOffset: new BN(oneYrLater), // ! update me
    //         voteType: { voteOnce: {} },
    //         inputType: { text: {} },
    //         gamePrompt: "burger is awesome",
    //         isEncrypted: false,
    //     });

    //     await sendAndConfirmRawTransaction(
    //         CONNECTION,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         []
    //     );
    // });

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
