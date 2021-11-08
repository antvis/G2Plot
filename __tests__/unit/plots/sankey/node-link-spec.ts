import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('sankey', () => {
  it('dataType = nodeLink', () => {
    const ALIPAY_DATA = {
      nodes: [
        { id: 'A', name: 'A' },
        { id: 'B', name: 'B' },
        { id: 'C', name: 'C' },
        { id: 'D', name: 'D' },
        { id: 'E', name: 'E' },
        { id: 'F', name: 'F', fixedValue: 10 },
      ],
      links: [
        { source: 0, target: 1, value: 160 },
        { source: 1, target: 2, value: 10 },
        { source: 2, target: 3, value: 8 },
        { source: 4, target: 3, value: 27 },
      ],
    };

    const sankey = new Sankey(createDiv(), {
      height: 500,
      dataType: 'node-link',
      data: ALIPAY_DATA,
    });

    sankey.render();

    const elements = sankey.chart.views[1].geometries[0].elements;

    // F 元素会现实出来
    expect(elements.some((el) => el.getData().name === 'F')).toBe(true);

    sankey.destroy();
  });
});
