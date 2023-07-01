import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

export const getPath = async (url, filename) => {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, filename);
  return filePath;
};

export const getCurrentUserName = async () => {
  const args = process.argv;
  let userName = '';
  args.forEach((arg) => {
    if (arg.includes('--username')) {
      userName = arg.split('=')[1];
    }
  });
  return userName;
};
export const getCurrentCommand = async (command) => {
  return command.toString().trim().split(' ')[0];
};


export const checkIsFile = async (path) => {
  try {
    const stat = await fs.promises.lstat(path);
    return stat.isFile();
  } catch (err) {
    console.log('Operation failed');
  }
};
export const checkIsDirectory = async (path) => {
  
    try {
      const stat = await fs.promises.lstat(path);
      return stat.isDirectory();
    }
    catch (err) {
      console.log('Operation failed');
    }
  }


