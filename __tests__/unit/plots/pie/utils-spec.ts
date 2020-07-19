import { Pie } from '../../../../src';
import { getStatisticData, getTotalValue } from '../../../../src/plots/pie/utils';
import { createDiv } from '../../../utils/dom';

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
    expect(getStatisticData(pie.chart, [])).toEqual({ title: '总计', value: null });
    expect(getStatisticData(pie.chart, { value: 20 })).toEqual({ title: null, value: '20', color: undefined });
  });

  it('getStatisticData: 带 colorField', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
    });

    pie.render();
    expect(getStatisticData(pie.chart, [])).toEqual({ title: '总计', value: null });
    expect(getStatisticData(pie.chart, { type: 'item1', value: 20 })).toEqual({
      title: 'item1',
      value: '20',
      color: undefined,
    });
  });
});
