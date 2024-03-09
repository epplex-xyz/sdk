import * as anchor from "@coral-xyz/anchor";
import {
    ConfirmOptions,
    Connection,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY, Transaction,
} from "@solana/web3.js";
import {EpplexProviderWallet} from "./types/WalletProvider";
import {
    CreateCollectionArgs,
    CreateNftArgs,
    Creator,
    DistributionProgram,
    getDistributionAccount,
    getDistributionProgram,
    getExtraMetasAccount,
    getGroupAccount,
    getManagerAccount,
    getMemberAccount,
    getMetadataProgram,
    WnsProgram
} from "./constants/wenCore";
import {ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";

class WenProvider {
    provider: anchor.AnchorProvider;
    metadataProgram: WnsProgram
    distributionProgram: DistributionProgram
    treasury: PublicKey;

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.metadataProgram = getMetadataProgram(this.provider);
        this.distributionProgram = getDistributionProgram(this.provider)
    }
    async buildCreateCollectionIx(args: CreateCollectionArgs, authority: string)  {
        const groupAccount = getGroupAccount(args.mint);
        const managerAccount = getManagerAccount();

        const authorityPubkey = new PublicKey(authority);
        const mintPubkey = new PublicKey(args.mint);

        const mintAta = getAssociatedTokenAddressSync(
            mintPubkey,
            authorityPubkey,
            undefined,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const ix = await this.metadataProgram.methods
            .createGroupAccount({
                name: args.name,
                symbol: args.symbol,
                uri: args.uri,
                maxSize: args.maxSize
            })
            .accountsStrict({
                payer: authorityPubkey,
                authority: authorityPubkey,
                receiver: authorityPubkey,
                mint: mintPubkey,
                mintTokenAccount: mintAta,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenProgram: TOKEN_2022_PROGRAM_ID,
                group: groupAccount,
                manager: managerAccount
            })
            .instruction();

        return {
            ix,
            group: groupAccount
        };
    };

    async buildMintNftIx(args: CreateNftArgs, minter: string, authority: string, permanentDelegate: string | null = null) {
        const mintPubkey = new PublicKey(args.mint);
        const managerAccount = getManagerAccount();
        const authorityPubkey = new PublicKey(authority);
        const minterPubkey = new PublicKey(minter);
        const extraMetasAccount = getExtraMetasAccount(args.mint);

        const mintAta = getAssociatedTokenAddressSync(
            mintPubkey,
            authorityPubkey,
            undefined,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const ix = await this.metadataProgram.methods
            .createMintAccount(args)
            .accountsStrict({
                payer: minterPubkey,
                authority: authorityPubkey,
                receiver: minterPubkey,
                mint: mintPubkey,
                mintTokenAccount: mintAta,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenProgram: TOKEN_2022_PROGRAM_ID,
                manager: managerAccount,
                extraMetasAccount,
                permanentDelegate
            })
            .instruction();
        return ix;
    };

    async buildAddGroupIx(collectionAuthority: string, mint: string, collectionMint: string) {
        const groupAccount = getGroupAccount(collectionMint);
        const memberAccount = getMemberAccount(mint);
        const collectionAuthPubkey = new PublicKey(collectionAuthority);
        const mintPubkey = new PublicKey(mint);

        const ix = await this.metadataProgram.methods
            .addGroupToMint()
            .accountsStrict({
                payer: collectionAuthPubkey,
                authority: collectionAuthPubkey,
                mint: mintPubkey,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_2022_PROGRAM_ID,
                group: groupAccount,
                member: memberAccount
            })
            .instruction();

        return ix;
    }

    async buildAddRoyaltiesIx(metadataAuthority: string, mint: string, royaltyBasisPoints: number, creators: Creator[]) {
        const extraMetasAccount = getExtraMetasAccount(mint);
        const metadataAuthPubkey = new PublicKey(metadataAuthority);
        const mintPubkey = new PublicKey(mint);

        const ix = await this.metadataProgram.methods
            .addRoyaltiesToMint({
                royaltyBasisPoints,
                creators
            })
            .accountsStrict({
                payer: metadataAuthPubkey,
                authority: metadataAuthPubkey,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenProgram: TOKEN_2022_PROGRAM_ID,
                extraMetasAccount,
                mint: mintPubkey,
            })
            .instruction();

        return ix;
    }

    async buildAddDistributionIx(collection: string, authority: string) {
        const authorityPubkey = new PublicKey(authority)
        const ix = await this.distributionProgram.methods
            .initializeDistribution()
            .accountsStrict({
                payer: authorityPubkey,
                authority: authorityPubkey,
                mint: new PublicKey(collection),
                systemProgram: SystemProgram.programId,
                distribution: getDistributionAccount(collection),
            })
            .instruction();

        return ix;
    };

    /**
     *  1. Create a collection
     *  2. Add distribution for royalties
     *
     * @param args
     * @param authority
     */
    async createCollectionWithRoyaltiesTx(args: CreateCollectionArgs, authority: string) {
        const { ix: createCollectionIx } = await this.buildCreateCollectionIx(args, authority);
        const addDistributionIx = await this.buildAddDistributionIx(args.mint, authority);
        return new Transaction().add(createCollectionIx, addDistributionIx);
    }

    async mintNft(args: {
        name: string;
        symbol: string;
        uri: string;
        collection: string;
        royaltyBasisPoints: number;
        creators: Creator[],
        mint: string,
        minter: string,
        groupAuthority: string,
        nftAuthority: string,
        permanentDelegate?: string | null
    }) {
        const mintDetails: CreateNftArgs = {
            name: args.name,
            symbol: args.symbol,
            uri: args.uri,
            mint: args.mint,
            additionalExtensions: []
            // additionalExtensions: ["permanent"]
        }

        const mintIx = await this.buildMintNftIx(mintDetails, args.minter, args.nftAuthority, args.permanentDelegate);
        const addToGroupIx = await this.buildAddGroupIx(args.groupAuthority, args.mint, args.collection);
        const addRoyaltiesToMintIx = await this.buildAddRoyaltiesIx(args.nftAuthority, args.mint, args.royaltyBasisPoints, args.creators);

        return new Transaction().add(mintIx, addToGroupIx, addRoyaltiesToMintIx);
    }

    async initManagerAccountTx() {
        return await this.metadataProgram.methods
            .initManagerAccount()
            .accountsStrict({
                payer: this.provider.publicKey,
                manager: getManagerAccount(),
                systemProgram: SystemProgram.programId,
            })
            .transaction()
    }

}

export default WenProvider;