import {setupGlobals} from "../utils/setup";
import {sleep} from "../utils/testUtils";
import {expect} from "chai";


describe("Testing Burger Program", () => {
    const { burgerProvider} = setupGlobals(false)

    it("Transfer NFT", async() => {
        const hash1 = await burgerProvider.provider.connection.getLatestBlockhash("confirmed")
        await sleep(5_000);
        const hash2 = await burgerProvider.provider.connection.getLatestBlockhash("confirmed")
        console.log("hash1", hash1)
        console.log("hash2", hash2)

        expect(hash1).to.be.equal(hash2);
    })
});

