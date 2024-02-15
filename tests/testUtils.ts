import {CONNECTION} from "./setup";
import {
    CoreProvider,
    EpplexProvider,
    sendAndConfirmRawTransaction
} from "../src";

// TODO these prolly need to be more generic
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

            console.log("Global collection config data", globalCollectionData)
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
            console.log("Program Delegate Data", burgerDelegateData)
        } catch (e) {
            const tx = await provider.createProgramDelegateTx();
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        }
    })
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}