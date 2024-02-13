import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, Transaction} from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {EpplexProvider, nftTransferIxs, sendAndConfirmRawTransaction} from "../src";
import {getDefaultMetadata} from "./getDefaultMetadata";

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
    const mint = Keypair.generate();
    const metadata = getDefaultMetadata({});

    // TODO outdated
    // it("Create whitelist mint", async() => {
    //   const tx = await epplexProvider.createWhitelistMintTx({
    //       expiryDate: metadata.expiryDate,
    //       mint: mint.publicKey, //TODO
    //       name: metadata.name,
    //       symbol: metadata.symbol,
    //       uri: metadata.uri
    //   })
    //   await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [mint])
    //
    //   console.log("\n")
    // })

    it("Transfer NFT", async() => {
        const ixs = nftTransferIxs({
            connection: connection,
            mint: mint.publicKey,
            source: wallet.publicKey,
            destination: Keypair.generate().publicKey,
            payer: wallet.publicKey,
        })
        const tx = new Transaction().add(...ixs)

        await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, [])
        console.log("\n")
    })
});

