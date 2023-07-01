import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { checkIsDirectory,checkIsFile } from '../utils/utils.js';

export const compress = async (command, currentPath) => {
  try {
    const params = command.trim().split('compress ')[1];
    const fileToCompress = params.split(' ')[0];
    const directoryToCompress = params.split(' ')[1];
    const fileToCompressPath = path.isAbsolute(fileToCompress) ? fileToCompress : path.join(currentPath, fileToCompress);
    const directoryToCompressPath = path.isAbsolute(directoryToCompress) ? directoryToCompress : path.join(currentPath, directoryToCompress);
    const fileName = path.isAbsolute(fileToCompress) ? path.basename(fileToCompress) : fileToCompress;
    const compressedFilePath = path.join(directoryToCompressPath, fileName + '.br');
  
    const isFile = await checkIsFile(fileToCompressPath);
    const isDirectory = await checkIsDirectory(directoryToCompressPath);

    if (isFile && isDirectory) {
      const readStream = fs.createReadStream(fileToCompressPath);
      const writeStream = fs.createWriteStream(compressedFilePath);
      const brotli = zlib.createBrotliCompress();
      const stream = readStream.pipe(brotli).pipe(writeStream);

      stream.on('finish', () => {
        console.log(`File ${fileToCompress} compressed into ${compressedFilePath}`);
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