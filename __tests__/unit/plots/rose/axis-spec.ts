import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose axis', () => {
  it('meta', () => {
    const formatter = (v) => `${Math.floor(v / 10000)}万`;
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      meta: {
        sales: {
          nice: true,
          formatter,
        },
      },
    });

    rose.render();

    const geometry = rose.chart.geometries[0];
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
    expect(geometry.scales.sales.formatter).toBe(formatter);
  });

  it('xAxis', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      xAxis: {
        label: {
          rotate: -Math.PI / 2,
        },
      },
    });

    rose.render();
    const axisOptions = rose.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.area.label.rotate).toBe(-Math.PI / 2);
  });

  it('yAxis', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      yAxis: {
        minLimit: 10000,
        nice: true,
      },
    });

    rose.render();

    const geometry = rose.chart.geometries[0];
    const axisOptions = rose.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.sales.minLimit).toBe(10000);
    expect(geometry.scales.sales.minLimit).toBe(10000);
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
  });
});
