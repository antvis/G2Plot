import { Candle } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata, SH000001 } from '../../../data/stock';

describe('Candle', () => {
  it('x*y', () => {
    const k = new Candle(createDiv('x*y'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
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
  });

  it('x*y xFieldFormat', () => {
    const k = new Candle(createDiv('xFieldFormat'), {
      width: 400,
      height: 500,
      data: SH000001,
      xField: 'trade_date',
      xFieldFormat: 'YYYYMMDD',
      yField: ['open', 'close', 'high', 'low'],
    });

    k.render();

    const geometry = k.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('schema');
    // 图形元素个数
    expect(k.chart.geometries[0].elements.length).toBe(SH000001.length);
    // x & range
    expect(positionFields).toHaveLength(2);
  });
});
