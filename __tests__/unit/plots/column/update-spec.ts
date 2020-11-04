import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column update', () => {
  it('meta', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      meta: {
        sales: {
          nice: true,
        },
      },
    });

    column.render();

    expect(column.chart.getXScale().type).toBe('cat'); // 默认值

    column.update({
      meta: {
        area: {
          type: 'timeCat',
        },
      },
    });
    expect(column.chart.getXScale().type).toBe('timeCat');

    column.update({
      meta: {
        area: {
          type: 'cat',
        },
      },
    });
    expect(column.chart.getXScale().type).toBe('cat');
  });

  it('legend', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    column.render();

    expect(column.chart.getOptions().legends).toBe(false);

    column.update({
      seriesField: 'area',
      isStack: true,
      legend: {},
    });

    // @ts-ignore
    expect(column.chart.getOptions().legends.area).toEqual({ position: 'right-top' });

    column.update({
      seriesField: 'area',
      isStack: false,
      legend: {},
    });

    // @ts-ignore
    expect(column.chart.getOptions().legends.area).toEqual({ position: 'right-top' });

    column.update({
      seriesField: 'area',
      isStack: false,
      legend: false,
    });

    expect(column.chart.getOptions().legends).toBe(false);

    column.update({
      seriesField: undefined,
      legend: {},
    });

    expect(column.chart.getOptions().legends).toBe(false);
  });
});
