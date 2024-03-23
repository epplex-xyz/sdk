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
    BurgerProgram, getEpplexBurgerEventParser,
    getEpplexBurgerProgram,
    getGameConfig,
    getProgramDelegate,
    getTokenBurgerMetadata,
} from "./constants/burgerSeeds";
import {
    getCollectionConfig, getEphemeralAuth,
    getGlobalCollectionConfig,
} from "./constants/coreSeeds";
import { BURGER_PROGRAM_ID, CORE_PROGRAM_ID } from "./constants/ids";
import { PAYER_ADMIN } from "./constants/keys";
import { DEFAULT_COMPUTE_BUDGET } from "./constants/transaction";
import {
    BurnTxParams,
    CreateCollectionMintTxTxParams,
    CreateWhitelistMintTxParams,
    GameConfig,
    GameStartParams, GameUpdateParams, TokenGameBurnTxParams,
    TokenGameResetParams,
    TokenGameVoteTxParams, WnsGroupMintParams, WnsMemberMintParams,
} from "./types/EpplexProviderTypes";
import { EpplexProviderWallet } from "./types/WalletProvider";
import {getAtaAddress, getAtaAddressPubkey, getMintOwner, tryCreateATAIx} from "./utils/generic";
import {
    DISTRIBUTION_PROGRAM_ID, getApproveAccountPda,
    getDistributionAccount,
    getExtraMetasAccount,
    getGroupAccount,
    getManagerAccount,
    getMemberAccount,
    WNS_PROGRAM_ID
} from "./constants/wenCore";
import {getReadonlyWallet} from "./utils/wallet";
import {BN} from "@coral-xyz/anchor";
import {
    getEphemeralRule,
    getEphemeralData,
} from "./constants/coreSeeds";
interface Programs {
    burger?: PublicKey;
    core?: PublicKey;
    wns?: PublicKey;
    royalty?: PublicKey;
}

const DEFAULT_PROGRAMS: Programs = {
    burger: BURGER_PROGRAM_ID,
    core: CORE_PROGRAM_ID,
    wns: WNS_PROGRAM_ID,
    royalty: DISTRIBUTION_PROGRAM_ID
}

class EpplexProvider {
    provider: anchor.AnchorProvider;
    program: BurgerProgram;
    eventParser: anchor.EventParser;
    programIds: Programs;
    ephemeralRuleSeed?: number;

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
        programIds: Programs = DEFAULT_PROGRAMS,
        ephemeralRuleSeed?: number
    ) {
        const burgerProgram = programIds.burger ?? DEFAULT_PROGRAMS.burger
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = getEpplexBurgerProgram(this.provider, burgerProgram);
        this.eventParser = getEpplexBurgerEventParser(burgerProgram)
        this.programIds = {
            burger: burgerProgram,
            core: programIds.core ?? DEFAULT_PROGRAMS.core,
            wns: programIds.wns ?? DEFAULT_PROGRAMS.wns,
            royalty: programIds.royalty ?? DEFAULT_PROGRAMS.royalty
        }
        this.ephemeralRuleSeed = ephemeralRuleSeed;
    }

    /*
        * Providers
     */
    static fromAnchorProvider(provider: anchor.AnchorProvider, programs: Programs = DEFAULT_PROGRAMS): EpplexProvider {
        const epplexProvider = new EpplexProvider(
            provider.wallet,
            provider.connection,
            provider.opts,
            programs
        );
        return epplexProvider;
    }

    static getReadOnlyProvider(
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
        programs: Programs = DEFAULT_PROGRAMS,
    ): EpplexProvider {
        return new EpplexProvider(getReadonlyWallet(), connection, opts, programs);
    }

    /*
        * Collection and mints
     */
    async createCollectionMintTx({
        expiryDate,
        collectionId,
        mint,
        name,
        symbol,
        uri,
        computeBudget = DEFAULT_COMPUTE_BUDGET,
    }: CreateCollectionMintTxTxParams) {
        const bigCollectionId = new anchor.BN(collectionId);
        const payer = this.provider.wallet.publicKey;
        const tokenCreateIx = await this.program.methods
            .collectionMint({
                name: name,
                symbol: symbol,
                uri: uri,
                expiryDate: expiryDate,
                collectionCounter: bigCollectionId,
            })
            .accountsStrict({
                mint: mint,
                tokenAccount: getAtaAddress(mint.toString(), payer.toString()),
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                permanentDelegate: this.getProgramDelegate(),
                payer: payer,
                collectionConfig: getCollectionConfig(
                    bigCollectionId,
                    this.programIds.core
                ),
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                epplexCore: this.programIds.core,
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
    }: CreateWhitelistMintTxParams) {
        const payer = this.provider.wallet.publicKey;
        const tokenCreateIx = await this.program.methods
            .whitelistMint({
                name: name,
                symbol: symbol,
                uri: uri,
                expiryDate: expiryDate,
            })
            .accountsStrict({
                mint,
                tokenAccount: getAtaAddress(mint.toString(), payer.toString()),
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                permanentDelegate: this.getProgramDelegate(),
                globalCollectionConfig:
                    getGlobalCollectionConfig(this.programIds.core),
                payer: payer,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                epplexCore: this.programIds.core,
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

    async wnsGroupMintTx(params: WnsGroupMintParams) {
        const paymentMint = params.paymentMint ?? PublicKey.default;
        const payer = this.provider.wallet.publicKey;
        const mintIx = await this.program.methods
            .wnsGroupMint({
                name: params.name,
                symbol: params.symbol,
                uri: params.uri,
                maxSize: params.maxSize,
                paymentMint
            })
            .accountsStrict({
                groupMint: params.groupMint,
                tokenAccount: getAtaAddress(params.groupMint.toString(), payer.toString()),
                permanentDelegate: this.getProgramDelegate(),
                payer: payer,
                group: getGroupAccount(params.groupMint.toString(), this.programIds.wns),
                extraMetasAccount: getExtraMetasAccount(params.groupMint.toString(), this.programIds.wns),
                distributionAccount: getDistributionAccount(params.groupMint.toString(), paymentMint.toString(), this.programIds.royalty),
                manager: getManagerAccount(this.programIds.wns),
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                wns: this.programIds.wns,
                royaltyProgram: this.programIds.royalty
            })
            .instruction();

        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: params.computeBudget ?? DEFAULT_COMPUTE_BUDGET, //
            }),
            mintIx,
        ];

        return new Transaction().add(...ixs);
    }

    /*
     * 1. Create a mint
     * 2. Add mint to grou
     * 3. Add royalties
     * 4. Add other metadata
     */
    async wnsMemberMintTx(params: WnsMemberMintParams) {
        const payer = this.provider.wallet.publicKey;
        const mintIx = await this.program.methods
            .wnsMemberMint({
                name: params.name,
                symbol: params.symbol,
                uri: params.uri,
                expiryDate: params.expiryDate,
            })
            .accountsStrict({
                mint: params.mint,
                tokenAccount: getAtaAddress(params.mint.toString(), payer.toString()),
                tokenMetadata: this.getTokenBurgerMetadata(params.mint),
                permanentDelegate: this.getProgramDelegate(),
                payer: payer,
                group: getGroupAccount(params.groupMint.toString(), this.programIds.wns),
                member: getMemberAccount(params.mint.toString(), this.programIds.wns),
                extraMetasAccount: getExtraMetasAccount(params.mint.toString(), this.programIds.wns),
                manager: getManagerAccount(this.programIds.wns),
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                wns: this.programIds.wns
            })
            .instruction();

        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: params.computeBudget ?? DEFAULT_COMPUTE_BUDGET, //
            }),
            mintIx,
        ];

        if (params.addGameReset) {
            const tx = await this.tokenGameResetTx({mint: params.mint})
            ixs.push(...tx.instructions)
        }

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
            .accountsStrict({
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

    /*
        * States
     */
    async createProgramDelegateTx() {
        return await this.program.methods
            .programDelegateCreate({})
            .accountsStrict({
                programDelegate: this.getProgramDelegate(),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async tokenBurnTx({ mint, owner, useGameConfig = true }: BurnTxParams) {
        const mintOwner =
            owner ?? (await getMintOwner(this.provider.connection, mint));
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            mintOwner,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        return await this.program.methods
            .tokenBurn({})
            .accountsStrict({
                mint: mint,
                tokenAccount,
                gameConfig: useGameConfig ? this.getGameConfig() : null,
                permanentDelegate: this.getProgramDelegate(),
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                payer: this.provider.wallet.publicKey,
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();
    }

    setEphemeralRuleSeed(seed: number) {
        this.ephemeralRuleSeed = seed;
    }

    async tokenGameBurnTx(args: TokenGameBurnTxParams) {
        const seed: number | undefined = args.seed ?? this.ephemeralRuleSeed;
        if (seed === undefined) {
            throw new Error("No ephemeral seed");
        }

        const mintOwner =
            args.owner ?? (await getMintOwner(this.provider.connection, args.mint));
        const tokenAccount = getAtaAddressPubkey(args.mint, mintOwner);

        const epplexAuthority = this.getEphemeralAuth()
        const destinationTokenAccount = getAtaAddressPubkey(args.mint, epplexAuthority);

        const paymentMint = PublicKey.default;
        const distribution = getDistributionAccount(args.groupMint, paymentMint, this.programIds.royalty);
        return await this.program.methods
            .tokenGameBurn({})
            .accountsStrict({
                mint: args.mint,
                sourceTokenAccount: tokenAccount,
                tokenAccount: destinationTokenAccount,
                gameConfig: this.getGameConfig(),
                permanentDelegate: this.getProgramDelegate(),
                groupMember: this.getMemberAccountPda(args.mint),
                payer: this.provider.wallet.publicKey,
                token22Program: TOKEN_2022_PROGRAM_ID,
                epplexTreasury: PAYER_ADMIN,
                data: this.getEphemeralData(args.mint),
                rule: this.getEphemeralRule(seed),

                epplexAuthority,
                epplexCore: this.programIds.core,
                manager: getManagerAccount(this.programIds.wns),
                wrd: this.programIds.royalty,
                wns: this.programIds.wns,
                distributionTokenAccount: getAtaAddressPubkey(paymentMint, distribution),
                distributionAccount: distribution,
                paymentMint,
                metasAccountList: getExtraMetasAccount(args.mint, this.programIds.wns),
                approveAccount: getApproveAccountPda(args.mint, this.programIds.wns),
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .preInstructions([
                ComputeBudgetProgram.setComputeUnitLimit({
                    units:  300_000, //
                }),
            ])
            .transaction();
    }

    async tokenGameVoteTx(args: TokenGameVoteTxParams) {
        // Could just do this.provider.wallet.publicKey
        const mintOwner =
            args.owner ?? (await getMintOwner(this.provider.connection, args.mint));
        const tokenAccount = getAtaAddressPubkey(args.mint, mintOwner);

        return await this.program.methods
            .tokenGameVote({
                message: args.message,
            })
            .accountsStrict({
                mint: args.mint,
                tokenAccount,
                groupMember: this.getMemberAccountPda(args.mint),
                gameConfig: this.getGameConfig(),
                payer: mintOwner,
                updateAuthority: this.getProgramDelegate(),
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();
    }

    async tokenGameResetTx({ mint }: TokenGameResetParams) {
        return await this.program.methods
            .tokenGameReset({})
            .accountsStrict({
                mint,
                groupMember: this.getMemberAccountPda(mint),
                payer: this.provider.publicKey,
                gameConfig: this.getGameConfig(),
                updateAuthority: this.getProgramDelegate(),
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


    /*
        * Game stuff
     */
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
            .accountsStrict({
                gameConfig: this.getGameConfig(),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async gameStartTx(params: GameStartParams): Promise<Transaction> {
        return await this.program.methods
            .gameStart({
                ...params,
                // Default to just pass in collectionMint pubkey
                tokenGroup: this.getGroupAccountPda(params.tokenGroup),
                endTimestamp: new anchor.BN(params.endTimestamp),
                ruleSeed: new anchor.BN(params.ruleSeed),
            })
            .accountsStrict({
                payer: this.provider.publicKey,
                gameConfig: this.getGameConfig(),
            })
            .transaction();
    }

    async gameEndTx(): Promise<Transaction> {
        return await this.program.methods
            .gameEnd({})
            .accountsStrict({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }

    async gameEvaluateTx(): Promise<Transaction> {
        return await this.program.methods
            .gameEvaluate({})
            .accountsStrict({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }
    async gameUpdateTx(params: GameUpdateParams): Promise<Transaction> {
        return await this.program.methods
            .gameUpdate({
                phaseStartTimestamp: params.phaseStartTimestamp ? new anchor.BN(params.phaseStartTimestamp) : null,
                phaseEndTimestamp: params.phaseEndTimestamp ? new anchor.BN(params.phaseEndTimestamp) : null,
                voteType: params.voteType ?? null,
                tokenGroup: params.tokenGroup ?? null
            })
            .accountsStrict({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }

    async gameCloseTx(): Promise<Transaction> {
        return await this.program.methods
            .gameClose()
            .accountsStrict({
                gameConfig: this.getGameConfig(),
                payer: this.provider.publicKey,
            })
            .transaction();
    }

    /*
        * WNS
     */
    getGroupAccountPda(groupMint: PublicKey): PublicKey {
        return getGroupAccount(groupMint, this.programIds.wns)
    }

    getMemberAccountPda(groupMint: PublicKey): PublicKey {
        return getMemberAccount(groupMint, this.programIds.wns)
    }

    /*
        * Ephemeral Core
     */
    getEphemeralAuth(): PublicKey {
        return getEphemeralAuth(this.programIds.core)
    }

    getEphemeralRule(seed: number): PublicKey {
        return getEphemeralRule(new BN(seed), this.programIds.core);
    }

    getEphemeralData(membership: PublicKey): PublicKey {
        return getEphemeralData(membership, this.programIds.core);
    }
}

export default EpplexProvider;
