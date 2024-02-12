import * as anchor from "@coral-xyz/anchor";
import {
    ComputeBudgetProgram,
    ConfirmOptions,
    Connection,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionInstruction,
    VersionedTransaction,
} from "@solana/web3.js";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {EpplexBurger, IDL as BurgerIdl} from "./types/epplexBurgerTypes";
import {BURGER_PROGRAM_ID, CORE_PROGRAM_ID} from "./constants/ids";
import {getMintOwner, tryCreateATAIx} from "./utils/generic";
import {getProgramDelegate, getTokenBurgerMetadata} from "./constants/seeds";
import {VAULT} from "./constants/keys";
import {
    BurnTxParams,
    CreateCollectionMintTxTxParams,
    CreateWhitelistMintTxParams,
    TokenGameVoteTxParams
} from "./types/EpplexProviderTypes";
import {EpplexProviderWallet} from "./types/WalletProvider";


const DEFAULT_COMPUTE_BUDGET = 450_000;

// This is more like Burger Program
class EpplexProvider {
    provider: anchor.AnchorProvider;
    program: anchor.Program < EpplexBurger >

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = new anchor.Program(BurgerIdl, BURGER_PROGRAM_ID, this.provider);
    }

    static fromAnchorProvider(provider: anchor.AnchorProvider) : EpplexProvider {
        const epplexProvider = new EpplexProvider(provider.wallet, provider.connection, provider.opts);
        return epplexProvider;
    }


    async createCollectionMintTx({
         expiryDate,
         collectionId,
         mint,
         name,
         symbol,
         uri,
         computeBudget = DEFAULT_COMPUTE_BUDGET
     }: CreateCollectionMintTxTxParams) {

        const bigCollecitonId = new anchor.BN(collectionId);
        const permanentDelegate = getProgramDelegate();
        const payer = this.wallet.publicKey;
        const ata = getAssociatedTokenAddressSync(
            mint,
            payer,
            undefined,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const [collectionConfig,_] = PublicKey.findProgramAddressSync(
            [Buffer.from("CONFIG"), bigCollecitonId.toArrayLike(Buffer, "le", 8)],
            CORE_PROGRAM_ID
        )

        const tokenCreateIx = await this.program.methods
            .collectionMint({
                name: name,
                symbol: symbol,
                uri: uri,
                expiryDate: expiryDate,
                /// TODO: get this from somewhere more solid
                collectionCounter: bigCollecitonId,
            })
            .accounts({
                mint: mint,
                tokenAccount: ata,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                permanentDelegate,
                payer: payer,
                collectionConfig,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                token22Program: TOKEN_2022_PROGRAM_ID,
                associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
                epplexCore: CORE_PROGRAM_ID,
            })
            .instruction();

        const ixs = [
            // prolly could tweak this further down
            ComputeBudgetProgram.setComputeUnitLimit({ units: 450_000 }),
            tokenCreateIx
        ];

        return  new Transaction().add(...ixs);
    }
    async createWhitelistMintTx({
        expiryDate,
        mint,
        name,
        symbol,
        uri,
        computeBudget = DEFAULT_COMPUTE_BUDGET
    }: CreateWhitelistMintTxParams) {
        const permanentDelegate = getProgramDelegate();
        const payer = this.provider.wallet.publicKey;
        const ata = getAssociatedTokenAddressSync(mint.publicKey, payer, undefined, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);

        const tokenCreateIx = await this.program.methods.whitelistMint({
            name: name,
            symbol: symbol,
            uri: uri,
            expiryDate: expiryDate,
        }).accounts({
            mint: mint.publicKey,
            tokenAccount: ata,
            tokenMetadata: getTokenBurgerMetadata(mint.publicKey),
            permanentDelegate: permanentDelegate,
            payer: payer,

            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            token22Program: TOKEN_2022_PROGRAM_ID,
            associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
            epplexCore: CORE_PROGRAM_ID,
        }).instruction();

        const ixs = [
            ComputeBudgetProgram.setComputeUnitLimit({
                units: computeBudget
            }),
            tokenCreateIx
        ];

        return new Transaction().add(...ixs);
    }

    async renewTokenTx(mint: PublicKey, fundUpTo: number = 0.1, ) : Promise < {
        tx: Transaction
        // signers: Keypair[]}
    } > {
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
        const WSOL_NATIVE_ADDRESS = new PublicKey('So11111111111111111111111111111111111111112');

        // VAULT Ata
        const proceedsAta = getAssociatedTokenAddressSync(WSOL_NATIVE_ADDRESS, VAULT, undefined, TOKEN_PROGRAM_ID);

        // Payer Ata - already created with switchboard stuff
        const payerAta = getAssociatedTokenAddressSync(WSOL_NATIVE_ADDRESS, this.provider.wallet.publicKey, undefined, TOKEN_PROGRAM_ID);

        // const payerIx = await tryCreateATAIx(
        //     this.connection, this.wallet.publicKey, payerAta,
        //     this.wallet.publicKey, NativeMint.address
        // );
        const proceedsIx = await tryCreateATAIx(this.provider.connection, this.provider.wallet.publicKey, proceedsAta, VAULT, WSOL_NATIVE_ADDRESS, TOKEN_2022_PROGRAM_ID);

        ixs.push(...proceedsIx);

        const renewIx = await this.program.methods.tokenRenew({
            renewTerms: 1
        }).accounts({
            mint,
            tokenMetadata: getTokenBurgerMetadata(mint),
            mintPayment: WSOL_NATIVE_ADDRESS,
            proceedsTokenAccount: proceedsAta,
            payerTokenAccount: payerAta,
            payer: this.provider.wallet.publicKey,
            updateAuthority: getProgramDelegate(),
            token22Program: TOKEN_2022_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID
        }).instruction();
        ixs.push(renewIx);

        return {
            tx: new Transaction().add(...ixs),
            // signers: wrapSolTxn.signers
        };
    }

    async createProgramDelegateTx() {
        const programDelegate = getProgramDelegate();
        const tx = await this.program.methods.programDelegateCreate({}).accounts({
            programDelegate,
            payer: this.provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        }).transaction();

        return tx;
    }

    async burnTokenTx({
        mint,
        owner
    }: BurnTxParams) {
        const programDelegate = getProgramDelegate();
        const mintOwner = owner ?? await getMintOwner(this.provider.connection, mint);
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            mintOwner,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        const tokenBurnTx = await this.program.methods.tokenBurn({}).accounts({
            mint: mint,
            tokenAccount,
            permanentDelegate: programDelegate,
            tokenMetadata: getTokenBurgerMetadata(mint),
            payer: this.provider.wallet.publicKey,
            token22Program: TOKEN_2022_PROGRAM_ID,
        }).transaction();

        return tokenBurnTx;
    }

    async tokenGameVoteTx({
        mint,
        message,
        owner
    }: TokenGameVoteTxParams) {
        const programDelegate = getProgramDelegate();

        // Could just do this.provider.wallet.publicKey
        const mintOwner = owner ?? await getMintOwner(this.provider.connection, mint);
        const tokenAccount = getAssociatedTokenAddressSync(
            mint,
            mintOwner,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        const tokenBurnTx = await this.program.methods.tokenGameVote({
            message: message
        }).accounts({
            mint: mint,
            tokenAccount,
            tokenMetadata: getTokenBurgerMetadata(mint),
            payer: mintOwner,
            updateAuthority: programDelegate,
            token22Program: TOKEN_2022_PROGRAM_ID,
        }).transaction();

        return tokenBurnTx;
    }
}

export default EpplexProvider;