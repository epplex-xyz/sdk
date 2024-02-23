import {Keypair, PublicKey} from "@solana/web3.js";
import {EpNFTService, getMint, sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, setupGlobals} from "./utils/setup";
import {assert} from "chai";
import {getDefaultMetadata} from "./utils/getDefaultMetadata";
import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";
import {sleep} from "./utils/testUtils";


const metadata = getDefaultMetadata({});
const endTimestamp =  (Math.floor((new Date()).getTime() / 1000) + 3).toString() // 3 secs

describe("Testing Burger Program", () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()
    let mint: PublicKey;


    it('Mint token', async () => {
        console.log("\n \n");
        const globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(coreProvider.getGlobalCollectionConfig());

        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
        })

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });


    it("Get epNFTs", async() => {
        const epNFTs = await EpNFTService.getEpNFTs(CONNECTION, wallet.publicKey)
        assert.ok(epNFTs)
        assert.equal(epNFTs.length > 0, true)
        console.log("\n")
    })

    it("Check is Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(CONNECTION, mint)
        assert.equal(true, check)

        console.log("\n")
    })

    it("Check not Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(CONNECTION, Keypair.generate().publicKey)
        assert.equal(false, check)

        console.log("\n")
    })

    it("Token Game Reset", async() => {
        const tx = await burgerProvider.tokenGameResetTx({
            mint: mint,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

    it("Start a new game", async () => {
        const tx = await burgerProvider.gameStartTx({
            endTimestamp: new BN(endTimestamp),
            voteType: { voteOnce: {} },
            inputType: { text: {} },
            gamePrompt: "What is your favorite burger?",
            isEncrypted: false,
            publicEncryptKey: "",
        });

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });


    it("Token Game Vote", async() => {
        const owner = wallet.publicKey;
        const tx = await burgerProvider.tokenGameVoteTx({
            mint: mint,
            message: "hello",
            owner: owner,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

    it("Game end", async() => {
        const tx = await burgerProvider.gameEndTx()
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })


    it("Token Burn", async() => {
        await sleep(3_000);

        const owner = wallet.publicKey;
        const tx = await burgerProvider.burnTokenTx({
            mint: mint,
            owner: owner,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })


    it('Ensure possible to mint token post flow', async () => {
        console.log("\n \n");
        const globalCollectionData = await coreProvider
            .program
            .account
            .globalCollectionConfig
            .fetch(coreProvider.getGlobalCollectionConfig());

        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
        })

        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, []);
    });
});

