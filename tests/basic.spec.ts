import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, Keypair} from "@solana/web3.js";
// import {loadOrGenerateKeypair} from "./testUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {EpplexProvider, EpNFTService} from "../src";
import {sendAndConfirmRawTransaction} from "../src/utils/generic";
import {encryptMessage} from "../src/utils/encrypt";
import assert = require("node:assert");

const COMMITMENT = "confirmed";
const connection = new Connection(
    clusterApiUrl("devnet"),
    COMMITMENT
);

// const testKeypair = loadOrGenerateKeypair("mintPool");
const testKeypair = Keypair.generate()
const wallet = new NodeWallet(testKeypair);
const epplexProvider = new EpplexProvider(
    wallet,
    connection,
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
    const secretKey = "asdfe12j0Cs"

    // it("Airdrop", async () => {
    //     const tx = await connection.requestAirdrop(
    //         wallet.publicKey,
    //         1 * LAMPORTS_PER_SOL
    //     );
    //     await new Promise((r) => setTimeout(r, 5000));
    //     console.log(tx);
    // });

    it("Create whitelist mint", async() => {
      const tx = await epplexProvider.createWhitelistMintTx({
          expiryDate: metadata.expiryDate,
          mint: mint,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri
      })
      await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [mint])

      console.log("\n")
    })

    it("Get epNFTs", async() => {
        const epNFTs = await EpNFTService.getEpNFTs(connection, wallet.publicKey)
        assert.ok(epNFTs)
        assert.equal(epNFTs.length > 0, true)
        console.log("\n")
    })

    it("Check is Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(connection, mint.publicKey)
        assert.equal(true, check)

        console.log("\n")
    })

    it("Check not Burger NFT", async() => {
        const check = await EpNFTService.isBurgerNFT(connection, Keypair.generate().publicKey)
        assert.equal(false, check)

        console.log("\n")
    })


    it("Token Game Vote", async() => {
        const owner = wallet.publicKey;
        const message = encryptMessage("hello", secretKey)
        console.log('mesage', message)
        const tx = await epplexProvider.tokenGameVoteTx({
            mint: mint.publicKey,
            message,
            owner: owner,
        })
        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

    it("Token Burn", async() => {
        const owner = wallet.publicKey;
        const tx = await epplexProvider.burnTokenTx({
            mint: mint.publicKey,
            owner: owner,
        })
        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })
});

