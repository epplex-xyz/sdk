import { setupGlobals } from "./utils/setup";
import { expect } from "chai";
import {
    EpNFTService,
    getTransactionSize,
    sendAndConfirmRawTransaction,
} from "../src";
import { PublicKey, Transaction } from "@solana/web3.js";
import { EpNFT } from "../lib";

describe("Reset all tokens in PAYER_ADMIN", () => {
    const { wallet, burgerProvider, wenProvider } = setupGlobals();
    const owner = wallet.publicKey;

    const connection = burgerProvider.provider.connection;
    let myNFts: EpNFT[] = [];

    it("Get all NFTs", async () => {
        myNFts = await EpNFTService.getT22NFTs(connection, owner);
        console.log("Number of NFTs", myNFts.length);
        expect(myNFts).to.not.be.empty;
    });

    it("Reset all tokens", async () => {
        const ixs = [];
        const batchSize = 5; // Number of iterations after which transaction will be executed

        for (let i = 0; i < myNFts.length; i++) {
            const mint: PublicKey = myNFts[i].mint;

            // TODO paste collectionMint in here, excludes the collection mint
            if (
                mint.toString() ===
                "8kNVHWjGPT241f4oeUZQxhemJFir7pyxqXAMy32Bksj1"
            ) {
                continue;
            }

            // if (myNFts[i].tokenMetadata === undefined) {
            //     continue
            // }
            // // console.log("sdasd", myNFts[i].tokenMetadata)
            // if (!myNFts[i].tokenMetadata.name.includes("BOB")) {
            //     continue
            // }

            const tx = await burgerProvider.tokenGameResetTx({ mint });
            ixs.push(...tx.instructions);

            // Check if the current iteration is a multiple of the batch size
            if ((i + 1) % batchSize === 0 || i === myNFts.length - 1) {
                // If it's the 5th iteration or the last iteration, execute the transaction
                const finalTx = new Transaction().add(...ixs);

                // 5 reset instructions equates to 618, max size is 1238, so we could prolly pack 10 vote ixs into one tx
                console.log(
                    "tx size",
                    getTransactionSize(wallet.publicKey, finalTx.instructions),
                );

                await sendAndConfirmRawTransaction(
                    connection,
                    finalTx,
                    wallet.publicKey,
                    wallet,
                    [],
                );
                // Clear instructions array for the next batch
                ixs.length = 0;
            }
        }
    });
});
