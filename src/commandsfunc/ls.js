import { readdir } from 'fs/promises'

export const ls = async (currentDir) => {
  const dirents = await readdir(currentDir, {withFileTypes: true});
  
  let directories = [];
  let files = [];

  dirents.forEach(dirent => {
    if(dirent.isFile()) {
      files.push({Name: dirent.name, Type: 'file'})
    } else if (dirent.isDirectory()) {
      directories.push({Name: dirent.name, Type: 'directory'}) 
    }
  });
  function compareName (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }
  console.table([...directories.sort(compareName), ...files.sort(compareName)]);
}