import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe.skip('sankey', () => {
  it('nodeDepth', () => {
    const ALIPAY_DATA = [
      { source: 'A', target: 'B', value: 160 },
      { source: 'B', target: 'C', value: 10 },
      { source: 'C', target: 'D', value: 8 },
      { source: 'E', target: 'D', value: 27 },
    ];

    const sankey = new Sankey(createDiv(), {
      height: 500,
      data: ALIPAY_DATA,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeDepth: (node) => {
        switch (node.name) {
          case 'A':
            return 1;
          case 'B':
            return 0;
          case 'C':
            return 2;
          case 'D':
            return 2;
          // case 'E':
          //   return 2;
        }
        return node.depth;
      },
    });

    sankey.render();

    const elements = sankey.chart.views[1].geometries[0].elements;
    // a 在 b 的右侧
    // @ts-ignore
    expect(elements[0].data.x[0]).toBeGreaterThan(elements[1].data.x[0]);

    // a === e
    // @ts-ignore
    expect(elements[4].data.x[0]).toBe(elements[1].data.x[0]);

    // c === d
    // @ts-ignore
    expect(elements[2].data.x[0]).toBe(elements[3].data.x[0]);

    sankey.destroy();
  });
});
