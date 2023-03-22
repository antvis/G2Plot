import path from 'path';
import { test, expect } from '@playwright/test';
import { createDiff, getSnapshotName, toHump, sleep } from '../utils';

const IMG_DIR = path.resolve(__dirname, '..', process.env.SNAPSHOTS_DIR as string);

const files = getSnapshotName();

test.afterAll(() => {
  createDiff();
});

test('Plot snapshots', async ({ page }) => {
  for (const filename of files) {
    const [name] = filename.split('.');
    await page.goto(`${process.env.HOST}/?name=${toHump(name)}`);
    await sleep(1000);
    await page.locator('.container').screenshot({ path: `${IMG_DIR}/${name}.png` });
  }
});
