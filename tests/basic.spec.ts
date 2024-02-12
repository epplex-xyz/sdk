import {Keypair} from "@solana/web3.js";
import {EpNFTService} from "../src";
import {sendAndConfirmRawTransaction} from "../src/utils/generic";
import {CONNECTION, getSetup} from "./setup";
import assert = require("node:assert");
import {getGlobalCollectionConfig} from "../src/constants/coreSeeds";

const {wallet, burgerProvider} = getSetup();

const mint = Keypair.generate();
const metadata = {
    expiryDate: (Math.floor((new Date()).getTime() / 1000) + 3600).toString(), // 1 hr
    name: "(SDK tests) Ephemeral burger",
    symbol: "EP",
    uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
}

describe("Testing Burger Program", () => {
    // TODO this is outdated
    it("Create whitelist mint", async() => {
      const tx = await burgerProvider.createWhitelistMintTx({
          expiryDate: metadata.expiryDate,
          mint: mint.publicKey, //TODO
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          globalCollectionConfig: getGlobalCollectionConfig(),
      })
      await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [mint])

      console.log("\n")
    })

    it("Get epNFTs", async() => {
        const epNFTs = await EpNFTService.getEpNFTs(CONNECTION, wallet.publicKey)
        assert.ok(epNFTs)
        assert.equal(epNFTs.length > 0, true)
        console.log("\n")
    })

    // TODO outdated
    it("Check is Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(CONNECTION, mint.publicKey)
        assert.equal(true, check)

        console.log("\n")
    })

    // TODO outdated
    it("Check not Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(CONNECTION, Keypair.generate().publicKey)
        assert.equal(false, check)

        console.log("\n")
    })

    it("Token Game Vote", async() => {
        const owner = wallet.publicKey;
        const tx = await burgerProvider.tokenGameVoteTx({
            mint: mint.publicKey,
            message: "hello",
            owner: owner,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

    it("Token Burn", async() => {
        const owner = wallet.publicKey;
        const tx = await burgerProvider.burnTokenTx({
            mint: mint.publicKey,
            owner: owner,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })
});

