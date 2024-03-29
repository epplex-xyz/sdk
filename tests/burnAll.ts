import {setupGlobals} from "./utils/setup";
import {getMint, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {expect} from "chai";
import {EpNFTService, sendAndConfirmRawTransaction} from "../src";
import {ComputeBudgetProgram, PublicKey, Transaction} from "@solana/web3.js";

describe('Burn All NFTs in PAYER_ADMIN', () => {
    const {wallet, burgerProvider, wenProvider} = setupGlobals()
    const owner = wallet.publicKey;

    const connection = burgerProvider.provider.connection;
    let myNFts: any[] = [];

    it('Get all NFTs', async () => {
        myNFts = await EpNFTService.getT22NFTs(
            connection,
            owner,
        );
        console.log("Number of NFTs", myNFts.length);
        expect(myNFts).to.not.be.empty;
    });


    it('Burn all WNS', async () => {
        for (let i = 0; i < myNFts.length; i++) {
            const mint: PublicKey = myNFts[i].mint;
            console.log(`Burn ${i}:`, mint.toString())

            try {
                await getMint(
                    connection,
                    mint,
                    undefined,
                    TOKEN_2022_PROGRAM_ID
                )
            } catch (e) {
                console.log("Mint not found")
                continue
            }

            try {
                const mintCloseIx = await wenProvider.getBurnNftIx({
                    payer: wallet.publicKey.toString(),
                    authority: owner.toString(),
                    mint: mint.toString()
                })

                await sendAndConfirmRawTransaction(
                    burgerProvider.provider.connection, new Transaction().add(...[
                        ComputeBudgetProgram.setComputeUnitLimit({
                            units: 100_000,
                        }),
                        ComputeBudgetProgram.setComputeUnitPrice({
                            microLamports: 25_000,
                        }),
                        mintCloseIx
                    ]), wallet.publicKey, wallet, []
                );
            } catch (e) {
                console.log("Could not WNS burn")
            }
        }
    });

});
