import * as fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const STABLE = 'stable';

const DIFF = 'diff';

const maxError = 0;

const IMG_DIR = path.resolve(__dirname, `../${process.env.SNAPSHOTS_DIR}`);

export const createDiff = async () => {
  const files = fs.readdirSync(IMG_DIR);
  files.forEach((filename) => {
    if (filename.endsWith(`${STABLE}.png`) || filename.endsWith(`${DIFF}.png`)) return;
    diffFile(IMG_DIR, filename);
  });
};

/**
 * diff between PNGs
 */
const diffFile = (filePath: string, filename: string) => {
  const [name, type] = filename.split('.');
  // 当前截图生成的图片
  const testSnapshotFile = `${filePath}/${filename}`;
  // 用于下次比对的图片
  const stableFile = `${filePath}/${name}-${STABLE}.${type}`;
  // diff 文件
  const diffFile = `${filePath}/${name}-${DIFF}.${type}`;
  // 不存在时直接写入
  if (!fs.existsSync(stableFile)) {
    fs.copyFileSync(testSnapshotFile, stableFile);
    return;
  }

  const snap = PNG.sync.read(fs.readFileSync(testSnapshotFile));
  const stable = PNG.sync.read(fs.readFileSync(stableFile));
  const { width, height } = snap;

  const diff = new PNG({ width, height });

  // @see https://github.com/mapbox/pixelmatch#pixelmatchimg1-img2-output-width-height-options
  const mismatch = pixelmatch(snap.data, stable.data, diff.data, width, height, {
    threshold: 0.1,
  });

  if (mismatch > maxError) {
    fs.writeFileSync(diffFile, PNG.sync.write(diff));
  } else {
    try {
      fs.unlinkSync(diffFile);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
};
