import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column axis', () => {
  it('meta', () => {
    const formatter = (v) => `${Math.floor(v / 10000)}万`;
    const column = new Column(createDiv(), {
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

    column.render();

    const geometry = column.chart.geometries[0];
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
    expect(geometry.scales.sales.formatter).toBe(formatter);

    // 柱状图默认为 cat 类型
    // @ts-ignore
    expect(geometry.scales.area.type).toBe('cat');
  });

  it('xAxis', () => {
    const column = new Column(createDiv(), {
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

    column.render();
    const axisOptions = column.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.area.label.rotate).toBe(-Math.PI / 2);
  });

  it('yAxis', () => {
    const column = new Column(createDiv(), {
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

    column.render();

    const geometry = column.chart.geometries[0];
    const axisOptions = column.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.sales.minLimit).toBe(10000);
    expect(geometry.scales.sales.minLimit).toBe(10000);
    // @ts-ignore
    expect(geometry.scales.sales.nice).toBe(true);
  });
});
