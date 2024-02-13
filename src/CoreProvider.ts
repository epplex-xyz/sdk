import * as anchor from "@coral-xyz/anchor";
import {BN} from "@coral-xyz/anchor";
import {
    ComputeBudgetProgram,
    ConfirmOptions,
    Connection,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
} from "@solana/web3.js";
import {EpplexCore, IDL as CoreIdl} from "./types/epplexCoreTypes";
import {CORE_PROGRAM_ID} from "./constants/ids";
import {EpplexProviderWallet} from "./types/WalletProvider";
import {getGlobalCollectionConfig} from "./constants/coreSeeds";
import {DEFAULT_COMPUTE_BUDGET} from "./constants/transaction";
import {CreateCollectionTxParams} from "./types/CoreProviderTypes";
import {ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";

class CoreProvider {
    provider: anchor.AnchorProvider;
    program: anchor.Program < EpplexCore >

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = new anchor.Program(CoreIdl, CORE_PROGRAM_ID, this.provider);
    }

    static fromAnchorProvider(provider: anchor.AnchorProvider) : CoreProvider {
        const epplexProvider = new CoreProvider(provider.wallet, provider.connection, provider.opts);
        return epplexProvider;
    }

    async createGlobalCollectionConfigTx(): Promise<Transaction> {
        return await this.program.methods
            .globalCollectionConfigCreate()
            .accounts({
                globalCollectionConfig: getGlobalCollectionConfig(),
                payer: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
    }

    /*
        Both collection config and collection mint are created at the same time
     */
    async createCollectionTx({
        collectionConfigAddress,
        mint,
        collectionMintName,
        collectionMintSymbol,
        collectionMintUri,
        collectionName,
        collectionSymbol,
        collectionSize,
        authority,
        computeBudget = DEFAULT_COMPUTE_BUDGET
    }: CreateCollectionTxParams): Promise<Transaction> {
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            this.provider.wallet.publicKey,
            undefined,
            TOKEN_2022_PROGRAM_ID
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
                collectionName,
                collectionSymbol,
                collectionSize,
                authority,
            })
            .accounts({
                mint,
                collectionConfig: collectionConfigAddress,
                globalCollectionConfig: getGlobalCollectionConfig(),
                payer: this.provider.wallet.publicKey,
                tokenAccount,
                updateAuthority: this.program.provider.publicKey,
                rent: SYSVAR_RENT_PUBKEY,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            }).instruction();

        const ixs= [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: computeBudget
            }),
            collectionCreateIx
        ];

        return new Transaction().add(...ixs);
    }

}

export default CoreProvider;