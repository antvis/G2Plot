import { Column, Bar } from '../../src';
import { createDiv } from '../utils/dom';

const data = [
  {
    groupName: '金额',
    value: 30.14,
    name: 'A',
  },
  {
    groupName: '数值',
    value: 345784,
    name: 'A',
  },
  {
    groupName: '金额',
    value: 10,
    name: 'B',
  },
  {
    groupName: '数值',
    value: 10941,
    name: 'B',
  },
  {
    groupName: '金额',
    value: 19,
    name: 'B_1',
  },
  {
    groupName: '数值',
    value: 191245,
    name: 'B_1',
  },
  {
    groupName: '金额',
    value: 2.22,
    name: 'B_3',
  },
  {
    groupName: '数值',
    value: 2124,
    name: 'B_3',
  },
  {
    groupName: '金额',
    value: 9.99,
    name: 'C',
  },
  {
    groupName: '数值',
    value: 9841,
    name: 'C',
  },
  {
    groupName: '金额',
    value: 13,
    name: 'C_1',
  },
  {
    groupName: '数值',
    value: 124240,
    name: 'C_1',
  },
  {
    groupName: '金额',
    value: 20,
    name: 'C_2',
  },
  {
    groupName: '数值',
    value: 241284,
    name: 'C_2',
  },
  {
    groupName: '金额',
    value: 12,
    name: 'D',
  },
  {
    groupName: '数值',
    value: 2398,
    name: 'D',
  },
  {
    groupName: '金额',
    value: 12,
    name: 'D_1',
  },
  {
    groupName: '数值',
    value: 21120,
    name: 'D_1',
  },
  {
    groupName: '金额',
    value: 10.01,
    name: 'D_2',
  },
  {
    groupName: '数值',
    value: 13578,
    name: 'D_2',
  },
  {
    groupName: '金额',
    value: 41.21,
    name: 'D_3',
  },
  {
    groupName: '数值',
    value: 41805,
    name: 'D_3',
  },
  {
    groupName: '金额',
    value: 100,
    name: 'D_4',
  },
  {
    groupName: '数值',
    value: 13,
    name: 'D_4',
  },
  {
    groupName: '金额',
    value: 101,
    name: 'D_5',
  },
  {
    groupName: '数值',
    value: 129,
    name: 'D_5',
  },
  {
    groupName: '金额',
    value: 1000,
    name: 'D_6',
  },
  {
    groupName: '数值',
    value: 8,
    name: 'D_6',
  },
  {
    groupName: '金额',
    value: 12,
    name: 'E',
  },
  {
    groupName: '数值',
    value: 21123,
    name: 'E',
  },
  {
    groupName: '金额',
    value: 19,
    name: 'E_1',
  },
  {
    groupName: '数值',
    value: 199865,
    name: 'E_1',
  },
];

describe('#2105', () => {
  test('percent column, yAxis max tick should be 1', async () => {
    const plot = new Column(createDiv(), {
      data,
      xField: 'name',
      yField: 'value',
      seriesField: 'groupName',
      isPercent: true,
      isStack: true,
    });

    plot.render();

    expect(plot.chart.getYScales()[0].min).toBe(0);
    expect(plot.chart.getYScales()[0].minLimit).toBe(0);
    expect(plot.chart.getYScales()[0].max).toBe(1);
    expect(plot.chart.getYScales()[0].maxLimit).toBe(1);
    expect(
      plot.chart
        .getYScales()[0]
        .getTicks()
        .map((t) => t.tickValue)
    ).toEqual([0, 0.25, 0.5, 0.75, 1]);

    plot.destroy();
  });

  test('percent bar, yAxis max tick should be 1', async () => {
    const plot = new Bar(createDiv(), {
      data,
      xField: 'value',
      yField: 'name',
      seriesField: 'groupName',
      isPercent: true,
      isStack: true,
    });

    plot.render();

    expect(plot.chart.getYScales()[0].min).toBe(0);
    expect(plot.chart.getYScales()[0].minLimit).toBe(0);
    expect(plot.chart.getYScales()[0].max).toBe(1);
    expect(plot.chart.getYScales()[0].maxLimit).toBe(1);
    expect(
      plot.chart
        .getYScales()[0]
        .getTicks()
        .map((t) => t.tickValue)
    ).toEqual([0, 0.25, 0.5, 0.75, 1]);

    plot.destroy();
  });
});
