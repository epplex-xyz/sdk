import fs from 'fs';

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
