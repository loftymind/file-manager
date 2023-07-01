import os from 'os';

export const getCPU = async () => {
  const cpusCount = os.cpus().length;
  const cpusModel = os.cpus()[0].model;
  console.log(`Total CPUs count: ${cpusCount}`);
  console.log(`CPU model: ${cpusModel}`);
  console.log(os.cpus().map(cpu => ({
    model: cpu.model,
    speed: cpu.speed > 1000 ? cpu.speed / 1000 + ' GHz' : cpu.speed / 10 + ' GHz'
  })));
}

export const getCPUArchitecture = async () => {
  console.log(`Operating system CPU architecture: ${os.arch()}`);
}

export const getCurrentUserNameOS = async () => {
  console.log(process.env.USERNAME);
}

export const getEOL = async () => {
  console.log(`End of line: ${JSON.stringify(os.EOL)}`);
}
export const getHomeDir = async () => {
    return os.homedir();
  }