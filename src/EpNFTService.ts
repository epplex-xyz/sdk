import {Connection, PublicKey,} from "@solana/web3.js";
import {AccountLayout, getTokenMetadata, RawAccount} from "@solana/spl-token";
import {getTokenAccounts} from "./utils/generic";
import {getTokenBurgerMetadata} from "./constants/burgerSeeds";
import {EpNFT} from "./types/EpplexProviderTypes";
import {getMint} from "./constants";
import {BN} from "@coral-xyz/anchor";

export interface epNFTOptions {
    metadata?: boolean
    tokenAccount?: boolean
}

export const defaultEpNFTOptions: epNFTOptions = {
    metadata: true,
    tokenAccount: true
}

class EpNFTService {
    static async getEpNFTs(connection: Connection, owner: PublicKey, burgerProgramId?: PublicKey, opts: epNFTOptions = defaultEpNFTOptions, ): Promise<EpNFT[]> {
        const allTokenAccounts = await getTokenAccounts(connection, owner);

        const epNFTs: EpNFT[] = [];
        for (const [_, e] of allTokenAccounts.value.entries()) {
            // Get raw data
            const data = AccountLayout.decode(e.account.data);

            try {
                const isEligible = await this.isBurgerNFT(connection, data.mint, burgerProgramId)
                if (!isEligible) {
                    continue
                }

                const metadata = await getTokenMetadata(
                    connection,
                    data.mint
                );

                if (metadata !== null) {
                    const nftData = {
                        ...data
                    };

                    if (opts.metadata) {
                        Object.assign(nftData, {tokenMetadata: metadata});
                    }

                    if (opts.tokenAccount) {
                        Object.assign(nftData, {tokenAccount: e.pubkey});
                    }

                    epNFTs.push(nftData);
                }
            } catch (e) {
                // console.error("Failed to decode", e);
                continue;
            }
        }

        return epNFTs;
    }

    static async getT22NFTs(
        connection: Connection,
        owner: PublicKey,
    ): Promise<RawAccount[]> {
        const allTokenAccounts = await getTokenAccounts(connection, owner);

        const nfts: RawAccount[] = [];
        for (const [_, e] of allTokenAccounts.value.entries()) {
            // Get raw data
            const data = AccountLayout.decode(e.account.data);
            nfts.push(data);
        }

        return nfts;
    }

    static async isBurgerNFT(connection: Connection, mint: PublicKey, burgerProgramId?: PublicKey) : Promise <boolean> {
        // Get burger program metadata address
        const metadataPda = getTokenBurgerMetadata(mint, burgerProgramId);

        // Check if metadata exists - if not, it is not an epNFT
        const account = await connection.getAccountInfo(metadataPda);

        if (account === null) {
            return false
        } else {
            return true
        }
    }

    static async verifyInCollection(connection: Connection, mint: PublicKey): Promise<boolean> {
        try {
            const metadata = await getTokenMetadata(connection, mint);
            const collectionIdString = metadata!
                .additionalMetadata
                .find((m) => m[0] == "collection_id")![1];
            const mintCountString = metadata!
                .additionalMetadata
                .find((m) => m[0] == "mint_count")![1];

            const mintAddress = getMint(
                new BN(collectionIdString),
                new BN(mintCountString)
            );

            return mintAddress.toString() === mint.toString();
        } catch {
            return false;
        }
    }
}
export default EpNFTService;