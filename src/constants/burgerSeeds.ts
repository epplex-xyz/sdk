import { PublicKey } from "@solana/web3.js";
import EpplexBurgerIdl from "../idl/epplex_burger.json";
import { BURGER_PROGRAM_ID } from "./ids";

export const SEED_BURGER_METADATA = Buffer.from(
    JSON.parse(
        EpplexBurgerIdl.constants.filter((obj) => {
            return obj.name === "SEED_BURGER_METADATA";
        })[0].value
    )
);

export const SEED_PROGRAM_DELEGATE = Buffer.from(
    JSON.parse(
        EpplexBurgerIdl.constants.filter((obj) => {
            return obj.name === "SEED_PROGRAM_DELEGATE";
        })[0].value
    )
);

export function getProgramDelegate(
    burgerProgramId = BURGER_PROGRAM_ID
): PublicKey {
    const [programDelegate] = PublicKey.findProgramAddressSync(
        [SEED_PROGRAM_DELEGATE],
        burgerProgramId
    );
    return programDelegate;
}

export function getTokenBurgerMetadata(
    mint: PublicKey,
    burgerProgramId = BURGER_PROGRAM_ID
): PublicKey {
    const [metadata] = PublicKey.findProgramAddressSync(
        [SEED_BURGER_METADATA, mint.toBuffer()],
        burgerProgramId
    );
    return metadata;
}

export function getGameConfigAccount(
    burgerProgramId = BURGER_PROGRAM_ID
): PublicKey {
    const [gameConfig] = PublicKey.findProgramAddressSync(
        [Buffer.from("GAME_CONFIG")],
        burgerProgramId
    );

    return gameConfig;
}
