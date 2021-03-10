import { M, randomFloat } from 'miz';
import { sankey } from '../../../../../src/plots/sankey/sankey';
import { cutoffCircle } from '../../../../../src/plots/sankey/circle';
import { transformDataToNodeLinkData } from '../../../../../src/utils/data';

const C = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'K',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'Z',
  'Y',
  'Z',
];

describe('sankey', () => {
  it('monkey for deep', () => {
    const fn = jest.fn();
    window.console.error = fn;
    window.console.warn = fn;
    window.console.log = fn;

    for (let i = 0; i < 100; i++) {
      const layout = sankey()
        .nodeWidth(0.008)
        // @ts-ignore
        .nodePadding(0.02)
        .nodeAlign((_, maxDepth) => randomFloat(0, maxDepth, 0))
        .extent([
          [0, 0],
          [1, 1],
        ]);

      const data = M.arrayOf(
        M.shape({
          source: M.oneOf(C),
          target: M.oneOf(C),
          value: M.number(1, 10),
        }),
        10,
        50
      ).mock();

      const sankeyLayoutInputData = transformDataToNodeLinkData(
        cutoffCircle(data, 'source', 'target'),
        'source',
        'target',
        'value'
      );

      // 不报错即可
      expect(() => {
        layout(sankeyLayoutInputData);
      }).not.toThrow();
    }
  });
});
