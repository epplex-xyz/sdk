import { BN, Provider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { CORE_PROGRAM_ID } from "./ids";
import * as anchor from "@coral-xyz/anchor";
import EpplexCoreIdl from "../idl/epplex_core.json";
import { EpplexCore } from "../types/epplexCoreTypes";

export type CoreProgram = anchor.Program<EpplexCore>;

export function getEpplexCoreProgram(
    provider: Provider,
    coreProgramId: PublicKey,
): CoreProgram {
    const idl = {
        ...EpplexCoreIdl,
        address: coreProgramId.toString(),
    } as anchor.Idl;
    const program = new anchor.Program(idl, provider) as unknown as CoreProgram;
    return program;
}
export const SEED_GLOBAL_COLLECTION = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            // GLOBAL_COLLECTION
            return obj.name === "SEED_GLOBAL_COLLECTION_CONFIG";
        })[0].value,
    ),
);

export const SEED_COLLECTION_CONFIG = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            //  CONFIG
            return obj.name === "SEED_COLLECTION_CONFIG";
        })[0].value,
    ),
);

export const SEED_COLLECTION_MINT = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            // COLLECTION_MINT
            return obj.name === "SEED_COLLECTION_MINT";
        })[0].value,
    ),
);

export const SEED_MINT = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            // MINT
            return obj.name === "SEED_MINT";
        })[0].value,
    ),
);

export function getGlobalCollectionConfig(
    coreProgramId = CORE_PROGRAM_ID,
): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [SEED_GLOBAL_COLLECTION],
        coreProgramId,
    );
    return globalCollectionConfig;
}

// From globalCollection counter
export function getCollectionConfig(
    collectionCounter: number,
    coreProgramId = CORE_PROGRAM_ID,
): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_COLLECTION_CONFIG,
            new BN(collectionCounter).toArrayLike(Buffer, "le", 8),
        ],
        coreProgramId,
    );
    return globalCollectionConfig;
}

export function getCollectionMint(
    collectionCounter: number,
    coreProgramId = CORE_PROGRAM_ID,
): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_COLLECTION_MINT,
            new BN(collectionCounter).toArrayLike(Buffer, "le", 8),
        ],
        coreProgramId,
    );
    return globalCollectionConfig;
}

// From globalCollection counter
export function getMint(
    collectionCounter: number,
    mintCount: number,
    coreProgramId = CORE_PROGRAM_ID,
): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_MINT,
            new BN(collectionCounter).toArrayLike(Buffer, "le", 8),
            new BN(mintCount).toArrayLike(Buffer, "le", 8),
        ],
        coreProgramId,
    );
    return globalCollectionConfig;
}

/*
 * Ephemeral Membership
 */

export const SEED_EPHEMERAL_DATA = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            return obj.name === "SEED_EPHEMERAL_DATA";
        })[0].value,
    ),
);

export const SEED_EPHEMERAL_AUTH = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            return obj.name === "SEED_EPHEMERAL_AUTH";
        })[0].value,
    ),
);

export const SEED_EPHEMERAL_RULE = Buffer.from(
    JSON.parse(
        EpplexCoreIdl.constants.filter((obj) => {
            return obj.name === "SEED_EPHEMERAL_RULE";
        })[0].value,
    ),
);

export function getEphemeralData(
    membership: PublicKey,
    coreProgramId = CORE_PROGRAM_ID,
): PublicKey {
    const [data] = PublicKey.findProgramAddressSync(
        [SEED_EPHEMERAL_DATA, membership.toBuffer()],
        coreProgramId,
    );
    return data;
}

export function getEphemeralAuth(coreProgramId = CORE_PROGRAM_ID): PublicKey {
    const [auth] = PublicKey.findProgramAddressSync(
        [SEED_EPHEMERAL_AUTH],
        coreProgramId,
    );
    return auth;
}

export function getEphemeralRule(
    seed: BN,
    coreProgramId = CORE_PROGRAM_ID,
): PublicKey {
    const [rule] = PublicKey.findProgramAddressSync(
        [SEED_EPHEMERAL_RULE, seed.toArrayLike(Buffer, "le", 8)],
        coreProgramId,
    );
    return rule;
}
