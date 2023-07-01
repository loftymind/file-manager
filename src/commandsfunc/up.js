import path from 'path';

export const up = async (currentPath) => {
  const currentPathArray = currentPath.trim().split(path.sep);
  const newPath = currentPathArray.slice(0, currentPathArray.length - 1).join(path.sep);
  if (currentPathArray.length <= 2) {
    console.log(`\nYou are currently in ${currentPath}\n`);
    return `${currentPathArray[0]}${path.sep}`;
  }
  console.log(`\nYou are currently in ${newPath}\n`);
  return newPath;
}