import {CONNECTION} from "./utils/setup";
import {
    CoreProvider,
    EpplexProvider,
    sendAndConfirmRawTransaction
} from "../src";
import WenProvider from "../src/WenProvider";
import {expect} from "chai";

export function trySetupGlobalCollectionConfig(
    provider: CoreProvider,
    wallet,
    connection = CONNECTION,
) {
    it('Try create global collection config', async () => {
        try {
            const globalCollectionData = await provider
                .program
                .account
                .globalCollectionConfig
                .fetch(provider.getGlobalCollectionConfig());

            // console.log("Global collection config data", globalCollectionData)
        } catch (e) {
            const tx = await provider.createGlobalCollectionConfigTx();
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        }
    });
}

export function trySetupBurgerProgramDelegate(
    provider: EpplexProvider,
    wallet,
    connection = CONNECTION,
) {
    it("Try create burger delegate ", async() => {
        try {
            const burgerDelegateData = await provider
                .program
                .account
                .programDelegate
                .fetch(provider.getProgramDelegate());
            // console.log("Program Delegate Data", burgerDelegateData)
        } catch (e) {
            const tx = await provider.createProgramDelegateTx();
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        }
    })
}


export function trySetupGameConfig(
    provider: EpplexProvider,
    wallet,
    connection = CONNECTION,
) {
    it("Try create game config ", async() => {
        try {
            const gameConfig = await provider
                .program
                .account
                .gameConfig
                .fetch(provider.getGameConfig());
        } catch (e) {
            const tx = await provider.gameCreateTx();
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        }
    })
}

export function trySetupManagerAccount(
    provider: WenProvider,
    wallet,
    connection = CONNECTION,
) {
    it("Try init manager account ", async() => {
        const acc = await provider.getManagerAccount();
        // Manager account already exists
        if (acc !== undefined) {
            return;
        }

        const tx = await provider.initManagerAccountTx();
        const ix = await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        expect(ix).to.be.not.empty;
    })
}

