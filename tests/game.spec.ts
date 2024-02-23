import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

import { sendAndConfirmRawTransaction } from "../src";
import { CONNECTION, getSetup } from "./setup";
const { wallet, burgerProvider } = getSetup();

describe("GAME TEST", async () => {
    let sharedMint: PublicKey = new PublicKey("");

    describe("Game start", async () => {
        const nowDate = new Date();
        const currentTs = nowDate.getTime();
        const oneYrLater = nowDate.setFullYear(nowDate.getFullYear() + 1);

        it("start a new game", async () => {
            const tx = await burgerProvider.gameStartTx({
                endTimestamp: new BN(oneYrLater),
                voteType: { voteOnce: {} },
                inputType: { text: {} },
                gamePrompt: "burger is awesome",
                isEncrypted: false,
                publicEncryptKey: "",
            });
            await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );
        });

        it("Fails to start a game if one is already in progress", async () => {
            const tx = await burgerProvider.gameStartTx({
                endTimestamp: new BN(oneYrLater),
                voteType: { voteOnce: {} },
                inputType: { text: {} },
                gamePrompt: "burger is awesome",
                isEncrypted: false,
                publicEncryptKey: "",
            });

            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });

        it("Fails to start a game if arguments provided are invalid", async () => {
            const tx = await burgerProvider.gameStartTx({
                endTimestamp: new BN(currentTs),
                voteType: { voteOnce: {} },
                inputType: { text: {} },
                gamePrompt: "burger is awesome",
                isEncrypted: false,
                publicEncryptKey: "",
            });
            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });
    });

    describe("Voting", async () => {
        it("votes", async () => {
            const tx = await burgerProvider.tokenGameVoteTx({
                mint: sharedMint,
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

        // if metadata fields are filled, it indicated that the vote has already been cast
        it("should fail to vote if metadata fields are filled", async () => {
            const tx = await burgerProvider.tokenGameVoteTx({
                mint: sharedMint,
                message: "this is awesome", // ! what is this message. what should be contained here
            });

            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });
    });

    describe("game end stage", () => {
        it("ends a game", async () => {
            const tx = await burgerProvider.gameEndTx();
            await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );
        });

        it("should fail to vote if game is finished", async () => {
            const tx = await burgerProvider.tokenGameVoteTx({
                mint: sharedMint,
                message: "this is awesome", // ! what is this message. what should be contained here
            });

            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });
    });

    describe("game reset stage", () => {
        it("resets game", async () => {
            const tx = await burgerProvider.tokenGameResetTx({
                mint: sharedMint,
            });
            await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );
        });

        // this indicates that the user hasn't voted yet
        it("fails to end game if metadata fields are empty", async () => {
            const tx = await burgerProvider.gameEndTx();

            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });

        // this indicates that the user did not give an answer for the game round and he should do so,
        it("fails to reset game the metadata fields are empty", async () => {
            const tx = await burgerProvider.tokenGameResetTx({
                mint: sharedMint,
            });

            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });

        // ! MOVE THIS UP TO THE NEW ARGUMENTS VALIDATION DESCRIBE BLOCK
        it("fails to reset game if expiry timestamp reached", async () => {
            const tx = await burgerProvider.gameEndTx();

            const res = await sendAndConfirmRawTransaction(
                CONNECTION,
                tx,
                wallet.publicKey,
                wallet,
                []
            );

            expect(res).to.be.equal(null);
        });
    });
});