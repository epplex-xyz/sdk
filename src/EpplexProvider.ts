import * as anchor from "@coral-xyz/anchor";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
    ComputeBudgetProgram,
    ConfirmOptions,
    Connection,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";
import {
    getGameConfig,
    getProgramDelegate,
    getTokenBurgerMetadata,
} from "./constants/burgerSeeds";
import {
    getCollectionConfig,
    getGlobalCollectionConfig,
} from "./constants/coreSeeds";
import { BURGER_PROGRAM_ID, CORE_PROGRAM_ID } from "./constants/ids";
import { PAYER_ADMIN } from "./constants/keys";
import { DEFAULT_COMPUTE_BUDGET } from "./constants/transaction";
import { IDL as BurgerIdl, EpplexBurger } from "./types/epplexBurgerTypes";
import {
    BurnTxParams,
    CreateCollectionMintTxTxParams,
    CreateWhitelistMintTxParams,
    GameConfig,
    GameStartParams, GameUpdateParams,
    TokenGameResetParams,
    TokenGameVoteTxParams,
} from "./types/EpplexProviderTypes";
import { EpplexProviderWallet } from "./types/WalletProvider";
import { getMintOwner, tryCreateATAIx } from "./utils/generic";

// This is more like Burger Program
class EpplexProvider {
    provider: anchor.AnchorProvider;
    program: anchor.Program<EpplexBurger>;

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
        epplexProgramId: PublicKey = BURGER_PROGRAM_ID
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = new anchor.Program(
            BurgerIdl,
            epplexProgramId,
            this.provider
        );
    }

    static fromAnchorProvider(provider: anchor.AnchorProvider): EpplexProvider {
        const epplexProvider = new EpplexProvider(
            provider.wallet,
            provider.connection,
            provider.opts
        );
        return epplexProvider;
    }

    async createCollectionMintTx({
        expiryDate,
        collectionId,
        mint,
        name,
        symbol,
        uri,
        computeBudget = DEFAULT_COMPUTE_BUDGET,
        coreProgramId = CORE_PROGRAM_ID,
    }: CreateCollectionMintTxTxParams) {
        const bigCollectionId = new anchor.BN(collectionId);
        const payer = this.provider.wallet.publicKey;
        const ata = getAssociatedTokenAddressSync(
            mint,
            payer,
            undefined,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const tokenCreateIx = await this.program.methods
            .collectionMint({
                name: name,
                symbol: symbol,
                uri: uri,
                expiryDate: expiryDate,
                /// TODO: get this from somewhere more solid
                collectionCounter: bigCollectionId,
            })
            .accounts({
                mint: mint,
                tokenAccount: ata,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                permanentDelegate: this.getProgramDelegate(),
                payer: payer,
                collectionConfig: getCollectionConfig(
                    bigCollectionId,
                    coreProgramId
                ),
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                epplexCore: coreProgramId,
            })
            .instruction();

        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: computeBudget,
            }),
            tokenCreateIx,
        ];

        return new Transaction().add(...ixs);
    }
    async createWhitelistMintTx({
        expiryDate,
        name,
        symbol,
        uri,
        mint,
        computeBudget = DEFAULT_COMPUTE_BUDGET,
        coreProgramId = CORE_PROGRAM_ID,
    }: CreateWhitelistMintTxParams) {
        const permanentDelegate = this.getProgramDelegate();
        const payer = this.provider.wallet.publicKey;
        const ata = getAssociatedTokenAddressSync(
            mint,
            payer,
            undefined,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const tokenCreateIx = await this.program.methods
            .whitelistMint({
                name: name,
                symbol: symbol,
                uri: uri,
                expiryDate: expiryDate,
            })
            .accounts({
                mint,
                tokenAccount: ata,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                permanentDelegate: permanentDelegate,
                globalCollectionConfig:
                    getGlobalCollectionConfig(coreProgramId),
                payer: payer,

                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                epplexCore: coreProgramId,
            })
            .instruction();

        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: computeBudget,
            }),
            tokenCreateIx,
        ];

        return new Transaction().add(...ixs);
    }

    async renewTokenTx(
        mint: PublicKey,
        fundUpTo: number = 0.1
    ): Promise<{
        tx: Transaction;
        // signers: Keypair[]}
    }> {
        // const ata = getAssociatedTokenAddressSync(
        //     mint, this.wallet.publicKey, undefined, TOKEN_2022_PROGRAM_ID
        // );
        const ixs: TransactionInstruction[] = [];

        // const switchboardMint: NativeMint = await
        // NativeMint.load(this.program.provider as AnchorProvider); const
        // [payerAta, wrapSolTxn] = await
        // switchboardMint.getOrCreateWrappedUserInstructions(
        //     this.provider.wallet.publicKey,
        //     { fundUpTo: fundUpTo }
        // );
        // if (wrapSolTxn === undefined) {
        //     throw new Error("Wrap SOL failed");
        // }
        // ixs.push(...wrapSolTxn.ixns);
        const WSOL_NATIVE_ADDRESS = new PublicKey(
            "So11111111111111111111111111111111111111112"
        );

        // VAULT Ata
        const proceedsAta = getAssociatedTokenAddressSync(
            WSOL_NATIVE_ADDRESS,
            PAYER_ADMIN,
            undefined,
            TOKEN_PROGRAM_ID
        );

        // Payer Ata - already created with switchboard stuff
        const payerAta = getAssociatedTokenAddressSync(
            WSOL_NATIVE_ADDRESS,
            this.provider.wallet.publicKey,
            undefined,
            TOKEN_PROGRAM_ID
        );

        // const payerIx = await tryCreateATAIx(
        //     this.connection, this.wallet.publicKey, payerAta,
        //     this.wallet.publicKey, NativeMint.address
        // );
        const proceedsIx = await tryCreateATAIx(
            this.provider.connection,
            this.provider.wallet.publicKey,
            proceedsAta,
            PAYER_ADMIN,
            WSOL_NATIVE_ADDRESS,
            TOKEN_2022_PROGRAM_ID
        );

        ixs.push(...proceedsIx);

        const renewIx = await this.program.methods
            .tokenRenew({
                renewTerms: 1,
            })
            .accounts({
                mint,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                mintPayment: WSOL_NATIVE_ADDRESS,
                proceedsTokenAccount: proceedsAta,
                payerTokenAccount: payerAta,
                payer: this.provider.wallet.publicKey,
                updateAuthority: this.getProgramDelegate(),
                token22Program: TOKEN_2022_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction();
        ixs.push(renewIx);

        return {
            tx: new Transaction().add(...ixs),
            // signers: wrapSolTxn.signers
        };
    }

    async createProgramDelegateTx() {
        const programDelegate = this.getProgramDelegate();
        const tx = await this.program.methods
            .programDelegateCreate({})
            .accounts({
                programDelegate,
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();

        return tx;
    }

    async burnTokenTx({ mint, owner, useGameConfig = true }: BurnTxParams) {
        const programDelegate = this.getProgramDelegate();
        const mintOwner =
            owner ?? (await getMintOwner(this.provider.connection, mint));
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            mintOwner,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        const tokenBurnTx = await this.program.methods
            .tokenBurn({})
            .accounts({
                mint: mint,
                tokenAccount,
                gameConfig: useGameConfig ? this.getGameConfig() : null,
                permanentDelegate: programDelegate,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                payer: this.provider.wallet.publicKey,
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();

        return tokenBurnTx;
    }

    async tokenGameVoteTx({ mint, message, owner }: TokenGameVoteTxParams) {
        const programDelegate = this.getProgramDelegate();

        // Could just do this.provider.wallet.publicKey
        const mintOwner =
            owner ?? (await getMintOwner(this.provider.connection, mint));
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            mintOwner,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        return await this.program.methods
            .tokenGameVote({
                message: message,
            })
            .accounts({
                mint: mint,
                tokenAccount,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                gameConfig: this.getGameConfig(),
                payer: mintOwner,
                updateAuthority: programDelegate,
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();
    }

    async tokenGameResetTx({ mint }: TokenGameResetParams) {
        const programDelegate = this.getProgramDelegate();

        return await this.program.methods
            .tokenGameReset({})
            .accounts({
                mint,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                payer: this.provider.publicKey,
                gameConfig: this.getGameConfig(),
                updateAuthority: programDelegate,
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();
    }

    getProgramDelegate(): PublicKey {
        return getProgramDelegate(this.program.programId);
    }

    getTokenBurgerMetadata(mint: PublicKey): PublicKey {
        return getTokenBurgerMetadata(mint, this.program.programId);
    }

    getGameConfig(): PublicKey {
        return getGameConfig(this.program.programId);
    }

    async getGameData(): Promise<GameConfig | null> {
        try {
            return await this.program
                .account
                .gameConfig
                .fetch(
                    this.getGameConfig()
                );
        } catch (err) {
            return null
        }
    }

    async gameCreateTx(): Promise<Transaction> {
        return await this.program.methods
            .gameCreate()
            .accounts({
                gameConfig: this.getGameConfig(),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async gameStartTx({
        endTimestamp,
        voteType,
        inputType,
        gamePrompt,
        gameName,
        isEncrypted,
        publicEncryptKey
    }: GameStartParams): Promise<Transaction> {
        return await this.program.methods
            .gameStart({
                endTimestamp: new anchor.BN(endTimestamp),
                voteType,
                inputType,
                gamePrompt,
                gameName,
                isEncrypted,
                publicEncryptKey
            })
            .accounts({
                payer: this.provider.publicKey,
                gameConfig: this.getGameConfig(),
            })
            .transaction();
    }

    async gameEndTx(): Promise<Transaction> {
        return await this.program.methods
            .gameEnd({})
            .accounts({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }

    async gameEvaluateTx(): Promise<Transaction> {
        return await this.program.methods
            .gameEvaluate({})
            .accounts({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }
    async gameUpdateTx({
        newStartTimestamp
    }: GameUpdateParams): Promise<Transaction> {
        return await this.program.methods
            .gameUpdate({
                newStartTimestamp
            })
            .accounts({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }

    async gameCloseTx(): Promise<Transaction> {
        return await this.program.methods
            .gameClose()
            .accounts({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }

}

export default EpplexProvider;
