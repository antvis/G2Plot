import * as fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const log = console.log;

const DEMO_DIR = path.resolve(__dirname, `../snapshots`);

export const logDiff = () => {
  const files = fs.readdirSync(DEMO_DIR);
  const diffs = files.filter((filename) => filename.endsWith('-diff.png'));
  if (diffs.length) {
    diffs.forEach((filename) => {
      log(chalk.red('modified: ', filename));
    });
    log(
      chalk.red.bold(
        `Snapshots diff: ${diffs.length}, please check the snapshots folder. if you think is right, you can delete e2e/snapshots folder, and run test again.`,
      ),
    );
  }
};
