import * as fs from 'fs';
import path from 'path';

const DEMO_DIR = path.resolve(__dirname, `../../__tests__/integration/plots`);

export const getSnapshotName = () => {
  const files = fs.readdirSync(DEMO_DIR);
  return files.filter((filename) => filename !== 'index.ts');
};
