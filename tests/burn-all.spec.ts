import {PAYER_ADMIN, setupGlobals} from "./utils/setup";

import {expect} from "chai";
import {EpNFTService} from "../lib";

/*
******* SETUP
*/

// 3 second expiry
const expiryTime = 3;
const expiryDate: string = (Math.floor((new Date()).getTime() / 1000) + expiryTime).toString()


const nTokens = 1
const collection = {
    collectionMintNme: "SDK Test",
    collectionMintSymbol: "SDK TEST",
    collectionMintUri: "https://example.com",
    collectionSize: nTokens,
}

describe('Test Burn All', () => {
    const {wallet, burgerProvider, coreProvider} = setupGlobals()

    let myNFts: any[] = [];

    it('Get all NFTs', async () => {
        myNFts = await EpNFTService.getEpNFTs(
            burgerProvider.provider.connection,
            PAYER_ADMIN.publicKey,
        );
        console.log("Number of NFTs", myNFts.length);
        expect(myNFts).to.not.be.empty;
    });

    // Unfinished


});
