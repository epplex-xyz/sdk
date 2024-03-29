import {
    CoreProvider,
    EpplexProvider, getWnsNftTransferIxs,
    sendAndConfirmRawTransaction, sendAndConfirmRawVersionedTransaction
} from "../src";
import WenProvider from "../src/WenProvider";
import {expect} from "chai";
import {Keypair, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {WnsGroupMintParams} from "../src/types/EpplexProviderTypes";
import {EpMintParams} from "../src/types/EpplexProviderTypes";
import {PAYER_ADMIN} from "../src/constants/keys";
// @ts-ignore
import fs from "fs";

export function trySetupGlobalCollectionConfig(
    provider: CoreProvider,
    wallet,
) {
    it('Try create global collection config', async () => {
        try {
            const globalCollectionData = await provider
                .program
                .account
                .globalCollectionConfig
                .fetch(provider.getGlobalCollectionConfig());
            // console.log("Global collection config data", globalCollectionData)
        } catch (e) {
            const tx = await provider.createGlobalCollectionConfigTx();
            const id = await sendAndConfirmRawTransaction(provider.provider.connection, tx, wallet.publicKey, wallet, []);
            expect(id).to.be.not.empty;
        }
    });
}

export function trySetupBurgerProgramDelegate(
    provider: EpplexProvider,
    wallet,
) {
    it("Try create burger delegate ", async() => {
        try {
            const burgerDelegateData = await provider
                .program
                .account
                .programDelegate
                .fetch(provider.getProgramDelegate());
            // console.log("Program Delegate Data", burgerDelegateData)
        } catch (e) {
            const tx = await provider.createProgramDelegateTx();
            const id = await sendAndConfirmRawTransaction(provider.provider.connection, tx, wallet.publicKey, wallet, []);
            expect(id).to.be.not.empty;
        }
    })
}


export function trySetupGameConfig(
    provider: EpplexProvider,
    wallet,
) {
    it("Try create game config ", async() => {
        try {
            const gameConfig = await provider
                .program
                .account
                .gameConfig
                .fetch(provider.getGameConfig());
        } catch (e) {
            const tx = await provider.gameCreateTx();
            const id = await sendAndConfirmRawTransaction(provider.provider.connection, tx, wallet.publicKey, wallet, []);
            expect(id).to.be.not.empty;
        }
    })
}

export function trySetupManagerAccount(
    provider: WenProvider,
    wallet,
) {
    it("Try init manager account ", async() => {
        const acc = await provider.getManagerAccount();
        // Manager account already exists
        if (acc !== undefined) {
            return;
        }

        const tx = await provider.initManagerAccountTx();
        const id = await sendAndConfirmRawTransaction(provider.provider.connection, tx, wallet.publicKey, wallet, []);
        expect(id).to.be.not.empty;
    })
}

export function setupCollection(
    burger: EpplexProvider,
    core: CoreProvider,
    collectionMint: Keypair,
    collectionArgs: WnsGroupMintParams,
    epMintArgs: EpMintParams,
    wallet,
    receiver?: PublicKey,
    seed?: number,
    time?: number,
) {
    const mints: PublicKey[] = [];
    const baseSeed = seed ?? Math.floor(Math.random() * 100000);

    it("Creates a new rule if not created already", async () => {
        const res = await core.getRuleData(baseSeed)
        if (res !== undefined) {
            console.log("Rule already created")
            return
        }

        const tx = await burger.ephemeralRuleCreateTx({
            seed: baseSeed,
            renewalPrice: 1000_000_000_000, // 1000 SOL
            treasury: PAYER_ADMIN
        })
        const id = await sendAndConfirmRawTransaction(burger.provider.connection, tx, wallet.publicKey, wallet, [])
        expect(id).to.not.be.empty;
    });

    it("Create a collection", async () => {
        const tx = await burger.wnsGroupMintTx(collectionArgs)
        const id = await sendAndConfirmRawVersionedTransaction(burger.provider.connection, tx.instructions, wallet.publicKey, wallet, [collectionMint]);
        expect(id).to.not.be.empty;
    });

    it("Max mint nfts into collection", async () => {
        for(let i = 0; i < collectionArgs.maxSize; i++){
            const mint = Keypair.generate();
            console.log(`mint ${i + 1}`, mint.publicKey.toString());

            const mintArgs = {
                ...epMintArgs,
                groupMint: collectionMint.publicKey,
                mint: mint.publicKey,
                computeBudget: 600_000,
                addGameReset: true,
            }

            // Mint
            const mintTx = await burger.wnsMemberMintTx(mintArgs);

            // Membership
            const membershipTx = await burger.ephemeralDataAddTx({
                membership: mint.publicKey,
                time: time ?? Math.floor(Number.MAX_SAFE_INTEGER / 1000),
                seed: baseSeed,
                payer: wallet.publicKey,
            });

            // Transfer
            let transferIxs: TransactionInstruction[] = []
            if (receiver !== undefined) {
                transferIxs = getWnsNftTransferIxs({
                    mint: mint.publicKey,
                    sender: wallet.publicKey,
                    payer: wallet.publicKey,
                    receiver
                })
            }

            const id = await sendAndConfirmRawVersionedTransaction(
                burger.provider.connection, [
                    ...mintTx.instructions,
                    ...membershipTx.instructions,
                    ...transferIxs
                ], wallet.publicKey, wallet, [mint]
            );
            expect(id).to.not.be.empty;
            mints.push(mint.publicKey)
        }

        // Create collection config file
        const collectionJSON = {
            key: collectionMint.publicKey.toString(),
            mints: mints.map((m) => m.toString()),
            seed: baseSeed,
        };
        fs.mkdirSync("tests/.output", { recursive: true });
        fs.writeFileSync(
            "tests/.output/collection_config.json",
            JSON.stringify(collectionJSON, null, 2)
        );

        expect(mints.length).to.be.equal(collectionArgs.maxSize);
    });

    return mints
}