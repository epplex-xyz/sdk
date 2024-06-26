import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import {
    ComputeBudgetProgram,
    ConfirmOptions,
    Connection,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
} from "@solana/web3.js";
import { CORE_PROGRAM_ID } from "./constants/ids";
import { EpplexProviderWallet } from "./types/WalletProvider";
import {
    CoreProgram,
    getCollectionConfig,
    getCollectionMint,
    getEphemeralAuth,
    getEphemeralData,
    getEphemeralRule,
    getEpplexCoreProgram,
    getGlobalCollectionConfig,
    getMint,
} from "./constants/coreSeeds";
import { DEFAULT_COMPUTE_BUDGET } from "./constants/transaction";
import {
    CreateCollectionTxParams,
    EphemeralData,
    EphemeralRule,
    GlobalCollectionConfig,
    MemberShipAppendTxParams,
    RuleTxParams,
    TimeTxParams,
} from "./types/CoreProviderTypes";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { PAYER_ADMIN } from "./constants/keys";
import { getAtaAddressPubkey, getMintOwner } from "./utils/generic";
import { getReadonlyWallet } from "./utils/wallet";

class CoreProvider {
    provider: anchor.AnchorProvider;
    program: CoreProgram;
    treasury: PublicKey;

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
        coreProgramId: PublicKey = CORE_PROGRAM_ID,
        epplexTreasury?: PublicKey,
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = getEpplexCoreProgram(this.provider, coreProgramId);
        this.treasury = epplexTreasury ?? PAYER_ADMIN;
    }

    static fromAnchorProvider(provider: anchor.AnchorProvider): CoreProvider {
        const epplexProvider = new CoreProvider(
            provider.wallet,
            provider.connection,
            provider.opts,
        );
        return epplexProvider;
    }

    static getReadOnlyProvider(
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
        coreProgramId: PublicKey = CORE_PROGRAM_ID,
    ): CoreProvider {
        return new CoreProvider(
            getReadonlyWallet(),
            connection,
            opts,
            coreProgramId,
        );
    }

    /**
     * Create TX for Global Collection PDA
     */
    async createGlobalCollectionConfigTx(): Promise<Transaction> {
        return await this.program.methods
            .globalCollectionConfigCreate()
            .accountsStrict({
                globalCollectionConfig: this.getGlobalCollectionConfig(),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    /**
     * Close Global Collection Config
     */
    async closeGlobalCollectionConfigTx(): Promise<Transaction> {
        return await this.program.methods
            .globalCollectionConfigClose()
            .accountsStrict({
                globalCollectionConfig: this.getGlobalCollectionConfig(),
                payer: this.provider.wallet.publicKey,
            })
            .transaction();
    }

    /**
     * Close Collection Config
     */
    async closeCollectionConfigTx(collectionId: number): Promise<Transaction> {
        return await this.program.methods
            .collectionClose({ collectionId: new BN(collectionId) })
            .accountsStrict({
                collectionConfig: this.getCollectionConfig(
                    new BN(collectionId),
                ),
                payer: this.provider.wallet.publicKey,
            })
            .transaction();
    }

    /**
     * Create Collection Config Tx
     *
     * Both collection config and collection mint are created at the same time
     */
    async createCollectionTx({
        collectionConfigAddress,
        mint,
        collectionMintName,
        collectionMintSymbol,
        collectionMintUri,
        collectionSize,
        authority,
        computeBudget = DEFAULT_COMPUTE_BUDGET,
    }: CreateCollectionTxParams): Promise<Transaction> {
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            this.provider.wallet.publicKey,
            undefined,
            TOKEN_2022_PROGRAM_ID,
        );

        const collectionCreateIx = await this.program.methods
            .collectionCreate({
                name: collectionMintName,
                symbol: collectionMintSymbol,
                uri: collectionMintUri,
                renewalPrice: new BN(1000000000),
                mintPrice: new BN(1000000000),
                standardDuration: 10000,
                gracePeriod: new BN(10000),
                treasury: this.provider.wallet.publicKey,
                collectionSize,
                authority,
            })
            .accountsStrict({
                mint,
                collectionConfig: collectionConfigAddress,
                globalCollectionConfig: this.getGlobalCollectionConfig(),
                payer: this.provider.wallet.publicKey,
                tokenAccount,
                updateAuthority: this.program.provider.publicKey,
                rent: SYSVAR_RENT_PUBKEY,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: computeBudget,
            }),
            collectionCreateIx,
        ];

        return new Transaction().add(...ixs);
    }

    async getGlobalCollectionConfigData(): Promise<GlobalCollectionConfig | null> {
        try {
            return await this.program.account.globalCollectionConfig.fetch(
                this.getGlobalCollectionConfig(),
            );
        } catch (err) {
            return null;
        }
    }

    getGlobalCollectionConfig(): PublicKey {
        return getGlobalCollectionConfig(this.program.programId);
    }

    getCollectionConfig(collectionCounter: BN): PublicKey {
        return getCollectionConfig(collectionCounter, this.program.programId);
    }

    getCollectionMint(collectionCounter: BN): PublicKey {
        return getCollectionMint(collectionCounter, this.program.programId);
    }

    getMint(collectionCounter: BN, mintCount: BN): PublicKey {
        return getMint(collectionCounter, mintCount, this.program.programId);
    }

    /*
     * Ephemeral Membership
     */
    async memberShipBurnTx(
        membership: PublicKey,
        seed: number,
        owner?: PublicKey,
    ): Promise<Transaction> {
        const membershipOwner =
            owner ?? (await getMintOwner(this.provider.connection, membership));
        const membershipAta = getAssociatedTokenAddressSync(
            membership,
            membershipOwner,
            undefined,
            TOKEN_2022_PROGRAM_ID,
        );

        return await this.program.methods
            .membershipBurn()
            .accountsStrict({
                burner: this.provider.wallet.publicKey,
                epplexTreasury: this.treasury,
                membership,
                membershipAta,
                rule: this.getEphemeralRule(seed),
                data: this.getEphemeralData(membership),
                epplexAuthority: this.getEphemeralAuth(),
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();
    }

    /**
     * Create Membership NFT
     *
     * @param time: Added onto the current time
     * @param name
     * @param symbol
     * @param uri
     */
    async membershipCreateTx(
        time: number,
        name: string,
        symbol: string,
        uri: string,
        membership: PublicKey,
        ruleCreator: PublicKey,
        seed: number,
        payer?: PublicKey,
    ): Promise<Transaction> {
        const membershipAta = getAtaAddressPubkey(
            membership,
            this.provider.wallet.publicKey,
        );

        return await this.program.methods
            .membershipCreate(new BN(time), name, symbol, uri)
            .accountsStrict({
                ruleCreator,
                payer: payer ?? this.provider.wallet.publicKey,
                membership,
                membershipAta,
                rule: this.getEphemeralRule(seed),
                data: this.getEphemeralData(membership),
                epplexAuthority: this.getEphemeralAuth(),
                rent: SYSVAR_RENT_PUBKEY,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async membershipAppendTx(
        args: MemberShipAppendTxParams,
    ): Promise<Transaction> {
        return await this.program.methods
            .membershipAppend(new BN(args.time))
            .accountsStrict({
                membership: args.membership,
                ruleCreator: args.ruleCreator,
                rule: this.getEphemeralRule(args.seed),
                data: this.getEphemeralData(args.membership),
                payer: args.payer ?? this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async ruleCreateTx(args: RuleTxParams): Promise<Transaction> {
        return await this.program.methods
            .ruleCreate({
                seed: new BN(args.seed),
                ruleCreator: args.ruleCreator,
                renewalPrice: new BN(args.renewalPrice),
                treasury: args.treasury,
            })
            .accountsStrict({
                rule: this.getEphemeralRule(args.seed),
                signer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async ruleModifyTx(args: RuleTxParams): Promise<Transaction> {
        return await this.program.methods
            .ruleModify({
                seed: new BN(args.seed),
                ruleCreator: args.ruleCreator,
                renewalPrice: new BN(args.renewalPrice),
                treasury: args.treasury,
            })
            .accountsStrict({
                rule: this.getEphemeralRule(args.seed),
                signer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async timeRemoveTx({
        time,
        seed,
        membership,
        treasury,
    }: TimeTxParams): Promise<Transaction> {
        return await this.program.methods
            .timeRemove(new BN(time))
            .accountsStrict({
                treasury,
                membership: membership,
                rule: this.getEphemeralRule(seed),
                data: this.getEphemeralData(membership),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    async timeAddTx({
        time,
        seed,
        membership,
        treasury,
    }: TimeTxParams): Promise<Transaction> {
        return await this.program.methods
            .timeAdd(new BN(time))
            .accountsStrict({
                treasury,
                membership: membership,
                rule: this.getEphemeralRule(seed),
                data: this.getEphemeralData(membership),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    getEphemeralData(membership: PublicKey): PublicKey {
        return getEphemeralData(membership, this.program.programId);
    }

    getEphemeralAuth(): PublicKey {
        return getEphemeralAuth(this.program.programId);
    }

    getEphemeralRule(seed: number): PublicKey {
        return getEphemeralRule(new BN(seed), this.program.programId);
    }

    async getRuleData(seed: number): Promise<EphemeralRule | undefined> {
        return await this.program.account.ephemeralRule
            .fetch(this.getEphemeralRule(seed))
            .then((account) => account)
            .catch(() => undefined);
    }

    async getEphemeralDataAccount(
        membership: PublicKey,
    ): Promise<EphemeralData | undefined> {
        return await this.program.account.ephemeralData
            .fetch(this.getEphemeralData(membership))
            .then((account) => account)
            .catch(() => undefined);
    }
}

export default CoreProvider;
