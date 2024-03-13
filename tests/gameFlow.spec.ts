import {getMint, sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {sleep} from "./utils/testUtils";
import {expect} from "chai";
import {BN} from "@coral-xyz/anchor";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";

const metadata = getDefaultMetadata({});
const newTimestamp = (Math.floor((new Date()).getTime() / 1000 + 3600 * 12)).toString()
const now = (Math.floor((new Date()).getTime() / 1000)).toString()
describe("Testing Game Flow:\n create ->\n mint ->\n reset mints ->\n start ->\n vote ->\n evaluate ->\n burn ->\n end ->\n close", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    let mint;
    it("Mint token", async () => {
        console.log("\n \n");
        const globalCollectionData = await coreProvider.program.account.globalCollectionConfig.fetch(
            coreProvider.getGlobalCollectionConfig()
        );

        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
        const tx = await burgerProvider.createWhitelistMintTx({
            ...metadata,
            mint,
        });
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Reset All Tokens (None gamestate)", async() => {
        // const myNFts = await EpNFTService.getEpNFTs(
        //     epplexProvider.provider.connection,
        //     owner
        // );
        // nfts = myNFts.slice(1,2);
        // console.log("Number of NFTs", nfts.length);

        const tx = await burgerProvider.tokenGameResetTx({mint,})
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])
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
        const tx = await burgerProvider.tokenGameVoteTx({mint, message: "hello"})
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])
    })

    it("Force Game End: update endTime to now", async () => {
        const tx = await burgerProvider.gameUpdateTx({
            phaseStartTimestamp: null,
            phaseEndTimestamp: Number(now),
            voteType: { voteOnce: {} }
        });
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Evaluate Game", async () => {
        const tx = await burgerProvider.gameEvaluateTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it('Burn token', async () => {
        await sleep(1_000);

        const tx = await burgerProvider.tokenBurnTx({
            mint: mint,
            owner: wallet.publicKey,
            useGameConfig: true
        });
        const res = await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
        expect(res).to.not.be.empty;
    });


    it("End game", async () => {
        const tx = await burgerProvider.gameEndTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });

    it("Close Game", async () => {
        const tx = await burgerProvider.gameCloseTx();
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });
});

