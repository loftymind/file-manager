import fs from 'fs';
import path from 'path';

export const rn = async (command, currentPath) => {
  try {
    const params = command.trim().split('rn ')[1];
    const oldFileName = params.split(' ')[0];
    const newFileName = params.split(' ')[1];
    const oldFilePath = path.isAbsolute(oldFileName) ? oldFileName : path.join(currentPath, oldFileName);
    const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

    fs.promises.rename(oldFilePath, newFilePath).then(() => {
      console.log(`File ${path.basename(oldFileName)} renamed to ${newFileName}`);
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