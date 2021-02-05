import { Column, Area, Bar, Line, Plot } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2303', () => {
  const data0 = [
    {
      type: '家具家电',
      sales: 238,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
  ];

  const data1 = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: -335,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
  ];

  const fieldOptions1 = {
    xField: 'type',
    yField: 'sales',
  };

  const fieldOptions2 = {
    xField: 'sales',
    yField: 'type',
  };

  const charts = [
    { chart: Column, name: 'column', fieldOptions: fieldOptions1 },
    { chart: Area, name: 'area', fieldOptions: fieldOptions1 },
    { chart: Bar, name: 'bar', fieldOptions: fieldOptions2 },
    { chart: Line, name: 'line', fieldOptions: fieldOptions1 },
  ];

  charts.forEach((d) => {
    const { chart, name, fieldOptions } = d;
    it(`should update scales of ${name} when changeData`, () => {
      test(chart, fieldOptions, data0, data1);
    });
  });

  function test(Chart, fieldOptions, data0, data1) {
    const domainMax = <T>(d: Plot<T>, axis: 'x' | 'y') => d.chart.getScalesByDim(axis).sales.max;
    const domainMin = <T>(d: Plot<T>, axis: 'x' | 'y') => d.chart.getScalesByDim(axis).sales.min;

    const chart = new Chart(createDiv(), {
      data: data0,
      ...fieldOptions,
    });

    chart.render();
    expect(domainMin(chart, 'y')).toBe(0); // 所有数据大于 0 ，所以最小应该为 0
    expect(domainMax(chart, 'y')).toBeGreaterThan(0);

    chart.changeData(data1);
    expect(domainMin(chart, 'y')).toBeLessThan(0); // 不是所有数据大于 0， 所以最小应该小于 0
    expect(domainMax(chart, 'y')).toBeGreaterThan(0);
  }
});
