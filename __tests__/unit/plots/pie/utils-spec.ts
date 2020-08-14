import { Pie } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { getStatisticData, getTotalValue, parsePercentageToNumber } from '../../../../src/plots/pie/utils';

describe('utils of pie plot', () => {
  const data = [
    { type: 'item1', value: 10 },
    { type: 'item2', value: 10 },
    { type: 'item3', value: 10 },
  ];
  it('getTotalValue: normal', () => {
    expect(getTotalValue(data, 'value')).toBe(30);
    expect(getTotalValue([...data, { type: 'item4', value: -1 }], 'value')).toBe(29);
  });

  it('getTotalValue: with string', () => {
    expect(getTotalValue([...data.slice(0, 2), { type: 'item3', value: '10' }], 'value')).toBe(20);
  });

  it('getTotalValue: with null or undefined', () => {
    expect(getTotalValue([...data.slice(0, 2), { type: 'item3', value: null }], 'value')).toBe(20);
    expect(getTotalValue([...data.slice(0, 2), { type: 'item3', value: undefined }], 'value')).toBe(20);
    expect(
      getTotalValue(
        [
          { type: 'item1', value: null },
          { type: 'item3', value: null },
        ],
        'value'
      )
    ).toBe(null);
    expect(
      getTotalValue(
        [
          { type: 'item1', value: undefined },
          { type: 'item3', value: undefined },
        ],
        'value'
      )
    ).toBe(null);
    expect(
      getTotalValue(
        [
          { type: 'item1', value: null },
          { type: 'item3', value: undefined },
        ],
        'value'
      )
    ).toBe(null);
  });

  it('getStatisticData: 单色饼图', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      angleField: 'value',
      radius: 0.8,
    });

    pie.render();
    const angleScale = pie.chart.getScaleByField('value');
    const colorScale = pie.chart.getScaleByField('');
    expect(getStatisticData({ value: 20 }, angleScale, colorScale)).toEqual({ title: null, value: '20' });
  });

  it('getStatisticData: 带 colorField', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data: [
        { type: 'item1', value: 20 },
        { type: 'item2', value: 20 },
      ],
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
    });

    pie.render();
    const angleScale = pie.chart.getScaleByField('value');
    const colorScale = pie.chart.getScaleByField('type');
    expect(getStatisticData({ type: 'item1', value: 20 }, angleScale, colorScale)).toEqual({
      title: 'item1',
      value: '20',
    });
  });

  it('将 字符串百分比 转换为 数值型百分比', () => {
    // @ts-ignore 不合法的入参
    expect(parsePercentageToNumber(null)).toBe(null);
    // @ts-ignore 不合法的入参
    expect(parsePercentageToNumber(100)).toBe(100);
    expect(parsePercentageToNumber('0.35')).toBe(0.35);
    expect(parsePercentageToNumber('34%')).toBe(0.34);
    expect(parsePercentageToNumber('0%')).toBe(0);
  });
});
