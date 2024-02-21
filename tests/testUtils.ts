import {CONNECTION} from "./setup";
import {
    CoreProvider,
    EpplexProvider,
    sendAndConfirmRawTransaction
} from "../src";
import fs from 'fs';

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

// Function to write data to file line by line
export function writeLinesToFile(lines: string[], filePath: string) {
    console.log("fs", __filename, __dirname, process.cwd())
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, ''); // Create an empty file
        }

        const fileStream = fs.createWriteStream(filePath, { flags: 'a' }); // 'a' flag for appending
        fileStream.on('error', (error) => {
            console.error('Error writing to file:', error);
        });
        lines.forEach(line => {
            fileStream.write(line + '\n');
        });
        fileStream.end();
        console.log('Data written to file successfully.');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}
