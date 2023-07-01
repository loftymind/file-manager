import fs from 'fs';
import path from 'path';
import { checkIsDirectory,checkIsFile } from '../utils/utils.js';

export const cp = async (command, currentPath) => {
  try {
    const params = command.trim().split('cp ')[1];
    const fileToCopy = params.split(' ')[0];
    const directoryToCopy = params.split(' ')[1];
    const fileToCopyPath = path.isAbsolute(fileToCopy) ? fileToCopy : path.join(currentPath, fileToCopy);
    const directoryToCopyPath = path.isAbsolute(directoryToCopy) ? directoryToCopy : path.join(currentPath, directoryToCopy);
    const newFilePath = !path.isAbsolute(fileToCopy) ? path.join(directoryToCopyPath, fileToCopy) : path.join(directoryToCopyPath, path.basename(fileToCopy));
    const isFile = await checkIsFile(fileToCopyPath);
    const isDirectory = await checkIsDirectory(directoryToCopyPath);

    if (isFile && isDirectory) {
      const readStream = fs.createReadStream(fileToCopyPath);
      const writeStream = fs.createWriteStream(newFilePath);

      readStream.pipe(writeStream).on('close', () => {
        console.log('File copied');
        console.log(`\nYou are currently in ${currentPath}\n`);
      });
    }
  } catch (e) {
    console.log('\nOperation failed');
    console.log(`\nYou are currently in ${currentPath}\n`);
  }
}