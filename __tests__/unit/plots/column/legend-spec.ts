import { Column } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column legend', () => {
  it('no legend config', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    column.render();

    expect(column.chart.getOptions().legends).toEqual(false);

    column.destroy();
  });

  it('legend config', () => {
    const column = new Column(createDiv('grouped column'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      isGroup: true,
    });

    column.render();
    // @ts-ignore
    expect(column.chart.getOptions().legends.series).toEqual({ position: 'top-left' });
    expect(column.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);

    column.update({
      ...column.options,
      legend: {
        flipPage: true,
      },
    });

    // @ts-ignore
    expect(column.chart.getOptions().legends.series).toEqual({
      position: 'top-left',
      flipPage: true,
    });
    expect(column.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);

    column.update({
      ...column.options,
      legend: false,
    });

    expect(column.chart.getOptions().legends).toEqual(false);
    expect(column.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(0);

    column.destroy();
  });
});
