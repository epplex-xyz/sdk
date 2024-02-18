import { BN } from "@coral-xyz/anchor";
import { PublicKey, } from "@solana/web3.js";
import {
    sendAndConfirmRawTransaction,
} from "../src";
import { CONNECTION, getSetup } from "./setup";
// import {
//     trySetupBurgerProgramDelegate,
//     trySetupGlobalCollectionConfig,
// } from "./testUtils";

const { wallet, burgerProvider } = getSetup();

describe("Test Game Functionality", () => {
    let mint = new PublicKey(""); // ! UPDATE ME

    it("create game", async () => {
        const tx = await burgerProvider.gameCreateTx({
            mint,
            gameRound: 0,
            gameStatus: { inProgress: {} }, // I think we should remove this
            phaseStart: 124, // ! update me with correct timestamp
            endTimestampOffset: 23, // ! update me
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

    it("votes", async () => {
        const tx = await burgerProvider.tokenGameVoteTx({
            mint,
            message: "this is awesome", // ! what is this message. what should be contained here
        });

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
    });

    it("game ends", async () => {
        const tx = await burgerProvider.gameEndTx(mint);

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
    });

    // ? should we create an admin folder for these
    it("resets game", async () => {
        const tx = await burgerProvider.tokenGameResetTx({ mint });

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
    });
});
