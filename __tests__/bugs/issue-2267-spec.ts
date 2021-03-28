import { Sankey } from '../../src';
import { createDiv } from '../utils/dom';
import { ALIPAY_DATA } from '../data/sankey-energy';

describe('#2267', () => {
  const sankey = new Sankey(createDiv(), {
    data: ALIPAY_DATA,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
    nodeWidth: 16,
    nodePadding: 10,
  });

  sankey.render();

  it('sankey nodeWidth, nodePadding px configure', () => {
    const width = sankey.chart.views[1].geometries[0].container.getChildren()[0].getBBox().width;
    // 一定的误差
    expect(width > 12 && width < 20).toBe(true);
  });

  afterAll(() => {
    sankey.destroy();
  });
});
