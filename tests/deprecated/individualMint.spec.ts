import { BN } from "@coral-xyz/anchor";
import { getTokenMetadata } from "@solana/spl-token";
import {CONNECTION, setupGlobals} from "../utils/setup";
import { getDefaultMetadata } from "../utils/getDefaultMetadata";
import {
    sendAndConfirmRawTransaction,
    getMint,
    nftTransferIxs,
} from "../../src";
import { PublicKey, Transaction } from "@solana/web3.js";

const metadata = getDefaultMetadata({});

describe("Individual mint", () => {
    const { wallet, burgerProvider, coreProvider } = setupGlobals();

    let mint: PublicKey;
    it("Mint token", async () => {
        console.log("\n \n");
        const globalCollectionData =
            await coreProvider.program.account.globalCollectionConfig.fetch(
                coreProvider.getGlobalCollectionConfig()
            );

        mint = getMint(globalCollectionData.collectionCounter, new BN(0));
        const tx = await burgerProvider.createWhitelistMintTx({
            expiryDate: metadata.expiryDate,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mint,
        });

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
        console.log(
            "Individual Mint Metadata",
            await getTokenMetadata(burgerProvider.provider.connection, mint)
        );
    });

    it("Transfer NFT", async () => {
        const ixs = nftTransferIxs({
            connection: CONNECTION,
            mint: mint,
            source: wallet.publicKey,
            destination: new PublicKey(
                "2N6aJDX1TNs6RKkPsuufbAe4JjRAZPs1iLPcEUL4DX4z"
            ),
            payer: wallet.publicKey,
        });
        const tx = new Transaction().add(...ixs);

        await sendAndConfirmRawTransaction(
            CONNECTION,
            tx,
            wallet.publicKey,
            wallet,
            []
        );
        console.log("\n");
    });
});
