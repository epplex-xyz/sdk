import * as anchor from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  ConfirmOptions,
  Connection,
  Keypair, PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY, Transaction,
} from "@solana/web3.js";
import {ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {EpplexBurger, IDL as BurgerIdl} from "./types/epplexBurgerTypes";
import {BURGER_PROGRAM_ID, CORE_PROGRAM_ID} from "./constants/ids";
import {getMintOwner} from "./utils";
import {SEED_BURGER_METADATA, SEED_PROGRAM_DELEGATE} from "./constants/seeds";

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

  async createWhitelistMintTx(
      expiryDate: string,
      mint: Keypair,
      name: string,
      symbol: string,
      uri: string
  ) {
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
      // prolly could tweak this further down
      ComputeBudgetProgram.setComputeUnitLimit({ units: 250_000 }),
      tokenCreateIx
    ];

    return  new Transaction().add(...ixs);
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
