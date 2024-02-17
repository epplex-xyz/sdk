import { PublicKey } from "@solana/web3.js";
import { BURGER_PROGRAM_ID } from "./constants/ids";

export function getGameConfigAccount(): PublicKey {
    const [gameConfig] = PublicKey.findProgramAddressSync(
        [Buffer.from("GAME_CONFIG")],
        BURGER_PROGRAM_ID
    );

    return gameConfig;
}
