import { Sankey } from '../../src';
import { createDiv, removeDom } from '../utils/dom';
import { delay } from '../utils/delay';
import { PARALLEL_SET } from '../data/parallel-set';

describe('sankey', () => {
  const data = [];
  const keys = ['Survived', 'Sex', 'Age', 'Class'];
  PARALLEL_SET.forEach((d) => {
    keys.reduce((a, b) => {
      if (a && b) {
        data.push({
          source: d[a],
          target: d[b],
          value: d.value,
          path: `${d[keys[0]]} -> ${d[keys[1]]} -> ${d[keys[2]]} -> ${d[keys[3]]}`,
        });
      }
      return b;
    });
  });

  const dom = createDiv();
  const sankey = new Sankey(dom, {
    data: data.map((d) => ({ ...d, append: 'hello' })),
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
    rawFields: ['append'],
    nodeWidthRatio: 0.01,
    nodePaddingRatio: 0.03,
    nodeDraggable: true,
  });

  sankey.render();

  it('label', async () => {
    sankey.update({ label: { formatter: () => 'HELLO' } });
    await delay(300);
    expect(sankey.chart.views[1].geometries[0].labelsContainer.getChildByIndex(0).cfg.children[0].attr('text')).toBe(
      'HELLO'
    );
    // with rawFields
    sankey.update({ label: { formatter: ({ append }) => append } });
    await delay(300);
    expect(sankey.chart.views[1].geometries[0].labelsContainer.getChildByIndex(0).cfg.children[0].attr('text')).toBe(
      'hello'
    );
  });

  afterAll(() => {
    sankey.destroy();
    removeDom(dom);
  });
});
