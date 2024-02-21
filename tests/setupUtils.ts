import {CONNECTION, getSetup} from "./setup";
import {
    CoreProvider,
    EpplexProvider,
    sendAndConfirmRawTransaction
} from "../src";

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
            console.log("Game config", gameConfig)
        } catch (e) {
            const tx = await provider.gameCreateTx();
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        }
    })
}


