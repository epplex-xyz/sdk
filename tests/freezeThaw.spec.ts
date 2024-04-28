import { sendAndConfirmRawTransaction } from "../src";
import { setupGlobals } from "./utils/setup";
import { PublicKey } from "@solana/web3.js";

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

    it("Thawing", async () => {
        const tx = await burgerProvider.tokenThawTx({ mint: pubkey });
        await sendAndConfirmRawTransaction(
            connection,
            tx,
            wallet.publicKey,
            wallet,
            [],
        );
    });
});
