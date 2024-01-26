import * as anchor from "@coral-xyz/anchor";
import {ConfirmOptions, Connection,} from "@solana/web3.js";

class EpplexProvider {
  // burgerProgram: anchor.Program<EpplexBurger>;
  anchorProvider: anchor.AnchorProvider;

  constructor(
    wallet: anchor.Wallet,
    connection: Connection,
    opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
  ) {
    this.anchorProvider = new anchor.AnchorProvider(connection, wallet, opts);
  }
}

export default EpplexProvider;
