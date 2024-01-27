import EpplexBurgerIdl from "../idl/epplex_burger.json";

export const SEED_BURGER_METADATA = Buffer.from(JSON.parse(
    EpplexBurgerIdl.constants.filter(obj => {
        return obj.name === "SEED_BURGER_METADATA";
    })[0].value
));

export const SEED_PROGRAM_DELEGATE = Buffer.from(JSON.parse(
    EpplexBurgerIdl.constants.filter(obj => {
        return obj.name === "SEED_PROGRAM_DELEGATE";
    })[0].value
));

