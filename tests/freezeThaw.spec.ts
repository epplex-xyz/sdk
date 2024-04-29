import {
    EpNFTService,
    getTransactionSize,
    sendAndConfirmRawTransaction,
} from "../src";
import { setupGlobals } from "./utils/setup";
import { PublicKey, Transaction } from "@solana/web3.js";
import { expect } from "chai";

describe("Test freeze and thaw", () => {
    const { wallet, burgerProvider } = setupGlobals();
    const connection = burgerProvider.provider.connection;
    const pubkey = new PublicKey(
        "DGEDv6cJBpXmR52oAFbddLuTsQvGVPeaSTPP4jKfvUG7",
    );

    // it("Freezing", async () => {
    //     const tx = await burgerProvider.tokenGameFreezeTx({ mint: pubkey });
    //     await sendAndConfirmRawTransaction(
    //         connection,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         [],
    //     );
    // });

    // it("Thaw", async () => {
    //     const tx = await burgerProvider.tokenThawTx({ mint: pubkey });
    //     await sendAndConfirmRawTransaction(
    //         connection,
    //         tx,
    //         wallet.publicKey,
    //         wallet,
    //         [],
    //     );
    // });

    // it("Thaw All", async () => {
    //     const myNFts = await EpNFTService.getT22NFTs(
    //         connection,
    //         wallet.publicKey,
    //     );
    //     console.log("Number of NFTs", myNFts.length);
    //
    //     for (let i = 0; i < myNFts.length; i++) {
    //         const mint: PublicKey = myNFts[i].mint;
    //         console.log(i, mint.toString());
    //         // TODO paste collectionMint in here, excludes the collection mint
    //         const isCollectionMint =
    //             mint.toString() ===
    //             "8kNVHWjGPT241f4oeUZQxhemJFir7pyxqXAMy32Bksj1";
    //         if (isCollectionMint) {
    //             continue;
    //         }
    //
    //         const tx = await burgerProvider.tokenThawTx({
    //             mint,
    //             owner: wallet.publicKey,
    //         });
    //         await sendAndConfirmRawTransaction(
    //             connection,
    //             tx,
    //             wallet.publicKey,
    //             wallet,
    //             [],
    //         );
    //     }
    // });
});
