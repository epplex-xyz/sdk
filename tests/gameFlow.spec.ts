import {sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {PublicKey} from "@solana/web3.js";
import {EpNFTService} from "../src";
import {sleep} from "./utils/testUtils";
import {expect} from "chai";

const newTimestamp = (Math.floor((new Date()).getTime() / 1000 + 3600 * 12)).toString()
const now = (Math.floor((new Date()).getTime() / 1000)).toString()
describe("Testing Game Flow", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    // const owner = new PublicKey("2N6aJDX1TNs6RKkPsuufbAe4JjRAZPs1iLPcEUL4DX4z")
    const owner = wallet.publicKey
    let nfts = [];

    it("Reset All Tokens (None gamestate)", async() => {
        nfts = await EpNFTService.getEpNFTs(
            burgerProvider.provider.connection,
            owner
        );
        console.log("Number of NFTs", nfts.length);

        for (const {mint} of nfts) {
            const tx = await burgerProvider.tokenGameResetTx({
                mint,
            })
            await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])
        }
    })

    it("Start Game", async () => {
        const tx = await burgerProvider.gameStartTx({
            endTimestamp: Number(newTimestamp),
            voteType: { voteOnce: {} },
            inputType: { text: {} },
            gamePrompt: "What is your favorite burger?",
            gameName: "Game1",
            isEncrypted: false,
            publicEncryptKey: "",
        });
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Token Game vote", async() => {
        for (const {mint} of nfts) {
            const tx = await burgerProvider.tokenGameVoteTx({
                mint,
                message: "hello",
            })
            const id = await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

            const parsedTx = await burgerProvider.provider.connection.getParsedTransaction(id)
            const events = burgerProvider.eventParser.parseLogs(parsedTx.meta.logMessages);
            console.log("events", events);
            // @ts-ignore
            for (let event of events) {
                console.log(event);
            }
        }
    })

    it("Force Game End", async () => {
        const tx = await burgerProvider.gameUpdateTx({
            phaseStartTimestamp: null,
            phaseEndTimestamp: Number(now),
            voteType: { voteOnce: {} }
        });
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });


    // it("Force Game End", async () => {
    //     const tx = await burgerProvider.gameUpdateTx({
    //         phaseStartTimestamp: null,
    //         phaseEndTimestamp: Number(now),
    //         voteType: { voteOnce: {} }
    //     });
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });

    // it("Evaluate Game", async () => {
    //     const tx = await burgerProvider.gameEvaluateTx();
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });



    // it("Create Game", async () => {
    //     const tx = await burgerProvider.gameCreateTx();
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });



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

    // it('Burn token SUCCESS', async () => {
    //     console.log("Sleeping for 4 seconds");
    //     await sleep(4_000);
    //
    //     const tx = await burgerProvider.burnTokenTx({
    //         mint: new PublicKey("CKRXBicpi23pcAinUknkRGFn6KcRsSYg8R7Whh7pBe4G"),
    //         owner: wallet.publicKey,
    //         useGameConfig: false
    //     });
    //     const res = await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    //     expect(res).to.not.be.empty;
    // });

    // it("Update Game", async () => {
    //     const tx = await burgerProvider.gameUpdateTx({
    //         phaseStartTimestamp: null,
    //         phaseEndTimestamp: Number(newTimestamp),
    //         voteType: { voteMany: {} }
    //     });
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    // });

    it("Close Game", async () => {
        const tx = await burgerProvider.gameCloseTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });
});

