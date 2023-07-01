import * as readline from 'readline';
import { getCurrentUserName,getCurrentCommand } from './src/utils/utils.js';
import { selectOSParam } from './src/commandsfunc/osinf.js';
import { up } from './src/commandsfunc/up.js';
import { ls } from './src/commandsfunc/ls.js';
import { cd } from './src/commandsfunc/cd.js';
import { cat } from './src/commandsfunc/cat.js';
import { add } from './src/commandsfunc/add.js';
import { rn } from './src/commandsfunc/rn.js';
import { rm } from './src/commandsfunc/rm.js';
import { cp } from  './src/commandsfunc/cp.js';
import { mv } from './src/commandsfunc/mv.js';
import { hash } from './src/commandsfunc/hash.js';
import { compress } from './src/commandsfunc/compress.js';
import { decompress } from './src/commandsfunc/decompress.js';

import { getHomeDir } from './src/commandsfunc/os.js';


const rl = readline.createInterface({
  input: process.stdin
});

export const startApp = async () => {
  const userName = await getCurrentUserName();
  let currentPath = await getHomeDir();
  console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${currentPath}`);
  rl.on('line', async (input) => {
    let command = await getCurrentCommand(input);
    let argTrim = input.trim();
    switch (command) {
      case '.exit': {
        console.log(`Thank you for using File Manager, ${userName}!`);
        process.exit();
      }
      case 'up': {
        currentPath = await up(currentPath);
        break;
      }
      case 'cd': {
        currentPath = await cd(argTrim, currentPath);
        break;
      }
      case 'ls': {
        ls(currentPath);
        break;
      }
      case 'add': {
        await add(argTrim, currentPath);
        break;
      }
      case 'cat': {
        await cat(argTrim, currentPath);
        break;
      }
      case 'rn': {
        await rn(argTrim, currentPath);
        break;
      }
      case 'cp': {
        await cp(argTrim, currentPath);
        break;
      }
      case 'mv': {
        await mv(argTrim, currentPath);
        break;
      }
      case 'rm': {
        await rm(argTrim, currentPath);
        break;
      }
      case 'hash': {
        await hash(argTrim, currentPath);
        break;
      }
      case 'compress': {
        await compress(argTrim, currentPath);
        break;
      }
      case 'decompress': {
        await decompress(argTrim, currentPath);
        break;
      }
      case 'os': {
        await selectOSParam(input, currentPath);
        break;
      } 
      default: {
        console.log('\nInvalid input');
        console.log(`\nYou are currently in ${currentPath}\n`);
      }
    }
  });

  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
    process.exit();
  }); 

}

startApp();