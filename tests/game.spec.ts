import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { sendAndConfirmRawTransaction } from "../src";
import { CONNECTION, getSetup } from "./setup";
import { expect } from "chai";
// import {
//     trySetupBurgerProgramDelegate,
//     trySetupGlobalCollectionConfig,
// } from "./testUtils";

const { wallet, burgerProvider } = getSetup();

describe("GAME TEST", () => {
    let mint = new PublicKey("DCBwLTGVUS5HqwYjjHo9gCgkRrVEdioLQVeoE4ef3Wmj"); // ! UPDATE ME

    describe("Creating Game", () => {
        // it("creates a new game", async () => {
        //     const tx = await burgerProvider.gameCreateTx();
        //     await sendAndConfirmRawTransaction(
        //         CONNECTION,
        //         tx,
        //         wallet.publicKey,
        //         wallet,
        //         []
        //     );
        // });
        // it("Fails to create a new game if one was previously initialized", async () => {
        //     const tx = await burgerProvider.gameCreateTx();
        //     let res = await sendAndConfirmRawTransaction(
        //         CONNECTION,
        //         tx,
        //         wallet.publicKey,
        //         wallet,
        //         []
        //     );
        //     expect(res).to.be.equal(null);
        // });
    });

    // describe("Game start", () => {
    //     const nowDate = new Date();
    //     const currentTs = nowDate.getTime();
    //     const oneYrLater = nowDate.setFullYear(nowDate.getFullYear() + 1);

    //     it("start a new game", async () => {
    //         const tx = await burgerProvider.gameStartTx({
    //             mint,
    //             gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
    //             phaseStart: new BN(currentTs),
    //             endTimestampOffset: new BN(oneYrLater),
    //             voteType: { voteOnce: {} },
    //             inputType: { text: {} },
    //             gamePrompt: "burger is awesome",
    //             isEncrypted: false,
    //         });
    //         await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );
    //     });

    //     it("Fails to start a game if one is already in progress", async () => {
    //         const tx = await burgerProvider.gameStartTx({
    //             mint,
    //             gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
    //             // gameStatus: { finished: {} },
    //             phaseStart: new BN(currentTs),
    //             endTimestampOffset: new BN(oneYrLater),
    //             voteType: { voteOnce: {} },
    //             inputType: { text: {} },
    //             gamePrompt: "burger is awesome",
    //             isEncrypted: false,
    //         });
    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });

    //     it("Fails to start a game if arguments provided are invalid", async () => {
    //         const tx = await burgerProvider.gameStartTx({
    //             mint,
    //             gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
    //             phaseStart: new BN(oneYrLater),
    //             endTimestampOffset: new BN(currentTs),
    //             voteType: { voteOnce: {} },
    //             inputType: { text: {} },
    //             gamePrompt: "burger is awesome",
    //             isEncrypted: false,
    //         });
    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });
    // });

    // describe("Voting", () => {
    //     // todo (Jimii)
    //     it("should fail to vote if game is finished", async () => {
    //         const tx = await burgerProvider.tokenGameVoteTx({
    //             mint,
    //             message: "this is awesome", // ! what is this message. what should be contained here
    //         });

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });

    //     // if metadata fields are filled, it indicated that the vote has already been cast
    //     it("should fail to vote if metadata fields are filled", async () => {
    //         const tx = await burgerProvider.tokenGameVoteTx({
    //             mint,
    //             message: "this is awesome", // ! what is this message. what should be contained here
    //         });

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });
    // });

    // describe("game end", () => {
    //     it("fails to end game if phase end has already passed", async () => {
    //         const tx = await burgerProvider.gameEndTx(mint);

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });

    //     // this indicates that the user hasn't voted yet
    //     it("fails to end game if metadata fields are empty", async () => {
    //         const tx = await burgerProvider.gameEndTx(mint);

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });
    // });

    // describe("game reset", () => {
    //     // this indicates that the user did not give an answer for the game round and he should do so,
    //     it("fails to reset game the metadata fields are empty", async () => {
    //         const tx = await burgerProvider.tokenGameResetTx({ mint });

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });

    //     // ! not currently using this
    //     it("fails to reset game if expiry timestamp reached", async () => {
    //         const tx = await burgerProvider.gameEndTx(mint);

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });
    // });

    // describe("Working game flow", () => {
    // it("creates a new game", async () => {
    //     const tx = await burgerProvider.gameCreateTx();
    //     await sendAndConfirmRawTransaction(
    //         CONNECTION,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         []
    //     );
    // });

    // it("start a new game", async () => {
    //     const nowDate = new Date();
    //     const currentTs = nowDate.getTime();
    //     const oneYrLater = nowDate.setFullYear(nowDate.getFullYear() + 1);
    //     const tx = await burgerProvider.gameStartTx({
    //         mint,
    //         gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
    //         phaseStart: new BN(currentTs),
    //         endTimestampOffset: new BN(oneYrLater),
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
    //     expect(result.gameMaster);
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
    // });
});
