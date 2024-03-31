import {setupGlobals} from "./utils/setup";
import {expect} from "chai";
import {
    EpNFTService,
    getTransactionSize,
    getWnsNftTransferIxs,
    sendAndConfirmRawTransaction,
    sendAndConfirmRawVersionedTransaction
} from "../src";
import {PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";
import {DecodeTypesService} from "../src";
import coreProvider from "../src/CoreProvider";


describe('Reset all tokens in PAYER_ADMIN', () => {
    const {wallet, burgerProvider, wenProvider, coreProvider} = setupGlobals()
    const owner = wallet.publicKey;

    const connection = burgerProvider.provider.connection;
    let myNFts: any[] = [];

    // it('Get all NFTs', async () => {
    //     myNFts = await EpNFTService.getT22NFTs(
    //         connection,
    //         owner,
    //     );
    //     console.log("Number of NFTs", myNFts.length);
    //     expect(myNFts).to.not.be.empty;
    //
    // });

    // it('Get rule data', async () => {
    //     const rule  = await coreProvider.getRuleData(69420)
    //     console.log("Rule", Number(rule.renewalPrice)/1000_000_000);
    //     // expect(myNFts).to.not.be.empty;
    // });

    // it('Get collection data', async () => {
    //     const collectionMint = "DY7oYBeGCcNqEGSEFGNKVM8GDiVs7iTwZaBGVTs2LCZB"
    //     const g = await wenProvider.getGroupAccount(collectionMint);
    //     console.log("g", g)
    // });

    // it('Update token metadata', async () => {
    //     // const mint = myNFts[0].mint
    //     const mint = new PublicKey("9dqw9Fq9Riin1fynJQrXr6eaCE6fx3a49FMGDsyowa66") // true
    //
    //     const symbol = "\uD83C\uDF54"
    //     const uri = "https://shdw-drive.genesysgo.net/D5rr6uUDoMcKicdPZFFzKELvPNd7LppkrkB8c2pEHGKP/5000.json"
    //     const name = "Burger #5000"
    //
    //     const tx = await burgerProvider.tokenUpdateTx({mint, name, symbol, uri})
    //     const id = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
    // });

    // it('Transfer', async () => {
    //     // const mint = myNFts[0].mint
    //     const mint = new PublicKey("")
    //     const receiver = new PublicKey("")
    //     let transferIxs = getWnsNftTransferIxs({
    //         mint: mint,
    //         sender: wallet.publicKey,
    //         payer: wallet.publicKey,
    //         receiver
    //     })
    //     await sendAndConfirmRawTransaction(connection, new Transaction().add(...transferIxs), wallet.publicKey, wallet, []);
    // });

});