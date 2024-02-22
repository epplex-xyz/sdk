import * as crypto from "crypto";

type KeyType = "public" | "private";

async function encrypt(data: string, key: CryptoKey): Promise<string> {
    const encoded = new TextEncoder().encode(data);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        key,
        encoded
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

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
async function generateNonce(size: number): Promise<string> {
    const array = new Uint8Array(size);
    window.crypto.getRandomValues(array);
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

async function newKeyPair(size: number): Promise<CryptoKeyPair> {
    return crypto.subtle.generateKey(
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

async function exportKey(key: CryptoKey): Promise<string> {
    const keyType = key.type;
    if (key.type !== "public" && key.type !== "private") {
        throw new Error("Invalid key type");
    }
    const format = keyType === "public" ? "spki" : "pkcs8";
    const exported = await window.crypto.subtle.exportKey(format!, key);
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = btoa(exportedAsString);
    return exportedAsBase64;
}

async function importKey(key: string, keyType: KeyType): Promise<CryptoKey> {
    const format = keyType === "public" ? "spki" : "pkcs8";
    const type = keyType === "public" ? "encrypt" : "decrypt";
    const importedAsString = atob(key);
    const importedAsArrayBuffer = str2ab(importedAsString);

    return window.crypto.subtle.importKey(
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
