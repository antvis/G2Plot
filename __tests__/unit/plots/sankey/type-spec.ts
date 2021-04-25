import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { ALIPAY_DATA } from '../../../data/sankey-energy';

describe('sankey', () => {
  it('scales nameType', async () => {
    const data = ALIPAY_DATA.slice(0, ALIPAY_DATA.length - 5);
    const sankey = new Sankey(createDiv(), {
      height: 500,
      data,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
    });

    expect(sankey.chart['options'].scales).toEqual(undefined);

    sankey.render();

    expect(sankey.chart['options'].scales.name).toEqual({ sync: 'color', type: 'cat' });

    sankey.destroy();
  });
});
