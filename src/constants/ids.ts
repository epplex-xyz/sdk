import { Cluster, PublicKey } from "@solana/web3.js";
import EpplexBurgerIdl from "../idl/epplex_burger.json";
import EpplexCoreIdl from "../idl/epplex_core.json";
import { DISTRIBUTION_PROGRAM_ID, WNS_PROGRAM_ID } from "./wenCore";

export const BURGER_PROGRAM_ID = new PublicKey(EpplexBurgerIdl.address);

export const CORE_PROGRAM_ID = new PublicKey(EpplexCoreIdl.address);

export interface Programs {
    burger?: PublicKey;
    core?: PublicKey;
    wns?: PublicKey;
    royalty?: PublicKey;
}

export const DEFAULT_PROGRAMS: Programs = {
    burger: BURGER_PROGRAM_ID,
    core: CORE_PROGRAM_ID,
    wns: WNS_PROGRAM_ID,
    royalty: DISTRIBUTION_PROGRAM_ID,
};

export const MAINNET_DEVNET_PROGRAMS: Programs = {
    burger: new PublicKey("epBuJysRKuFMMWTWoX6ZKPz5WTZWb98mDqn1emVj84n"),
    core: new PublicKey("epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"),
    wns: new PublicKey("wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM"),
    royalty: new PublicKey("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay"),
};

export const LOCAL_PROGRAMS: Programs = {
    burger: new PublicKey("LepByYNXCXLAQicahdRvvxBD45SMNHJgoNsAUDLyG1N"),
    core: new PublicKey("LepCn3tW66Fh7CGsJ7qjQaontU7SvEoURnxkEY78j1j"),
    wns: new PublicKey("WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"),
    royalty: new PublicKey("WRDeuzdXF7QmJbTRfiyKz7CUCXX6EbZo1dpH7G7W744"),
};

export function getIdsByNetwork(
    network: Cluster | "localnet",
    programIds?: Programs,
) {
    if (programIds !== undefined) {
        return programIds;
    } else if (network === "localnet") {
        return LOCAL_PROGRAMS;
    } else if (["mainnet-beta", "devnet"].includes(network)) {
        return MAINNET_DEVNET_PROGRAMS;
    } else {
        return DEFAULT_PROGRAMS;
    }
}
