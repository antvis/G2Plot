import path from 'path';
import { test, expect } from '@playwright/test';
import { createDiff, getSnapshotName, toHump, sleep, logDiff, log } from '../utils';

const IMG_DIR = path.resolve(__dirname, '..', process.env.SNAPSHOTS_DIR as string);

const files = getSnapshotName();

test.afterAll(() => {
  // 暂时保留，后续可以考虑删除
  // createDiff();
  // logDiff();
});

test('Plot snapshots', async ({ page }) => {
  for (const filename of files) {
    log(`screenshot: ${filename}`);
    const [name] = filename.split('.');
    await page.goto(`/?name=${toHump(name)}`);
    await sleep(500);
    if (process.env.updateSnapshot) {
      await page.locator('.container').screenshot({ path: `${IMG_DIR}/${name}.png` });
    }
    expect(await page.locator('.container').screenshot()).toMatchSnapshot({
      name: `${name}.png`,
      maxDiffPixels: 10,
    });
  }
});
