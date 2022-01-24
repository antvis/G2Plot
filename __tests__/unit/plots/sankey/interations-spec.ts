import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { ALIPAY_DATA } from '../../../data/sankey-energy';

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

    expect(Object.keys(sankey.chart.views[0].interactions)[0]).toBe('element-single-selected');
    expect(Object.keys(sankey.chart.views[1].interactions)[0]).toBe('element-highlight');

    sankey.update({
      edgeInteractions: [{ type: 'element-single-selected', enable: false }],
      nodeInteractions: [{ type: 'element-highlight', enable: false }],
    });

    expect(sankey.chart.views[0].interactions).toEqual({});
    expect(sankey.chart.views[1].interactions).toEqual({});

    sankey.destroy();
  });
});
