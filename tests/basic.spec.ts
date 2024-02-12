import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, Keypair} from "@solana/web3.js";
import {loadOrGenerateKeypair} from "./testUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {EpplexProvider, EpNFTService} from "../src";
import {sendAndConfirmRawTransaction} from "../src/utils/generic";
import {encryptMessage} from "../src/utils/encrypt";
import assert = require("node:assert");
import {CONNECTION} from "./connection";

// This works
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({path: path.resolve(__dirname, "../.env.local")})
// console.log("prces", process.env.MINT_POOL_KEYPAIR)


// const testKeypair = loadOrGenerateKeypair("epplex_PAYER_ADMIN.json");
const testKeypair = Keypair.generate()
const wallet = new NodeWallet(testKeypair);
const epplexProvider = new EpplexProvider(
    wallet,
    CONNECTION,
    {skipPreflight: true}
);

describe("Testing Burger Program", () => {
    // Expiry date in 1 hr
    const expiryDate = (Math.floor((new Date()).getTime() / 1000) + 3600).toString()
    console.log("destroy", expiryDate);
    const mint = Keypair.generate();
    const metadata = {
        expiryDate: expiryDate,
        name: "(SDK tests) Ephemeral burger",
        symbol: "EP",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
    }

    it("Create whitelist mint", async() => {
      const tx = await epplexProvider.createWhitelistMintTx({
          expiryDate: metadata.expiryDate,
          mint: mint,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri
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

    it("Check is Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(CONNECTION, mint.publicKey)
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
        const tx = await epplexProvider.tokenGameVoteTx({
            mint: mint.publicKey,
            message: "hello",
            owner: owner,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

    it("Token Burn", async() => {
        const owner = wallet.publicKey;
        const tx = await epplexProvider.burnTokenTx({
            mint: mint.publicKey,
            owner: owner,
        })
        await sendAndConfirmRawTransaction(CONNECTION, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })
});

