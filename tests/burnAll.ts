import {PAYER_ADMIN, setupGlobals} from "./utils/setup";
import {
    createBurnInstruction,
    createCloseAccountInstruction,
    getAccount,
    TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import {expect} from "chai";
import {EpNFTService} from "../src";
import {getAtaAddressPubkey} from "../lib/utils/generic";
import {sendAndConfirmRawTransaction} from "../src";
import {Transaction} from "@solana/web3.js";

describe('Burn All NFTs in PAYER_ADMIN', () => {
    const {wallet, burgerProvider} = setupGlobals()

    const connection = burgerProvider.provider.connection;
    let myNFts: any[] = [];

    it('Get all NFTs', async () => {
        myNFts = await EpNFTService.getT22NFTs(
            connection,
            PAYER_ADMIN.publicKey,
        );
        console.log("Number of NFTs", myNFts.length);
        expect(myNFts).to.not.be.empty;
    });

    it('Burn all', async () => {
        for (let i = 0; i < myNFts.length; i++) {
            const mint = myNFts[i].mint;
            console.log(`Burn ${i}:`, mint.toString())
            const ata = getAtaAddressPubkey(mint, wallet.publicKey);
            const {amount} = await getAccount(
                connection,
                getAtaAddressPubkey(mint, wallet.publicKey),
                undefined,
                TOKEN_2022_PROGRAM_ID
            );

            const ixs = []
            // Check amount is zero, if so we burn
            if (Number(amount) === 1) {
                ixs.push(
                    createBurnInstruction(
                        ata,
                        mint,
                        wallet.publicKey,
                        1,
                        undefined,
                        TOKEN_2022_PROGRAM_ID
                    ),
                )
            }

            // not closing mint account cus we might not have the authority to do in case of WNS nft
            ixs.push(
                createCloseAccountInstruction(
                    ata,
                    wallet.publicKey,
                    wallet.publicKey,
                    undefined,
                    TOKEN_2022_PROGRAM_ID
                )
            )
            await sendAndConfirmRawTransaction(
                burgerProvider.provider.connection, new Transaction().add(...ixs), wallet.publicKey, wallet, []
            );
        }
    });
});
