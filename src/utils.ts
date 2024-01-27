// https://solana.stackexchange.com/questions/107/how-can-i-get-the-owner-wallet-of-an-nft-mint-using-web3-js
import {Connection, ParsedAccountData, PublicKey} from "@solana/web3.js";

export async function getMintOwner(connection: Connection, mint: PublicKey): Promise<PublicKey> {
    const largestAccounts = await connection.getTokenLargestAccounts(mint);
    const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address  //first element is the largest account, assumed with 1
    );

    if (largestAccountInfo.value === null){
        throw Error("Largest account does not exist");
    }

    const owner = (largestAccountInfo.value.data as ParsedAccountData).parsed.info.owner;

    return new PublicKey(owner);
}