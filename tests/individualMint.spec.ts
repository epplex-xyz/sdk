import {PublicKey} from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import {getTokenMetadata} from "@solana/spl-token";
import {getSetup} from "./setup";

const {wallet, burgerProvider} = getSetup();

describe('Environment setup', () => {
    const destroyTimestamp: string = (Math.floor((new Date()).getTime() / 1000) + 3600).toString()
    console.log("destroy", destroyTimestamp);
    let mint: PublicKey;
    let globalCollectionConfigAddress: PublicKey;

    before(async () => {
        console.log("Creating program delegate");
        await burgerProgram.createProgramDelegate();
        console.log("Creating global collection config");
        await coreProgram.createGlobalCollectionConfig();
        globalCollectionConfigAddress = coreProgram.getGlobalCollectionConfigAddress();
        console.log("globalCollectionAddress", globalCollectionConfigAddress.toString());
        const globalCollectionData = await coreProgram.program.account.globalCollectionConfig.fetch(
            globalCollectionConfigAddress);
        mint = PublicKey.findProgramAddressSync(
            [Buffer.from("MINT"),
                globalCollectionData.collectionCounter.toArrayLike(Buffer, "le", 8),
                new BN(0).toArrayLike(Buffer, "le", 8)],
            coreProgram.program.programId)[0];
        console.log("mint", mint.toString());
    });

    it('Mint token', async () => {
        const tx = await burgerProgram.createWhitelistMintTx(
            destroyTimestamp,
            mint,
            globalCollectionConfigAddress
        )

        await sendAndConfirmRawTransaction(
            provider.connection,
            tx,
            provider.publicKey,
            provider.wallet,
            []
        );

        const metadata = await getTokenMetadata(provider.connection, mint);
        console.log("Individual Mint Metadata", metadata);
    });

    it('Transfer token', async () => {
        const tx = await buildNFTTransferTx({
            connection: provider.connection,
            mint: mint,
            source: provider.wallet.publicKey,
            destination: destination,
            payer: payer.publicKey,
        })

        await sendAndConfirmRawTransaction(
                provider.connection,
                tx,
                payer.publicKey,
                undefined,
                [payer]
            );
    });

    it('Renew token', async () => {
        await burgerProgram.renewToken(mint);
    });

    // TODO uncomment if you want to burn your tokens
    // it('Burn tokens', async () => {
    //      const burgerDelegate = burgerProgram.getProgramDelegate();
    //     const allTokens = await getToken22(
    //         provider.connection,
    //         provider.publicKey
    //     )
    //
    //     console.log("Total tokens", allTokens.length);
    //     // Close one by one
    //     for (const mint of allTokens) {
    //         console.log("Closing mint", mint.toString());
    //         const ixs = await createTokenCloseAndBurnIx(
    //             provider.connection,
    //             secretKeypair,
    //             mint,
    //         )
    //
    //         await sendAndConfirmRawTransaction(
    //             provider.connection,
    //             new Transaction().add(...ixs),
    //             secretKeypair.publicKey,
    //             undefined,
    //             [secretKeypair]
    //         )
    //     }
    // });
});
