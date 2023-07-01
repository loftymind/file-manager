import fs from 'fs';
import path from 'path';
import { checkIsFile } from '../utils/utils.js';

export const cat = async (command, currentPath) => {
  try {
  const params = command.trim().split('cat ')[1];
  const filePath = path.isAbsolute(params) ? params : path.join(currentPath, params);
  
  return await fs.promises.access(filePath).then(async () => {
    const isFile = await checkIsFile(filePath);
    const readStream = fs.createReadStream(filePath);
    let data = [];

        if (isFile) {
          readStream.on('data', (chunk) => {
            data.push(chunk.toString());
          });

          readStream.on('end', () => {
            console.log(data.join(''));
            console.log(`\nYou are currently in ${currentPath}\n`);
          });

          readStream.on('error', () => {
            console.log('\nOperation failed');
          });
        } 
      })
    }
    catch (e) {
      console.log('\nOperation failed');
    }
  }