import { Sankey } from '../../../../src';
import { EDGES_VIEW_ID, NODES_VIEW_ID } from '../../../../src/plots/sankey/constant';
import { findViewById } from '../../../../src/utils';
import { ALIPAY_DATA } from '../../../data/sankey-energy';
import { createDiv } from '../../../utils/dom';

describe('sankey', () => {
  it('changeData', async () => {
    const data = ALIPAY_DATA.slice(0, ALIPAY_DATA.length - 5);
    const sankey = new Sankey(createDiv(), {
      height: 500,
      data,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      edgeInteractions: [{ type: 'element-single-selected', enable: true }],
      nodeInteractions: [{ type: 'element-highlight', enable: true }],
    });

    sankey.render();

    let nodeView = findViewById(sankey.chart, NODES_VIEW_ID);
    let edgeView = findViewById(sankey.chart, EDGES_VIEW_ID);
    expect(Object.keys(edgeView.interactions).includes('element-single-selected')).toBe(true);
    expect(Object.keys(nodeView.interactions).includes('element-single-selected')).toBe(false);
    expect(Object.keys(nodeView.interactions).includes('element-highlight')).toBe(true);
    expect(Object.keys(edgeView.interactions).includes('element-highlight')).toBe(false);

    sankey.update({
      edgeInteractions: [{ type: 'element-single-selected', enable: false }],
      nodeInteractions: [{ type: 'element-highlight', enable: false }],
    });

    nodeView = findViewById(sankey.chart, NODES_VIEW_ID);
    edgeView = findViewById(sankey.chart, EDGES_VIEW_ID);
    expect(Object.keys(edgeView.interactions).includes('element-single-selected')).toBe(false);
    expect(Object.keys(nodeView.interactions).includes('element-highlight')).toBe(false);

    sankey.destroy();
  });
});
