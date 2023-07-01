import { getCPU,getEOL,getHomeDir,getCPUArchitecture,getCurrentUserNameOS } from './os.js';
export const selectOSParam = async (param, currentPath) => {
  const command = await getSelectedParams(param);
  switch (command) {
    case '--EOL': {
      await getEOL();
      console.log(`\nYou are currently in ${currentPath}\n`);
      break;
    }
    case '--cpus': {
      await getCPU();
      console.log(`\nYou are currently in ${currentPath}\n`);
      break;
    }
    case '--homedir': {
      const homeDir = await getHomeDir();
      console.log(`Home dir: ${homeDir}`); 
      console.log(`\nYou are currently in ${currentPath}\n`);
      break;
    }
    case '--username': {
      await getCurrentUserNameOS();
      console.log(`\nYou are currently in ${currentPath}\n`);
      break;
    }
    case '--architecture': {
      getCPUArchitecture();
      console.log(`\nYou are currently in ${currentPath}\n`);
      break;
    }
    default: {
      console.log('\nInvalid input');
      console.log(`\nYou are currently in ${currentPath}\n`);
    }
  }
}

export const getSelectedParams = async (command) => { 
  return command.toString().trim().split(' ')[1];
}