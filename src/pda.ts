import { PublicKey } from "@solana/web3.js";
import { BURGER_PROGRAM_ID } from "./constants/ids";
import { GAME_CONFIG_SEED } from "./constants/burgerSeeds";

export function getGameConfigAccount(): PublicKey {
	const [gameConfig] = PublicKey.findProgramAddressSync(
		[Buffer.from(GAME_CONFIG_SEED)],
		BURGER_PROGRAM_ID
	);

	return gameConfig;
}
