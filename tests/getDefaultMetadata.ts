export const SDK_TEST_VERSION = "2.0";

interface MetadataPropsReturn {
    expiryDate: string,
    symbol: string,
    name: string,
    uri: string
}

interface MetadataProps {
    timestamp?: string,
}
export function getDefaultMetadata({
    timestamp
}: MetadataProps): MetadataPropsReturn {
    // 1 hr
    const expiryDate = timestamp ?? (Math.floor((new Date()).getTime() / 1000) + 3600).toString()

    return {
        expiryDate: expiryDate,
        name: `(SDK tests ${SDK_TEST_VERSION}) epBurger`,
        symbol: "EP",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
    }
}