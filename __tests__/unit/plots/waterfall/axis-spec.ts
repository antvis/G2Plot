import { Waterfall } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('waterfall axis', () => {
  it('meta', () => {
    const formatter = (v) => `${Math.floor(v / 10000)}万`;
    const waterfall = new Waterfall(createDiv(), {
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

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
    expect(geometry.scales.sales.formatter).toBe(formatter);

    // 柱状图默认为 cat 类型
    // @ts-ignore
    expect(geometry.scales.area.type).toBe('cat');
  });

  it('xAxis', () => {
    const waterfall = new Waterfall(createDiv(), {
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

    waterfall.render();
    const axisOptions = waterfall.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.area.label.rotate).toBe(-Math.PI / 2);
  });

  it('yAxis', () => {
    const waterfall = new Waterfall(createDiv(), {
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

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];
    const axisOptions = waterfall.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.sales.minLimit).toBe(10000);
    expect(geometry.scales.sales.minLimit).toBe(10000);
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
  });
});
