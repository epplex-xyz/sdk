import {DEFAULT_NFT_NAME, SDK_TEST_VERSION} from "./setup";


interface MetadataPropsReturn {
    expiryDate: string,
    symbol: string,
    name: string,
    uri: string
}

interface MetadataProps {
    timestamp?: string,
    name?: string
}
export function getDefaultMetadata({
    timestamp,
    name
}: MetadataProps): MetadataPropsReturn {
    // 1 hr
    const expiryDate = timestamp ?? (Math.floor((new Date()).getTime() / 1000) + 3600).toString()

    return {
        expiryDate: expiryDate,
        name: `SDK ${SDK_TEST_VERSION} ${DEFAULT_NFT_NAME} ${name ?? ""}`,
        symbol: "EP",
        uri: "https://arweave.net/nVRvZDaOk5YAdr4ZBEeMjOVhynuv8P3vywvuN5sYSPo"
    }
}