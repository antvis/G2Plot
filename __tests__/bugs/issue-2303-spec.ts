import { Area, Bar, Column, Line, Plot, TinyArea, TinyColumn, TinyLine } from '../../src';
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

  const getter = (data) => data.map((d) => d.sales);

  const charts = [
    { chart: Column, name: 'column', fieldOptions: fieldOptions1 },
    { chart: Area, name: 'area', fieldOptions: fieldOptions1 },
    { chart: Bar, name: 'bar', fieldOptions: fieldOptions2 },
    { chart: Line, name: 'line', fieldOptions: fieldOptions1 },
    { chart: TinyArea, name: 'tiny-area', getter },
    { chart: TinyColumn, name: 'tiny-column', getter },
    { chart: TinyLine, name: 'tiny-line', getter },
  ];

  charts.forEach((d) => {
    const { chart, name, fieldOptions = {}, getter = (d) => d } = d;
    it(`should update scales of ${name} when changeData`, () => {
      testChart(chart, fieldOptions, getter(data0), getter(data1));
    });
  });

  function testChart(Chart, fieldOptions, data0, data1) {
    const getter = Object.keys(fieldOptions).length ? (d) => d.sales : (d) => d.y;
    const domainMax = <T>(d: Plot<T>, axis: 'x' | 'y') => getter(d.chart.getScalesByDim(axis)).max;
    const domainMin = <T>(d: Plot<T>, axis: 'x' | 'y') => getter(d.chart.getScalesByDim(axis)).min;

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

    chart.destroy();
  }
});
