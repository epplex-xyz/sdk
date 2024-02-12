import * as anchor from "@coral-xyz/anchor";
import {ConfirmOptions, Connection,} from "@solana/web3.js";
import {EpplexCore, IDL as CoreIdl} from "./types/epplexCoreTypes";
import {BURGER_PROGRAM_ID} from "./constants/ids";
import {EpplexProviderWallet} from "./types/WalletProvider";

class CoreProvider {
    provider: anchor.AnchorProvider;
    program: anchor.Program < EpplexCore >

    constructor(
        wallet: EpplexProviderWallet,
        connection: Connection,
        opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
    ) {
        this.provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.program = new anchor.Program(CoreIdl, BURGER_PROGRAM_ID, this.provider);
    }

    static fromAnchorProvider(provider: anchor.AnchorProvider) : CoreProvider {
        const epplexProvider = new CoreProvider(provider.wallet, provider.connection, provider.opts);
        return epplexProvider;
    }

}

export default CoreProvider;