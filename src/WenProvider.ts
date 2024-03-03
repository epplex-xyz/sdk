import * as anchor from "@coral-xyz/anchor";
import {ConfirmOptions, Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY,} from "@solana/web3.js";
import {EpplexProviderWallet} from "./types/WalletProvider";
import {
    CreateCollectionArgs, CreateNftArgs, Creator, getExtraMetasAccount,
    getGroupAccount,
    getManagerAccount, getMemberAccount,
    getMetadataProgram,
    WnsProgram
} from "./constants/wenCore";
import {ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";

class WenProvider {
    provider: anchor.AnchorProvider;
    program: WnsProgram
    treasury: PublicKey;

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = getMetadataProgram(this.provider);
    }

    static fromAnchorProvider(provider: anchor.AnchorProvider) : WenProvider {
        return new WenProvider(provider.wallet, provider.connection, provider.opts);
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


        const ix = await this.program.methods
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

        const ix = await this.program.methods
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

        const ix = await this.program.methods
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

        const ix = await this.program.methods
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

}

export default WenProvider;