import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, Transaction} from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {EpplexProvider, nftTransferIxs} from "../src";
import {sendAndConfirmRawTransaction} from "../src/utils/generic";

// TODO these needs to be deleted
const COMMITMENT = "confirmed";
const connection = new Connection(
    clusterApiUrl("devnet"),
    COMMITMENT
);

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

    it("Airdrop", async () => {
        const tx = await connection.requestAirdrop(
            wallet.publicKey,
            1 * LAMPORTS_PER_SOL
        );
        await new Promise((r) => setTimeout(r, 5000));
        console.log(tx);
    });

    // TODO outdated
    it("Create whitelist mint", async() => {
      const tx = await epplexProvider.createWhitelistMintTx({
          expiryDate: metadata.expiryDate,
          mint: mint.publicKey, //TODO
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri
      })
      await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [mint])

      console.log("\n")
    })

    it("Transfer NFT", async() => {
        const ixs = await nftTransferIxs({
            connection: connection,
            mint: mint.publicKey,
            source: wallet.publicKey,
            destination: Keypair.generate().publicKey,
            payer: wallet.publicKey,
        })

        await sendAndConfirmRawTransaction(
            connection,
            new Transaction().add(...ixs),
            wallet.publicKey,
            wallet,
            []
        )

        console.log("\n")
    })
});

