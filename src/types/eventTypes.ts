import { IdlAccounts, IdlTypes, IdlEvents } from "@coral-xyz/anchor";
import { EpplexBurger } from "../types/epplexBurgerTypes";

export type TokenGameVoteEVent = IdlEvents<EpplexBurger>["EvTokenGameVote"];
