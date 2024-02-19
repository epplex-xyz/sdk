import {Keypair, PublicKey} from "@solana/web3.js";
import {EpNFTService, getGlobalCollectionConfig, getMint, sendAndConfirmRawTransaction} from "../src";
import {CONNECTION, getSetup} from "./setup";
import {assert} from "chai";
import {getDefaultMetadata} from "./getDefaultMetadata";
import {trySetupBurgerProgramDelegate, trySetupGlobalCollectionConfig} from "./testUtils";
import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";

const {wallet, burgerProvider, coreProvider} = getSetup();
const metadata = getDefaultMetadata({});

describe("Testing Burger Program", () => {
    trySetupGlobalCollectionConfig(coreProvider, wallet);
    trySetupBurgerProgramDelegate(burgerProvider, wallet);

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
        console.log("Individual Mint Metadata", await getTokenMetadata(burgerProvider.provider.connection, mint));
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

    // it("Token Burn", async() => {
    //     const owner = wallet.publicKey;
    //     const tx = await burgerProvider.burnTokenTx({
    //         mint: mint.publicKey,
    //         owner: owner,
    //     })
    //     await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])
    //
    //     console.log("\n")
    // })
});

