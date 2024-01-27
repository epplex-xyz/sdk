import {PublicKey} from "@solana/web3.js";
import EpplexBurgerIdl from "../idl/epplex_burger.json";
import EpplexCoreIdl from "../idl/epplex_core.json";

export const BURGER_PROGRAM_ID = new PublicKey(EpplexBurgerIdl.metadata.address);

export const CORE_PROGRAM_ID = new PublicKey(EpplexCoreIdl.metadata.address);