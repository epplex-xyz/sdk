import {
    CoreProvider,
    EpplexProvider, getWnsNftTransferIxs,
    sendAndConfirmRawTransaction, sendAndConfirmRawVersionedTransaction
} from "../src";
import WenProvider from "../src/WenProvider";
import {expect} from "chai";
import {Keypair, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {WnsGroupMintParams} from "../lib/types/EpplexProviderTypes";
import {EpMintParams} from "../src/types/EpplexProviderTypes";

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
    provider: EpplexProvider,
    collectionMint: Keypair,
    collectionArgs: WnsGroupMintParams,
    epMintArgs: EpMintParams,
    wallet,
    receiver?: PublicKey
) {
    it("Create a collection", async () => {
        const tx = await provider.wnsGroupMintTx(collectionArgs)
        await sendAndConfirmRawVersionedTransaction(provider.provider.connection, tx.instructions, wallet.publicKey, wallet, [collectionMint]);
    });

    it("Max mint nfts into collection", async () => {
        for(let i = 0; i < collectionArgs.maxSize; i++){
            const mint = Keypair.generate();
            const mintArgs = {
                ...epMintArgs,
                groupMint: collectionMint.publicKey,
                mint: mint.publicKey,
                computeBudget: 500_000
            }
            console.log(`mint ${i + 1}`, mint.publicKey.toString());
            // Mint
            const tx = await provider.wnsMemberMintTx(mintArgs);

            // Transfer
            let transferIxs: TransactionInstruction[] = []
            if (receiver === undefined) {
                transferIxs = getWnsNftTransferIxs({
                    mint: mint.publicKey,
                    sender: wallet.publicKey,
                    payer: wallet.publicKey,
                    receiver
                })
            }

            await sendAndConfirmRawVersionedTransaction(
                provider.provider.connection, [
                    ...tx.instructions,
                    ...transferIxs
                ], wallet.publicKey, wallet, [mint]
            );
        }
    });

}

