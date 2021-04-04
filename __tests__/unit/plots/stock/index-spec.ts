import { Stock } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';
import { DEFAULT_OPTIONS } from '../../../../src/plots/stock/constant';

describe('Stock', () => {
  it('x*y', () => {
    const k = new Stock(createDiv('x*y'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        date: {
          mask: 'YYYY',
        },
      },
    });

    k.render();

    const geometry = k.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 自定义图形标记
    expect(geometry.type).toBe('schema');
    // @ts-ignore
    expect(geometry.attributeOption.shape.fields[0]).toBe('candle');

    // 图形元素个数
    expect(k.chart.geometries[0].elements.length).toBe(kdata.length);
    // x & range
    expect(positionFields).toHaveLength(2);

    k.destroy();
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Stock.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
