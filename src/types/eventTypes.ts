import { IdlEvents } from "@coral-xyz/anchor";
import { EpplexBurger } from "../types/epplexBurgerTypes";

export type TokenGameVoteEvent = IdlEvents<EpplexBurger>["EvTokenGameVote"];
export type TokenGameBurnEvent = IdlEvents<EpplexBurger>["EvTokenGameBurn"];
export type TokenGameResetEvent = IdlEvents<EpplexBurger>["EvTokenGameReset"];
export type TokenGameImmunityEvent = IdlEvents<EpplexBurger>["EvTokenGameImmunity"];
export type GameEndEvent = IdlEvents<EpplexBurger>["EvGameEnd"];
