import { IdlEvents } from "@coral-xyz/anchor";
import { EpplexBurger } from "../types/epplexBurgerTypes";

export type TokenGameVoteEvent = IdlEvents<EpplexBurger>["EvTokenGameVote"];
export type TokenGameBurnEvent = IdlEvents<EpplexBurger>["EvTokenGameBurn"];
export type TokenGameResetEvent = IdlEvents<EpplexBurger>["EvTokenGameReset"];
export type TokenGameImmunityEvent = IdlEvents<EpplexBurger>["EvTokenGameImmunity"];
export type GameStartEvent = IdlEvents<EpplexBurger>["EvGameStart"];
export type GameEndEvent = IdlEvents<EpplexBurger>["EvGameEnd"];
export type GameUpdateEvent = IdlEvents<EpplexBurger>["EvGameUpdate"];
export type AllEventNames = EpplexBurger["events"][number]["name"]