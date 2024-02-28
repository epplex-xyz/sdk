import * as crypto from "crypto";

type KeyType = "public" | "private";

type Context = "browser" | "node";

const DEFAULT_CONTEXT: Context = "browser"

function getBrowserContext(context: Context) {
    if (typeof window === 'undefined') {
        throw new Error('Cannot execute crypto module in non-browser context.');
    }
    let cryptoObject: Crypto | any;
    if (context === "browser") {
        cryptoObject = window.crypto;
    } else {
        cryptoObject = crypto;
    }

    return cryptoObject
}

async function encrypt(data: string, key: CryptoKey, context = DEFAULT_CONTEXT): Promise<string> {
    const cryptoObject = getBrowserContext(context);

    const encoded = new TextEncoder().encode(data);
    const encrypted = await cryptoObject.subtle.encrypt(
        { name: "RSA-OAEP" },
        key,
        encoded
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

/**
 * Should decrypt only on server side
 */
async function decrypt(data: string, key: CryptoKey): Promise<string> {
    const decoded = atob(data);
    const arrayBuffer = new ArrayBuffer(decoded.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < decoded.length; i++) {
        uint8Array[i] = decoded.charCodeAt(i);
    }
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        key,
        arrayBuffer
    );
    return new TextDecoder().decode(decrypted);
}


async function generateNonce(size: number, context = DEFAULT_CONTEXT): Promise<string> {
    const cryptoObject = getBrowserContext(context);

    const array = new Uint8Array(size);
    cryptoObject.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
}


function ab2str(buf: ArrayBuffer): string {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}

function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

async function newKeyPair(size: number = 128, context = DEFAULT_CONTEXT): Promise<CryptoKeyPair> {
    const cryptoObject = getBrowserContext(context);

    return cryptoObject.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: size * 8,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
}

/**
 * Converts CryptoKey to a string
 */
async function exportKey(key: CryptoKey, keyType?: KeyType, context = DEFAULT_CONTEXT): Promise<string> {
    const cryptoObject = getBrowserContext(context);

    let type;
    if (keyType) {
        type = keyType
    } else {
        if (key.type !== "public" && key.type !== "private") {
            throw new Error("Invalid key type");
        }
        type = key.type
    }

    const format = type === "public" ? "spki" : "pkcs8";
    const exported = await cryptoObject.subtle.exportKey(format!, key);
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = btoa(exportedAsString);
    return exportedAsBase64;
}


/**
 * Usage: input public key as string
 *
 * @param key
 * @param keyType
 * @param context
 */
async function importKey(key: string, keyType: KeyType, context= DEFAULT_CONTEXT): Promise<CryptoKey> {
    const cryptoObject = getBrowserContext(context);

    const format = keyType === "public" ? "spki" : "pkcs8";
    const type = keyType === "public" ? "encrypt" : "decrypt";
    const importedAsString = atob(key);
    const importedAsArrayBuffer = str2ab(importedAsString);

    return cryptoObject.subtle.importKey(
        format,
        importedAsArrayBuffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        [type]
    );
}

export { newKeyPair, exportKey, importKey, ab2str, encrypt, decrypt, generateNonce};
