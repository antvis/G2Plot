import { Bar } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar legend', () => {
  it('no legend config', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    bar.render();

    expect(bar.chart.getOptions().legends).toEqual(false);

    bar.destroy();
  });

  it('legend config', () => {
    const bar = new Bar(createDiv('grouped bar'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      isGroup: true,
    });

    bar.render();
    // @ts-ignore
    expect(bar.chart.getOptions().legends.series).toEqual({ position: 'right-top' });
    expect(bar.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);

    bar.update({
      ...bar.options,
      legend: {
        flipPage: true,
      },
    });

    // @ts-ignore
    expect(bar.chart.getOptions().legends.series).toEqual({
      position: 'right-top',
      flipPage: true,
    });
    expect(bar.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);

    bar.update({
      ...bar.options,
      legend: false,
    });

    expect(bar.chart.getOptions().legends).toEqual(false);
    expect(bar.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(0);

    bar.destroy();
  });
});
