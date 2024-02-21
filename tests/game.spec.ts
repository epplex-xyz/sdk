import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

import { getMint, sendAndConfirmRawTransaction } from "../src";
import { getDefaultMetadata } from "./getDefaultMetadata";
import { CONNECTION, getSetup } from "./setup";
import {
    trySetupBurgerProgramDelegate,
    trySetupGlobalCollectionConfig,
} from "./testUtils";
const { wallet, burgerProvider, coreProvider } = getSetup();

describe("GAME TEST", async () => {
    let globalCollectionData;
    let sharedMint;

    beforeEach(async () => {
        await trySetupGlobalCollectionConfig(coreProvider, wallet);
        await trySetupBurgerProgramDelegate(burgerProvider, wallet);
        globalCollectionData =
            await coreProvider.program.account.globalCollectionConfig.fetch(
                coreProvider.getGlobalCollectionConfig()
            );
        sharedMint = await whiteListMint(
            globalCollectionData.collectionCounter
        );
    });

    // describe("Creating Game", async () => {
    //     it("creates a new game", async () => {
    //         const tx = await burgerProvider.gameCreateTx();
    //         await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );
    //     });

    //     it("Fails to create a new game if one was previously initialized", async () => {
    //         const tx = await burgerProvider.gameCreateTx();
    //         let res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );
    //         expect(res).to.be.equal(null);
    //     });
    // });

    // describe("Game start", async () => {
    //     const nowDate = new Date();
    //     const currentTs = nowDate.getTime();
    //     const oneYrLater = nowDate.setFullYear(nowDate.getFullYear() + 1);

    //     it("start a new game", async () => {
    //         const tx = await burgerProvider.gameStartTx({
    //             mint: sharedMint,
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
    //             mint: sharedMint,
    //             gameStatus: { inProgress: {} }, // ? I think we should remove this. when game start is called and all validation passes, setting this to in progress should be okay
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
    //             mint: sharedMint,
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

    // describe("Voting", async () => {
    //     it("votes", async () => {
    //         const tx = await burgerProvider.tokenGameVoteTx({
    //             mint: sharedMint,
    //             message: "this is awesome", // ! what is this message. what should be contained here
    //         });
    //         await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );
    //     });

    //     // if metadata fields are filled, it indicated that the vote has already been cast
    //     it("should fail to vote if metadata fields are filled", async () => {
    //         const tx = await burgerProvider.tokenGameVoteTx({
    //             mint: sharedMint,
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

    // describe("game end stage", () => {
    //     it("ends a game", async () => {
    //         const tx = await burgerProvider.gameEndTx(sharedMint);
    //         await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );
    //     });

    //     it("should fail to vote if game is finished", async () => {
    //         const tx = await burgerProvider.tokenGameVoteTx({
    //             mint: sharedMint,
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

    //     // ! MOVE THIS UP TO THE NEW ARGUMENTS VALIDATION DESCRIBE BLOCK
    //     it("fails to end game if phase end has already passed", async () => {
    //         const tx = await burgerProvider.gameEndTx(sharedMint);

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

    // describe("game reset stage", () => {
    //     it("resets game", async () => {
    //         const tx = await burgerProvider.tokenGameResetTx({
    //             mint: sharedMint,
    //         });
    //         await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );
    //     });

    //     // this indicates that the user hasn't voted yet
    //     it("fails to end game if metadata fields are empty", async () => {
    //         const tx = await burgerProvider.gameEndTx(sharedMint);

    //         const res = await sendAndConfirmRawTransaction(
    //             CONNECTION,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             []
    //         );

    //         expect(res).to.be.equal(null);
    //     });

    //     // this indicates that the user did not give an answer for the game round and he should do so,
    //     it("fails to reset game the metadata fields are empty", async () => {
    //         const tx = await burgerProvider.tokenGameResetTx({
    //             mint: sharedMint,
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

    //     // ! MOVE THIS UP TO THE NEW ARGUMENTS VALIDATION DESCRIBE BLOCK
    //     it("fails to reset game if expiry timestamp reached", async () => {
    //         const tx = await burgerProvider.gameEndTx(sharedMint);

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
});

// helper to whitelist mint new NFT
async function whiteListMint(collectionCounter: BN): Promise<PublicKey> {
    const metadata = getDefaultMetadata({});

    const mint: PublicKey = await getMint(collectionCounter, new BN(0));

    try {
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
        });

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            [],
            "confirmed",
            false
        );

        return mint;
    } catch (err) {
        console.log("error minting", err);
        return err;
    }
}
