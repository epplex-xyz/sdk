import * as anchor from "@coral-xyz/anchor";
import {
    ComputeBudgetProgram,
    ConfirmOptions,
    Connection,
    Keypair, PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction,
} from "@solana/web3.js";
import {
    AccountLayout,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync, getTokenMetadata,
    TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {EpplexBurger, IDL as BurgerIdl} from "./types/epplexBurgerTypes";
import {BURGER_PROGRAM_ID, CORE_PROGRAM_ID} from "./constants/ids";
import {getMintOwner, tryCreateATAIx} from "./utils";
import {SEED_BURGER_METADATA, SEED_PROGRAM_DELEGATE} from "./constants/seeds";
import {TokenMetadata} from "@solana/spl-token-metadata";
import {AnchorProvider} from "@coral-xyz/anchor";
import {VAULT} from "./constants/keys";
import {CreateWhitelistMintTxParams, TokenGameVoteTxParams} from "./EpplexProviderTypes";

class EpplexProvider {
  provider: anchor.AnchorProvider;
  program: anchor.Program<EpplexBurger>

  constructor(
    wallet: anchor.Wallet,
    connection: Connection,
    opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
  ) {
    this.provider = new anchor.AnchorProvider(connection, wallet, opts);
    this.program = new anchor.Program(BurgerIdl, BURGER_PROGRAM_ID, this.provider);
  }

  async createWhitelistMintTx({
      expiryDate,
      mint,
      name,
      symbol,
      uri,
  }: CreateWhitelistMintTxParams) {
    const permanentDelegate = this.getProgramDelegate();
    const payer = this.provider.wallet.publicKey;
    const ata = getAssociatedTokenAddressSync(
        mint.publicKey,
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
          mint: mint.publicKey,
          tokenAccount: ata,
          tokenMetadata: this.getTokenBurgerMetadata(mint.publicKey),
          permanentDelegate: permanentDelegate,
          payer: payer,

          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          token22Program: TOKEN_2022_PROGRAM_ID,
          associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
          epplexCore: CORE_PROGRAM_ID,
        })
        .instruction();

    const ixs = [
      ComputeBudgetProgram.setComputeUnitLimit({ units: 250_000 }),
      tokenCreateIx
    ];

    return  new Transaction().add(...ixs);
  }

    async renewTokenTx(
        mint: PublicKey,
        fundUpTo: number = 0.1,
    ): Promise<{
        tx: Transaction
        // signers: Keypair[]}
    }> {
        // const ata = getAssociatedTokenAddressSync(
        //     mint, this.wallet.publicKey, undefined, TOKEN_2022_PROGRAM_ID
        // );

        const ixs: TransactionInstruction[] = [];

        // const switchboardMint: NativeMint = await NativeMint.load(this.program.provider as AnchorProvider);
        // const [payerAta, wrapSolTxn] = await switchboardMint.getOrCreateWrappedUserInstructions(
        //     this.provider.wallet.publicKey,
        //     { fundUpTo: fundUpTo }
        // );
        // if (wrapSolTxn === undefined) {
        //     throw new Error("Wrap SOL failed");
        // }
        // ixs.push(...wrapSolTxn.ixns);

        const WSOL_NATIVE_ADDRESS = new PublicKey('So11111111111111111111111111111111111111112');

        // VAULT Ata
        const proceedsAta = getAssociatedTokenAddressSync(
            WSOL_NATIVE_ADDRESS, VAULT, undefined, TOKEN_PROGRAM_ID
        );

        // Payer Ata - already created with switchboard stuff
        const payerAta = getAssociatedTokenAddressSync(
            WSOL_NATIVE_ADDRESS, this.provider.wallet.publicKey, undefined, TOKEN_PROGRAM_ID
        );

        // const payerIx = await tryCreateATAIx(
        //     this.connection, this.wallet.publicKey, payerAta, this.wallet.publicKey, NativeMint.address
        // );

        const proceedsIx = await tryCreateATAIx(
            this.provider.connection,
            this.provider.wallet.publicKey,
            proceedsAta,
            VAULT,
            WSOL_NATIVE_ADDRESS,
            TOKEN_2022_PROGRAM_ID
        );

        ixs.push(...proceedsIx);

        const renewIx = await this.program.methods
            .tokenRenew({ renewTerms: 1 })
            .accounts({
                mint,
                tokenMetadata: this.getTokenBurgerMetadata(mint),
                mintPayment: WSOL_NATIVE_ADDRESS,
                proceedsTokenAccount: proceedsAta,
                payerTokenAccount: payerAta,
                payer: this.provider.wallet.publicKey,
                updateAuthority: this.getProgramDelegate(),
                token22Program: TOKEN_2022_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID
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

  async burnTokenTx(mint: PublicKey, owner?: PublicKey) {
      const programDelegate = this.getProgramDelegate();
      const mintOwner = owner ?? await getMintOwner(this.provider.connection, mint);
      const tokenAccount = getAssociatedTokenAddressSync(mint, mintOwner, undefined, TOKEN_2022_PROGRAM_ID);

      const tokenBurnTx = await this.program.methods
          .tokenBurn({})
          .accounts({
              mint: mint,
              permanentDelegate: programDelegate,
              tokenAccount,
              payer: this.provider.wallet.publicKey,
              token22Program: TOKEN_2022_PROGRAM_ID,
          })
          .transaction();

      return tokenBurnTx;
  }

    async tokenGameVoteTx({mint, owner}: TokenGameVoteTxParams) {
        const programDelegate = this.getProgramDelegate();
        const mintOwner = owner ?? await getMintOwner(this.provider.connection, mint);
        const tokenAccount = getAssociatedTokenAddressSync(mint, mintOwner, undefined, TOKEN_2022_PROGRAM_ID);

        const tokenBurnTx = await this.program.methods
            .tokenGameVote({})
            .accounts({
                mint: mint,
                permanentDelegate: programDelegate,
                tokenAccount,
                payer: this.provider.wallet.publicKey,
                token22Program: TOKEN_2022_PROGRAM_ID,
            })
            .transaction();

        return tokenBurnTx;
    }
// #[account(
//         mut,
//         mint::token_program = token22_program.key(),
//         constraint = mint.decimals == 0,
//         constraint = mint.supply == 1,
//     )]
//     pub mint: Box<InterfaceAccount<'info, MintInterface>>,
//
// #[account(
//         token::mint = mint,
//         token::authority = payer,
//         token::token_program = token22_program.key(),
//     )]
//     pub token_account: Box<InterfaceAccount<'info, TokenAccountInterface>>, // Used to verify owner
//
// #[account(
//         seeds = [
//             SEED_BURGER_METADATA,
//             mint.key().as_ref()
//         ],
//         bump = token_metadata.bump
//     )]
//     pub token_metadata: Account<'info, BurgerMetadata>,
//
// #[account()]
//     pub payer: Signer<'info>,
//
// #[account(
//         seeds = [
//             SEED_PROGRAM_DELEGATE
//         ],
//         bump = update_authority.bump
//     )]
//     pub update_authority: Account<'info, ProgramDelegate>,
//
//     pub token22_program: Program<'info, Token2022>,
//     pub token_program: Program<'info, Token>,
    async myGetTokenMetadata(
        connection: Connection,
        publicKey: PublicKey
    ): Promise<TokenMetadata[]> {
        // Get all Token2022s of owner
        const allTokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_2022_PROGRAM_ID });

        const tokenMetadata: TokenMetadata[] = [];
        for (const [_, e] of allTokenAccounts.value.entries()) {
            // Get raw data
            const data = AccountLayout.decode(e.account.data);

            // Get burger program metadata address
            const metadataPda = this.getTokenBurgerMetadata(data.mint);
            try {
                // Check if metadata exists - if not, it is not an epNFT
                const account = await connection.getAccountInfo(metadataPda);
            if (account === null) {
                throw Error(`Not an epNFT from the burger program ${data.mint.toString()}`);
            }

            const metadata = await getTokenMetadata(connection, data.mint);
            if (metadata !== null) {
                tokenMetadata.push(metadata);
            }
        } catch (e) {
            console.log("Failed to decode", e);
            }
        }

        return tokenMetadata;
    }

      getProgramDelegate(): PublicKey {
        const [programDelegate] = PublicKey.findProgramAddressSync(
            [SEED_PROGRAM_DELEGATE],
            this.program.programId
        );
        return programDelegate;
      }

    getTokenBurgerMetadata(mint: PublicKey): PublicKey {
        const [metadata] = PublicKey.findProgramAddressSync(
            [
                SEED_BURGER_METADATA,
                mint.toBuffer()
            ],
            this.program.programId
        );
        return metadata;
    }
}

export default EpplexProvider;
