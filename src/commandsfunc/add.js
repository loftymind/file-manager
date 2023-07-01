import fs from 'fs';
import path from 'path';

export const add = async (command, currentPath) => {
  try {
    const fileName = command.trim().split('add ')[1];
    const filePath = path.join(currentPath, fileName);

    const writeStream = fs.createWriteStream(filePath);

    writeStream.on('close', () => {
      console.log(`File ${fileName} created`);
      console.log(`\nYou are currently in ${currentPath}\n`);
    });

    writeStream.on('error', () => {
      console.log('\nOperation failed');
      console.log(`\nYou are currently in ${currentPath}\n`);
    });

    writeStream.close();

  } catch (e) {
    console.log('\nOperation failed');
    console.log(`\nYou are currently in ${currentPath}\n`);
  }
}