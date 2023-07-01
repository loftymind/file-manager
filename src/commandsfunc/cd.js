import path from 'path';
import fs from 'fs';
import { up } from "./up.js";
import { checkIsFile } from '../utils/utils.js';

export const cd = async (command, currentPath) => {
  try {
    const params = command.trim().split('cd ')[1];
    const newPath = path.isAbsolute(params) ? params : path.join(currentPath, params);

    if (params === '..') {
      return up(currentPath);
    }

    return await fs.promises.access(newPath).then(async () => {
      if (newPath) {
        let isFile = await checkIsFile(newPath);
        if (isFile) {
          currentPath = currentPath;
          console.log(`\nYou are currently in ${currentPath}\n`);
          return currentPath;
        } else {
          currentPath = newPath;
          console.log(`\nYou are currently in ${currentPath}\n`);
          return currentPath;
        }
      }
    }).catch(() => {
      console.log('\nInvalid path');
      console.log(`\nYou are currently in ${currentPath}\n`);
      return currentPath;
    });
  } catch (e) {
    console.log('\nInvalid path');
    console.log(`\nYou are currently in ${currentPath}\n`);
    return currentPath;
  };
}