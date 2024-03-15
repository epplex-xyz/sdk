import * as anchor from "@coral-xyz/anchor";
import {
    ConfirmOptions,
    Connection,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {EpplexProviderWallet} from "./types/WalletProvider";
import {
    DISTRIBUTION_PROGRAM_ID,
    DistributionProgram,
    getDistributionAccount,
    getDistributionProgram,
    getExtraMetasAccount,
    getGroupAccount,
    getManagerAccount,
    getMemberAccount,
    getMetadataProgram, WNS_PROGRAM_ID,
    WnsProgram
} from "./constants/wenCore";
import {ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {
    AddDistributionArgs,
    CreateGroupArgs,
    GroupAccount,
    GroupMemberAccount,
    CreateCollectionArgs,
    AdditionalAccountArgs, AddGroupArgs
} from "./types/wenTypes";
import {getAtaAddress} from "./utils/generic";
import {CreateCollectionMintTxTxParams} from "./types/EpplexProviderTypes";

class WenProvider {
    provider: anchor.AnchorProvider;
    metadataProgram: WnsProgram
    distributionProgram: DistributionProgram
    treasury: PublicKey;

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
        metadataProgramId: PublicKey = WNS_PROGRAM_ID,
        distributionProgramId: PublicKey = DISTRIBUTION_PROGRAM_ID,
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.metadataProgram = getMetadataProgram(this.provider, metadataProgramId);
        this.distributionProgram = getDistributionProgram(this.provider, distributionProgramId)
    }

    getManagerAccountPda(): PublicKey {
        return getManagerAccount(this.metadataProgram.programId);
    }

    async getManagerAccount(): Promise<GroupMemberAccount | undefined> {
        return await this.metadataProgram.account.manager
            .fetch(this.getManagerAccountPda())
            .then(account => account)
            .catch(() => undefined);
    }

    async createCollectionIxes(args: CreateCollectionArgs & AdditionalAccountArgs) {
        const groupArgs = {
            groupMint: args.mint,
            name: args.name,
            symbol: args.symbol,
            uri: args.uri,
            maxSize: args.maxSize,
            receiver: args.receiver,
            payer: args.payer,
            authority: args.authority,
        };
        const createGroupIx = await this.getCreateGroupIx(groupArgs);

        const addDistributionArgs = {
            groupMint: groupArgs.groupMint,
            paymentMint: PublicKey.default.toString(),
            payer: args.payer,
            authority: args.authority,
        };
        const addDistributionIx = await this.getAddDistributionIx(addDistributionArgs);
        return [createGroupIx, addDistributionIx]
    }

    getMemberAccountPda(mint: string): PublicKey {
        return getMemberAccount(mint, this.metadataProgram.programId)
    }

    async getGroupMemberAccount(mint: string): Promise<GroupMemberAccount | undefined> {
        return this.metadataProgram.account.tokenGroupMember
            .fetch(this.getMemberAccountPda(mint))
            .then(account => account)
            .catch(() => undefined);
    }

    getGroupAccountPda(groupMint: string): PublicKey {
        return getGroupAccount(groupMint, this.metadataProgram.programId)
    }

    async getGroupAccount(groupMint: string): Promise<GroupAccount | undefined> {
        return this.metadataProgram.account.tokenGroup
            .fetch(this.getGroupAccountPda(groupMint))
            .then(account => account)
            .catch(() => undefined);
    }


    async getCreateGroupIx(args: CreateGroupArgs) {
        const ix = await this.metadataProgram.methods
            .createGroupAccount({
                name: args.name,
                symbol: args.symbol,
                uri: args.uri,
                maxSize: args.maxSize,
            })
            .accountsStrict({
                payer: args.payer,
                authority: args.authority,
                receiver: args.receiver,
                mint: args.groupMint,
                mintTokenAccount: getAtaAddress(args.groupMint, args.receiver),
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenProgram: TOKEN_2022_PROGRAM_ID,
                group: this.getGroupAccountPda(args.groupMint),
                manager: this.getManagerAccountPda(),
            })
            .instruction();

        return ix;
    };

    getDistributionAccountPda(groupMint: string, paymentMint: string): PublicKey {
        return getDistributionAccount(groupMint, paymentMint, this.distributionProgram.programId)
    }

    async getAddDistributionIx(args: AddDistributionArgs) {
        const distributionAccount = this.getDistributionAccountPda(
            args.groupMint, args.paymentMint);

        const ix = await this.distributionProgram.methods
            .initializeDistribution(new PublicKey(args.paymentMint))
            .accountsStrict({
                payer: args.payer,
                groupMint: args.groupMint,
                systemProgram: SystemProgram.programId,
                distributionAccount,
            })
            .instruction();

        return ix;
    };

    async initManagerAccountTx() {
        return await this.metadataProgram.methods
            .initManagerAccount()
            .accountsStrict({
                payer: this.provider.publicKey,
                manager: this.getManagerAccountPda(),
                systemProgram: SystemProgram.programId,
            })
            .transaction()
    }

    async getAddNftToGroupIx(args: AddGroupArgs) {
        const ix = await this.metadataProgram.methods
            .addMintToGroup()
            .accountsStrict({
                payer: args.payer,
                authority: args.authority,
                mint: args.mint,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_2022_PROGRAM_ID,
                group: this.getGroupAccountPda(args.group) ,
                member: this.getMemberAccountPda(args.mint),
                manager: this.getManagerAccountPda(),
            })
            .instruction();

        return ix;
    };

}

export default WenProvider;