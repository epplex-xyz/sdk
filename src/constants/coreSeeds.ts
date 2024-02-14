import {BN} from "@coral-xyz/anchor";
import CoreIdl from "../idl/epplex_core.json";
import {PublicKey} from "@solana/web3.js";
import {CORE_PROGRAM_ID} from "./ids";

export const SEED_GLOBAL_COLLECTION = Buffer.from(JSON.parse(
    CoreIdl.constants.filter(obj => {
        // GLOBAL_COLLECTION
        return obj.name === "SEED_GLOBAL_COLLECTION_CONFIG";

    })[0].value
));

export const SEED_COLLECTION_CONFIG = Buffer.from(JSON.parse(
    CoreIdl.constants.filter(obj => {
        //  CONFIG
        return obj.name === "SEED_COLLECTION_CONFIG";
    })[0].value
));

export const SEED_COLLECTION_MINT = Buffer.from(JSON.parse(
    CoreIdl.constants.filter(obj => {
        // COLLECTION_MINT
        return obj.name === "SEED_COLLECTION_MINT";
    })[0].value
));


export const SEED_MINT = Buffer.from(JSON.parse(
    CoreIdl.constants.filter(obj => {
        // MINT
        return obj.name === "SEED_MINT";
    })[0].value
));


export function getGlobalCollectionConfig(coreProgramId = CORE_PROGRAM_ID): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [SEED_GLOBAL_COLLECTION],
        coreProgramId
    );
    return globalCollectionConfig;
}

// From globalCollection counter
export function getCollectionConfig(collectionCounter: BN, coreProgramId = CORE_PROGRAM_ID): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_COLLECTION_CONFIG,
            collectionCounter.toArrayLike(Buffer, "le", 8)
        ],
        coreProgramId
    );
    return globalCollectionConfig;
}

<<<<<<< HEAD
export function getCollectionMint(collectionCounter: BN, coreProgramId = CORE_PROGRAM_ID): PublicKey {
=======
export function getMint(collectionCounter: BN, mintCounter: BN): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_MINT,
            collectionCounter.toArrayLike(Buffer, "le", 8),
            mintCounter.toArrayLike(Buffer, "le", 8),
        ],
        CORE_PROGRAM_ID
    );
    return globalCollectionConfig;
}

export function getCollectionMint(collectionCounter: BN): PublicKey {
>>>>>>> ad513c6 (combine collection mint and token mint instructions)
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_COLLECTION_MINT,
            collectionCounter.toArrayLike(Buffer, "le", 8),
        ],
        coreProgramId
    );
    return globalCollectionConfig;
}

<<<<<<< HEAD


// From globalCollection counter
export function getMint(collectionCounter: BN, mintCount: BN, coreProgramId = CORE_PROGRAM_ID): PublicKey {
    const [globalCollectionConfig] = PublicKey.findProgramAddressSync(
        [
            SEED_MINT,
            collectionCounter.toArrayLike(Buffer, "le", 8),
            mintCount.toArrayLike(Buffer, "le", 8)
        ],
        coreProgramId
    );
    return globalCollectionConfig;
}

=======
>>>>>>> ad513c6 (combine collection mint and token mint instructions)
