import { IdlEvents } from "@coral-xyz/anchor";
import { EpplexBurger } from "../types/epplexBurgerTypes";

export type TokenGameVoteEvent = IdlEvents<EpplexBurger>["EvTokenGameVote"];
export type TokenGameBurnEvent = IdlEvents<EpplexBurger>["EvTokenGameBurn"];
