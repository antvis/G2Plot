import chalk from 'chalk';

export const log = (message: string, color = 'green') => {
  return console.log(chalk[color](message));
};
