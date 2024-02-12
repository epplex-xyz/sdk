import {getGlobalCollectionConfig} from "../src/constants/coreSeeds";
import {sendAndConfirmRawTransaction} from "../lib";
import {CONNECTION} from "./setup";
import {getProgramDelegate} from "../lib/constants/seeds";
import {CoreProvider, EpplexProvider} from "../src";

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
                .fetch(getGlobalCollectionConfig());

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
            const burgerDelegate = getProgramDelegate();
            const burgerDelegateData = await provider
                .program
                .account
                .programDelegate
                .fetch(burgerDelegate);
            console.log("Program Delegate Data", burgerDelegateData)
        } catch (e) {
            const tx = await provider.createProgramDelegateTx();
            await sendAndConfirmRawTransaction(connection, tx, wallet.publicKey, wallet, []);
        }
    })
}
