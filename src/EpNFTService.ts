import {Connection, PublicKey,} from "@solana/web3.js";
import {AccountLayout, getTokenMetadata} from "@solana/spl-token";
import {getTokenAccounts} from "./utils";
import {getTokenBurgerMetadata} from "./constants/seeds";
import {EpNFT} from "./types/EpplexProviderTypes";

/**
 * Wallet interface for objects that can be used to sign provider transactions.
 */

export interface epNFTOptions {
    metadata?: boolean
}

export const defaultEpNFTOptions: epNFTOptions = {
    metadata: true
}

class EpNFTService {
    static async getEpNFTs(owner: PublicKey, connection: Connection, opts: epNFTOptions = defaultEpNFTOptions): Promise<EpNFT[]> {
        const allTokenAccounts = await getTokenAccounts(connection, owner);

        const epNFTs: EpNFT[] = [];
        for (const [_, e] of allTokenAccounts.value.entries()) {
            // Get raw data
            const data = AccountLayout.decode(e.account.data);

            try {
                const isEligible = await this.isBurgerNFT(data.mint, connection)
                if (!isEligible) {
                    continue
                }

                const metadata = await getTokenMetadata(
                    connection,
                    data.mint
                );

                if (metadata !== null) {
                    if (opts.metadata) {
                        epNFTs.push({
                            ...data,
                            ...metadata
                        });
                    } else {
                        epNFTs.push({
                            ...data,
                        });
                    }
                }
            } catch (e) {
                // console.error("Failed to decode", e);
                continue;
            }
        }

        return epNFTs;
    }

    static async isBurgerNFT(mint: PublicKey, connection: Connection) : Promise <boolean> {
        // Get burger program metadata address
        const metadataPda = getTokenBurgerMetadata(mint);

        // Check if metadata exists - if not, it is not an epNFT
        const account = await connection.getAccountInfo(metadataPda);

        if (account === null) {
            return false
        } else {
            return true
        }
    }
}
export default EpNFTService;