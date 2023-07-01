import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { checkIsDirectory,checkIsFile } from '../utils/utils.js';

export const decompress = async (command, currentPath) => {
  try {
    const params = command.trim().split('compress ')[1];
    const fileToDecompress = params.split(' ')[0];
    const directoryToDecompress = params.split(' ')[1];
    const fileToDecompressPath = path.isAbsolute(fileToDecompress) ? fileToDecompress : path.join(currentPath, fileToDecompress);
    const directoryToDecompressPath = path.isAbsolute(directoryToDecompress) ? directoryToDecompress : path.join(currentPath, directoryToDecompress);
    const fileName = path.isAbsolute(fileToDecompress) ? path.basename(fileToDecompress) : fileToDecompress;
    const decompressedFilePath = path.join(directoryToDecompressPath, fileName.slice(0, -3));
    const isFile = await checkIsFile(fileToDecompressPath);
    const isDirectory = await checkIsDirectory(directoryToDecompressPath);

    if (isFile && isDirectory) {
      const readStream = fs.createReadStream(fileToDecompressPath);
      const writeStream = fs.createWriteStream(decompressedFilePath);
      const brotli = zlib.createBrotliDecompress();
      const stream = readStream.pipe(brotli).pipe(writeStream);

      stream.on('finish', () => {
        console.log(`File ${fileToDecompress} decompressed into ${decompressedFilePath}`);
        console.log(`\nYou are currently in ${currentPath}\n`);
      });

      stream.on('error', () => {
        console.log('Operation failed');
        console.log(`\nYou are currently in ${currentPath}\n`);
      });
    }
  } catch (e) {
    console.log('Operation failed');
    console.log(`\nYou are currently in ${currentPath}\n`);
  }
}