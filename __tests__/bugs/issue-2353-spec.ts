import { Sankey, Datum } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2353', () => {
  const DATA = [
    {
      source: 'n1',
      target: 'n2',
      weight: 5,
    },
    {
      source: 'n2',
      target: 'n3',
      weight: 3,
    },
    {
      source: 'n4',
      target: 'n5',
      weight: 8,
    },
  ];

  it('sankey depth config', () => {
    let maxDepth;
    const sankey = new Sankey(createDiv(), {
      data: DATA,
      padding: 0,
      appendPadding: 0,
      width: 500,
      height: 500,
      autoFit: false,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'weight',
      nodeDepth: (node: Datum, n) => {
        maxDepth = n;
        const { name } = node;
        return {
          n1: 0,
          n2: 1,
          n3: 2,
          n4: 1,
          n5: 2,
        }[name];
      },
    });

    sankey.render();

    expect(sankey.chart.views[1].geometries[0].elements[1].shape.getBBox().x).toBe(247.5);
    // 指定了 depth，所以 n4 节点的 x 是画布中间
    expect(sankey.chart.views[1].geometries[0].elements[3].shape.getBBox().x).toBe(247.5);

    expect(maxDepth).toBe(3);

    sankey.destroy();
  });
});
