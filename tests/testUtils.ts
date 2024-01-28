import fs from "fs";
import path from "path";
import {Keypair} from "@solana/web3.js";

const DEFAULT_KEY_DIR_NAME = ".local_keys";
export function loadOrGenerateKeypair(fileName: string, dirName: string = DEFAULT_KEY_DIR_NAME) {
    try {
        // compute the path to locate the file
        const searchPath = path.join(dirName, `${fileName}.json`);
        let keypair = Keypair.generate();

        // attempt to load the keypair from the file
        if (fs.existsSync(searchPath)) keypair = loadKeypairFromFile(searchPath);
        // when unable to locate the keypair, save the new one
        else saveKeypairToFile(keypair, fileName, dirName);

        return keypair;
    } catch (err) {
        console.error("loadOrGenerateKeypair:", err);
        throw err;
    }
}

export function loadKeypairFromFile(absPath: string) {
    if (!absPath) throw Error("No path provided");
    if (!fs.existsSync(absPath)) throw Error("File does not exist.");

    // load the keypair from the file
    const keyfileBytes = JSON.parse(fs.readFileSync(absPath, { encoding: "utf-8" }));
    // parse the loaded secretKey into a valid keypair
    const keypair = Keypair.fromSecretKey(new Uint8Array(keyfileBytes));
    return keypair;
}

export function saveKeypairToFile(
    keypair: Keypair,
    fileName: string,
    dirName: string = DEFAULT_KEY_DIR_NAME,
) {
    fileName = path.join(dirName, `${fileName}.json`);

    // create the `dirName` directory, if it does not exists
    if (!fs.existsSync(`./${dirName}/`)) fs.mkdirSync(`./${dirName}/`);

    // remove the current file, if it already exists
    if (fs.existsSync(fileName)) fs.unlinkSync(fileName);

    // write the `secretKey` value as a string
    fs.writeFileSync(fileName, `[${keypair.secretKey.toString()}]`, {
        encoding: "utf-8",
    });

    return fileName;
}