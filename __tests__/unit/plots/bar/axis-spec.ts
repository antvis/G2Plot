import { Bar } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar axis', () => {
  it('meta', () => {
    const formatter = (v) => `${Math.floor(v / 10000)}万`;
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      meta: {
        sales: {
          nice: true,
          formatter,
        },
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
    expect(geometry.scales.sales.formatter).toBe(formatter);

    // 默认 yField 为 cat 类型
    // @ts-ignore
    expect(geometry.scales.area.type).toBe('cat');
  });

  it('xAxis', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      xAxis: {
        minLimit: 10000,
        nice: true,
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const axisOptions = bar.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.sales.minLimit).toBe(10000);
    expect(geometry.scales.sales.minLimit).toBe(10000);
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
  });

  it('yAxis', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      yAxis: {
        label: {
          rotate: -Math.PI / 6,
        },
      },
    });

    bar.render();
    const axisOptions = bar.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.area.label.rotate).toBe(-Math.PI / 6);
  });
});
