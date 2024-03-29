import {setupGlobals} from "./utils/setup";
import {expect} from "chai";
import {EpNFTService, sendAndConfirmRawTransaction} from "../src";
import {PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";
function getTransactionSize(payer: PublicKey, ixns: TransactionInstruction[]){
    const encodeLength = (len: number) => {
        const bytes = new Array<number>();
        let remLen = len;
        for (;;) {
            let elem = remLen & 0x7f;
            remLen >>= 7;
            if (remLen === 0) {
                bytes.push(elem);
                break;
            } else {
                elem |= 0x80;
                bytes.push(elem);
            }
        }
        return bytes;
    };

    const reqSigners = ixns.reduce((signers, ixn) => {
        ixn.keys.map((a) => {
            if (a.isSigner) {
                signers.add(a.pubkey.toBase58());
            }
        });
        return signers;
    }, new Set<string>());

    // need to include the payer as a signer
    if (!reqSigners.has(payer.toBase58())) {
        reqSigners.add(payer.toBase58());
    }

    const txn = new Transaction({
        feePayer: PublicKey.default,
        blockhash: "1".repeat(32),
        lastValidBlockHeight: 200000000,
    }).add(...ixns);

    const txnSize =
        txn.serializeMessage().length +
        reqSigners.size * 64 +
        encodeLength(reqSigners.size).length;

    return txnSize;
}


describe('Reset all tokens in PAYER_ADMIN', () => {
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

    it('Reset all tokens', async () => {
        const ixs = [];
        const batchSize = 5; // Number of iterations after which transaction will be executed

        for (let i = 0; i < myNFts.length; i++) {
            const mint: PublicKey = myNFts[i].mint;

            // TODO paste collectionMint in here, excludes the collection mint
            if (mint.toString() === "GgvNcNBDFyayh3EW4HXBvGBeQtLsxzUE7rgBK8gVUJ8M") {
                continue
            }

            const tx = await burgerProvider.tokenGameResetTx({mint});
            ixs.push(...tx.instructions);

            // Check if the current iteration is a multiple of the batch size
            if ((i + 1) % batchSize === 0 || i === myNFts.length - 1) {
                // If it's the 5th iteration or the last iteration, execute the transaction
                const finalTx = new Transaction().add(...ixs)

                // 5 reset instructions equates to 618, max size is 1238, so we could prolly pack 10 vote ixs into one tx
                console.log("tx size", getTransactionSize(wallet.publicKey, finalTx.instructions))

                const id = await sendAndConfirmRawTransaction(connection, finalTx, wallet.publicKey, wallet, []);
                // Clear instructions array for the next batch
                ixs.length = 0;
            }
        }
    });

    // make a function that prints game state
});
