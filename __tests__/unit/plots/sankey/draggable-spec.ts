import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { ALIPAY_DATA } from '../../../data/sankey-energy';

describe('sankey', () => {
  it('nodeDraggable', () => {
    const data = ALIPAY_DATA.slice(0, ALIPAY_DATA.length - 5);
    const sankey = new Sankey(createDiv(), {
      height: 500,
      data,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeDraggable: true,
      nodeWidth: 32,
    });

    // @ts-ignore
    // window.sankey = sankey;

    sankey.render();

    expect(sankey.chart.interactions['sankey-node-draggable']).toBeDefined();
    // sankey.destroy();
  });
});
