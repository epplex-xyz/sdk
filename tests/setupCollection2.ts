import { PAYER_ADMIN, setupGlobals } from "./utils/setup";
import { ComputeBudgetProgram, Keypair, PublicKey } from "@solana/web3.js";
import {
    sendAndConfirmRawTransaction,
    sendAndConfirmRawVersionedTransaction,
} from "../src";
import { expect } from "chai";

describe("Testing Setup Colleciton -> Generate Mints", () => {
    const { wallet, burgerProvider } = setupGlobals();
    const collectionMint = Keypair.generate();

    const maxSize = 1;
    const collectionArgs = {
        groupMint: collectionMint.publicKey,
        // groupMint: collectionMint,
        name: "Col \uD83C\uDF54",
        symbol: "Collection Symbol",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo",
        maxSize: maxSize,
        computeBudget: 200_000,
        computeUnit: 80_000,
    };
    const seed = undefined;
    console.log("ruleSeed", seed);
    console.log("collectionMint", collectionMint.publicKey.toString());

    const mints: PublicKey[] = [];
    // it("Creates a new Rule", async () => {
    //     const tx = await burgerProvider.ephemeralRuleCreateTx({
    //         seed: seed,
    //         renewalPrice: renewalPrice,
    //         treasury: PAYER_ADMIN
    //     })
    //     const id = await sendAndConfirmRawTransaction(burgerProvider.provider.connection, tx, wallet.publicKey, wallet, [])
    //     expect(id).to.not.be.empty;
    // });

    it("Create a collection", async () => {
        const tx = await burgerProvider.wnsGroupMintTx(collectionArgs);
        const id = await sendAndConfirmRawVersionedTransaction(
            burgerProvider.provider.connection,
            [
                ComputeBudgetProgram.setComputeUnitLimit({
                    units: collectionArgs.computeBudget,
                }),
                ...tx.instructions,
            ],
            wallet.publicKey,
            wallet,
            [PAYER_ADMIN, collectionMint],
            undefined,
            undefined,
            undefined,
            "High",
        );
        expect(id).to.not.be.empty;
    });

    it("Max mint nfts into collection", async () => {
        for (let i = 0; i < collectionArgs.maxSize; i++) {
            const mint = Keypair.generate();
            console.log(`mint ${i + 1}`, mint.publicKey.toString());

            const creators = [
                {
                    address: new PublicKey(
                        "burgMnyDXpqEczZkAt25z5fw3aGgJYqDCDT4JDY553W",
                    ),
                    share: 20,
                },
                {
                    address: new PublicKey(
                        "MA1NqUiWSgJz4VDXjPFfNoDWqBBRpMDnT4vxEnt9qbv",
                    ),
                    share: 88,
                },
            ];

            const mintArgs = {
                name: `Burger #${i + 1}`,
                symbol: "BB",
                uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo",
                addPermanentDelegate: false,
                creators: creators,
                royaltyBasisPoints: 500,
                groupMint: collectionMint.publicKey,
                mint: mint.publicKey,
                computeBudget: 400_000,
                microLamports: 60_000,
                addGameReset: false,
            };
            const mintTx = await burgerProvider.wnsMemberMintTx(mintArgs);

            const id = await sendAndConfirmRawVersionedTransaction(
                burgerProvider.provider.connection,
                [
                    ComputeBudgetProgram.setComputeUnitLimit({
                        units: mintArgs.computeBudget,
                    }),
                    ...mintTx.instructions,
                ],
                wallet.publicKey,
                wallet,
                [PAYER_ADMIN, mint],
                undefined,
                undefined,
                undefined,
                "High",
            );

            expect(id).to.not.be.empty;
            mints.push(mint.publicKey);
        }
        expect(mints.length).to.be.equal(collectionArgs.maxSize);
    });
});
