import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, Keypair} from "@solana/web3.js";
import {loadOrGenerateKeypair} from "./testUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {EpplexProvider} from "../src";
import {sendAndConfirmRawTransaction} from "../src/utils";

const COMMITMENT = "confirmed";
const connection = new Connection(
    clusterApiUrl("devnet"),
    COMMITMENT
);


const testKeypair = loadOrGenerateKeypair("mintPool");
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
        name: "Ephemeral burger",
        symbol: "EP",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
    }

  it("Airdrop", async () => {
    const tx = await connection.requestAirdrop(
      wallet.publicKey,
      1 * LAMPORTS_PER_SOL
    );
    await new Promise((r) => setTimeout(r, 5000));
    console.log(tx);
  });

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

    it("Token Game Vote", async() => {
        const owner = wallet.publicKey;
        const tx = await epplexProvider.tokenGameVoteTx({
            mint: mint.publicKey,
            owner: owner,
        })
        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])

        console.log("\n")
    })

});

