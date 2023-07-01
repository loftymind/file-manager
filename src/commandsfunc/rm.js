import fs from 'fs';
import path from 'path';

export const rm = async (command, currentPath) => {
  try {
    const fileName = command.trim().split('rm ')[1];
    const filePath = path.isAbsolute(fileName) ? fileName : path.join(currentPath, fileName);

    fs.promises.unlink(filePath).then(() => {
      console.log(`File ${path.basename(filePath)} deleted`);
      console.log(`\nYou are currently in ${currentPath}\n`);
    }).catch(() => {
      console.log('\nOperation failed');
      console.log(`\nYou are currently in ${currentPath}\n`);
    });

  } catch (e) {
    console.log('\nOperation failed');
    console.log(`\nYou are currently in ${currentPath}\n`);
  }
}