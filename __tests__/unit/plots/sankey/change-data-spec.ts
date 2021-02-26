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
    });

    sankey.render();
    await delay(50);
    sankey.changeData(ALIPAY_DATA);

    expect(sankey.options.data).toEqual(ALIPAY_DATA);
    expect(sankey.chart.views[0].getOptions().data.length).toBe(ALIPAY_DATA.length);

    sankey.destroy();
  });
});
