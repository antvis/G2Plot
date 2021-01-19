import { BidirectionalBar } from '../../../../src';
import { SERIES_FIELD_KEY } from '../../../../src/plots/bidirectional-bar/constant';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional', () => {
  it('进行别名设置', () => {
    const bidirectional = new BidirectionalBar(createDiv('default'), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();

    expect(bidirectional.type).toEqual('bidirectional-bar');

    // @ts-ignore
    let scalePool = bidirectional.chart.scalePool;
    const scaleKeys = scalePool.syncScales.get(SERIES_FIELD_KEY);

    expect(scalePool.scales.get(scaleKeys[0]).scaleDef.formatter('2016年耕地总面积')).toBe('2016年耕地总面积');
    expect(scalePool.scales.get(scaleKeys[1]).scaleDef.formatter('2016年转基因种植面积')).toBe('2016年转基因种植面积');

    bidirectional.update({
      meta: {
        '2016年耕地总面积': {
          alias: 'a',
        },
        '2016年转基因种植面积': {
          alias: 'b',
        },
      },
    });

    // @ts-ignore
    scalePool = bidirectional.chart.scalePool;
    expect(scalePool.scales.get(scaleKeys[0]).scaleDef.formatter('2016年耕地总面积')).toBe('a');
    expect(scalePool.scales.get(scaleKeys[1]).scaleDef.formatter('2016年转基因种植面积')).toBe('b');

    bidirectional.destroy();
  });
});
