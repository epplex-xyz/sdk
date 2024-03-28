import {setupGlobals} from "./utils/setup";
import {
    createBurnInstruction,
    createCloseAccountInstruction,
    getAccount, getMint,
    TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import {expect} from "chai";
import {EpNFTService} from "../src";
import {getAtaAddressPubkey} from "../lib/utils/generic";
import {sendAndConfirmRawTransaction} from "../src";
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

            const res = await getMint(
                connection,
                mint,
                undefined,
                TOKEN_2022_PROGRAM_ID
            )

            if (res) {
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
            }
        }
    });

    // it('Burn all standard', async () => {
    //     for (let i = 0; i < myNFts.length; i++) {
    //         const mint: PublicKey = myNFts[i].mint;
    //         console.log(`Burn ${i}:`, mint.toString())
    //
    //         const ata = getAtaAddressPubkey(mint, owner);
    //         const ataData = await getAccount(
    //             connection,
    //             getAtaAddressPubkey(mint, owner),
    //             undefined,
    //             TOKEN_2022_PROGRAM_ID
    //         );
    //
    //         const ixs = []
    //         // Check amount is zero, if so we burn
    //         if (Number(ataData.amount) === 1) {
    //             ixs.push(
    //                 createBurnInstruction(
    //                     ata,
    //                     mint,
    //                     owner,
    //                     1,
    //                     undefined,
    //                     TOKEN_2022_PROGRAM_ID
    //                 ),
    //             )
    //         }
    //
    //         // not closing mint account cus we might not have the authority to do in case of WNS nft
    //         ixs.push(
    //             createCloseAccountInstruction(
    //                 ata,
    //                 owner,
    //                 owner,
    //                 undefined,
    //                 TOKEN_2022_PROGRAM_ID
    //             )
    //         )
    //
    //         await sendAndConfirmRawTransaction(
    //             burgerProvider.provider.connection, new Transaction().add(...ixs), wallet.publicKey, wallet, []
    //         );
    //     }
    // });

});
