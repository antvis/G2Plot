import * as fs from 'fs';
import * as tests from './plots';
import { renderAndSaveCanvas, diff } from './canvas';
import { fetch } from './fetch';

// @ts-ignore
global.fetch = fetch;

describe('Charts', () => {
  // Filter tests with only.
  const onlyTests = Object.entries(tests).filter(
    // @ts-ignore
    ([, { only = false }]) => only,
  );
  const finalTests = onlyTests.length === 0 ? tests : Object.fromEntries(onlyTests);

  for (const [name, generateOptions] of Object.entries(finalTests)) {
    // @ts-ignore
    if (!generateOptions.skip) {
      it(`[Canvas]: ${name}`, async () => {
        let canvas;
        try {
          const actualPath = `${__dirname}/snapshots/${name}-actual.png`;
          const expectedPath = `${__dirname}/snapshots/${name}.png`;
          const diffPath = `${__dirname}/snapshots/${name}-diff.png`;
          const options = await generateOptions();
          // @ts-ignore
          const { mounted = false } = generateOptions;

          // Generate golden png if not exists.
          if (!fs.existsSync(expectedPath)) {
            console.warn(`! generate ${name}`);
            canvas = await renderAndSaveCanvas(options, expectedPath, mounted);
          } else {
            canvas = await renderAndSaveCanvas(options, actualPath, mounted);
            //@ts-ignore
            const maxError = generateOptions.maxError || 0;
            expect(diff(actualPath, expectedPath, diffPath, maxError)).toBeLessThanOrEqual(maxError);

            // Persevere the diff image if do not pass the test.
            fs.unlinkSync(actualPath);
          }
        } finally {
          if (canvas) canvas.destroy();
        }
      });
    }
  }

  afterAll(() => {
    // @ts-ignore
    delete global.fetch;
  });
});
