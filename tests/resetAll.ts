import { setupGlobals } from "./utils/setup";
import { expect } from "chai";
import {
    EpNFTService,
    getTransactionSize,
    sendAndConfirmRawTransaction,
} from "../src";
import { PublicKey, Transaction } from "@solana/web3.js";
import { EpNFT } from "../lib";
import { getAccount, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { getAtaAddressPubkey } from "../lib/utils/generic";

describe("Reset all tokens in PAYER_ADMIN", () => {
    const { wallet, burgerProvider } = setupGlobals();
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
        const batchSize = 1; // Number of iterations after which transaction will be executed

        console.log(
            "mynts",
            myNFts.map((a) => a.mint.toString()),
        );
        for (let i = 0; i < myNFts.length; i++) {
            const mint: PublicKey = myNFts[i].mint;

            // TODO paste collectionMint in here, excludes the collection mint
            if (
                mint.toString() ===
                "8kNVHWjGPT241f4oeUZQxhemJFir7pyxqXAMy32Bksj1"
            ) {
                continue;
            }

            // const ata = getAtaAddressPubkey(mint, owner);
            // const { isFrozen } = await getAccount(
            //     connection,
            //     ata,
            //     undefined,
            //     TOKEN_2022_PROGRAM_ID,
            // );
            // console.log(
            //     "mint",
            //     mint.toString(),
            //     "ata",
            //     ata.toString(),
            //     isFrozen,
            // );
            // if (isFrozen) {
            //     const unfreezeTx = await burgerProvider.tokenThawTx({
            //         mint,
            //         owner: wallet.publicKey,
            //     });
            //     ixs.push(...unfreezeTx.instructions);
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
