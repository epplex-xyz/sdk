export const SDK_TEST_VERSION = "2.0";

interface MetadataProps {
    expiryDate: string,
    symbol: string,
    name: string,
    uri: string
}

export const METADATA = (): MetadataProps => {
    return {
        expiryDate: (Math.floor((new Date()).getTime() / 1000) + 3600).toString(), // 1 hr
        name: `(SDK tests ${SDK_TEST_VERSION}) epBurger`,
        symbol: "EP",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
    }
}