import {setupGlobals} from "./utils/setup";
import {expect} from "chai";
import {EpNFTService, getTransactionSize, sendAndConfirmRawTransaction} from "../src";
import {PublicKey, Transaction} from "@solana/web3.js";
import {DecodeTypesService} from "../src";
import coreProvider from "../src/CoreProvider";


describe('Reset all tokens in PAYER_ADMIN', () => {
    const {wallet, burgerProvider, wenProvider} = setupGlobals()
    const owner = wallet.publicKey;

    const connection = burgerProvider.provider.connection;
    let myNFts: any[] = [];

    it('Get all NFTs', async () => {
        const group = "DY7oYBeGCcNqEGSEFGNKVM8GDiVs7iTwZaBGVTs2LCZB"
        const g = await wenProvider.getGroupAccount(group);
        console.log("g", g)
        // DY7oYBeGCcNqEGSEFGNKVM8GDiVs7iTwZaBGVTs2LCZB
        const symbol = "\uD83C\uDF54"

    });

    it('Get collection data', async () => {
        const collectionMint = "DY7oYBeGCcNqEGSEFGNKVM8GDiVs7iTwZaBGVTs2LCZB"
        const g = await wenProvider.getGroupAccount(collectionMint);
        console.log("g", g)
    });



    it('Update token metadata', async () => {
        const mint = "9dqw9Fq9Riin1fynJQrXr6eaCE6fx3a49FMGDsyowa66"
        const symbol = "\uD83C\uDF54"
        const uri = "https://shdw-drive.genesysgo.net/D5rr6uUDoMcKicdPZFFzKELvPNd7LppkrkB8c2pEHGKP/5000.json"
        const name = "Burger #5000"



    });




});