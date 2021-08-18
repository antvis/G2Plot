import { createDiv } from '../utils/dom';
import { DualAxes } from '../../src';

describe('#2808: 双轴图存在 color 回调时，tooltip 展示名出错', () => {
  const div = createDiv();
  const data = [
    { time: '2019-03', value: 350, count: 800 },
    { time: '2019-04', value: 900, count: 600 },
    { time: '2019-05', value: 300, count: 400 },
    { time: '2019-06', value: 450, count: 380 },
    { time: '2019-07', value: 470, count: 220 },
  ];

  const plot = new DualAxes(div, {
    data: [data, data],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        color: () => 'red',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  });

  plot.render();

  it('双轴均无拆分', () => {
    const box = plot.chart.views[0].geometries[0].elements[0].shape.getBBox();
    plot.chart.showTooltip({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    // 之前这里展示不正确，等于 2019-03
    expect((div.querySelectorAll('.g2-tooltip-name')[0] as HTMLDivElement).innerText).toBe('value');
    expect((div.querySelectorAll('.g2-tooltip-name')[1] as HTMLDivElement).innerText).toBe('count');

    plot.chart.hideTooltip();
  });

  it('column 无拆分，line 有拆分', () => {
    const uvData = [
      { time: '2019-03', value: 35 },
      { time: '2019-04', value: 90 },
      { time: '2019-05', value: 30 },
      { time: '2019-06', value: 45 },
      { time: '2019-07', value: 47 },
    ];

    const transformData = [
      { time: '2019-03', count: 800, name: 'a' },
      { time: '2019-04', count: 600, name: 'a' },
      { time: '2019-05', count: 400, name: 'a' },
      { time: '2019-06', count: 380, name: 'a' },
      { time: '2019-07', count: 220, name: 'a' },
      { time: '2019-03', count: 750, name: 'b' },
      { time: '2019-04', count: 650, name: 'b' },
      { time: '2019-05', count: 450, name: 'b' },
      { time: '2019-06', count: 400, name: 'b' },
      { time: '2019-07', count: 320, name: 'b' },
      { time: '2019-03', count: 900, name: 'c' },
      { time: '2019-04', count: 600, name: 'c' },
      { time: '2019-05', count: 450, name: 'c' },
      { time: '2019-06', count: 300, name: 'c' },
      { time: '2019-07', count: 200, name: 'c' },
    ];

    plot.update({
      data: [uvData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'column',
          columnWidthRatio: 0.4,
          color: () => 'red',
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: () => 'red',
        },
      ],
    });

    const box = plot.chart.views[0].geometries[0].elements[0].shape.getBBox();
    plot.chart.showTooltip({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    expect((div.querySelectorAll('.g2-tooltip-name')[0] as HTMLDivElement).innerText).toBe('value');
    expect((div.querySelectorAll('.g2-tooltip-name')[1] as HTMLDivElement).innerText).toBe('a');
    expect((div.querySelectorAll('.g2-tooltip-name')[2] as HTMLDivElement).innerText).toBe('b');
    expect((div.querySelectorAll('.g2-tooltip-name')[3] as HTMLDivElement).innerText).toBe('c');

    plot.chart.hideTooltip();
  });

  it('column 拆分，line 无拆分', () => {
    const uvBillData = [
      { time: '2019-03', value: 350, type: 'uv' },
      { time: '2019-04', value: 900, type: 'uv' },
      { time: '2019-05', value: 300, type: 'uv' },
      { time: '2019-06', value: 450, type: 'uv' },
      { time: '2019-07', value: 470, type: 'uv' },
      { time: '2019-03', value: 220, type: 'bill' },
      { time: '2019-04', value: 300, type: 'bill' },
      { time: '2019-05', value: 250, type: 'bill' },
      { time: '2019-06', value: 220, type: 'bill' },
      { time: '2019-07', value: 362, type: 'bill' },
    ];

    const transformData = [
      { time: '2019-03', count: 800 },
      { time: '2019-04', count: 600 },
      { time: '2019-05', count: 400 },
      { time: '2019-06', count: 380 },
      { time: '2019-07', count: 220 },
    ];

    plot.update({
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'column',
          isStack: true,
          isPercent: true,
          seriesField: 'type',
          color: ['red', 'green'],
        },
        {
          geometry: 'line',
          color: () => 'red',
        },
      ],
    });

    const box = plot.chart.views[0].geometries[0].elements[0].shape.getBBox();
    plot.chart.showTooltip({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    expect((div.querySelectorAll('.g2-tooltip-name')[0] as HTMLDivElement).innerText).toBe('uv');
    expect((div.querySelectorAll('.g2-tooltip-name')[1] as HTMLDivElement).innerText).toBe('bill');
    expect((div.querySelectorAll('.g2-tooltip-name')[2] as HTMLDivElement).innerText).toBe('count');

    plot.chart.hideTooltip();
  });

  it('双轴均拆分', () => {
    const uvBillData = [
      { time: '2019-03', value: 350, type: 'uv' },
      { time: '2019-04', value: 900, type: 'uv' },
      { time: '2019-05', value: 300, type: 'uv' },
      { time: '2019-06', value: 450, type: 'uv' },
      { time: '2019-07', value: 470, type: 'uv' },
      { time: '2019-03', value: 220, type: 'bill' },
      { time: '2019-04', value: 300, type: 'bill' },
      { time: '2019-05', value: 250, type: 'bill' },
      { time: '2019-06', value: 220, type: 'bill' },
      { time: '2019-07', value: 362, type: 'bill' },
    ];

    const transformData = [
      { time: '2019-03', count: 800, name: 'a' },
      { time: '2019-04', count: 600, name: 'a' },
      { time: '2019-05', count: 400, name: 'a' },
      { time: '2019-06', count: 380, name: 'a' },
      { time: '2019-07', count: 220, name: 'a' },
      { time: '2019-03', count: 750, name: 'b' },
      { time: '2019-04', count: 650, name: 'b' },
      { time: '2019-05', count: 450, name: 'b' },
      { time: '2019-06', count: 400, name: 'b' },
      { time: '2019-07', count: 320, name: 'b' },
      { time: '2019-03', count: 900, name: 'c' },
      { time: '2019-04', count: 600, name: 'c' },
      { time: '2019-05', count: 450, name: 'c' },
      { time: '2019-06', count: 300, name: 'c' },
      { time: '2019-07', count: 200, name: 'c' },
    ];

    plot.update({
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          columnWidthRatio: 0.4,
          color: () => 'red',
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: () => 'red',
        },
      ],
    });

    const box = plot.chart.views[0].geometries[0].elements[0].shape.getBBox();
    plot.chart.showTooltip({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    expect((div.querySelectorAll('.g2-tooltip-name')[0] as HTMLDivElement).innerText).toBe('uv');
    expect((div.querySelectorAll('.g2-tooltip-name')[1] as HTMLDivElement).innerText).toBe('bill');
    expect((div.querySelectorAll('.g2-tooltip-name')[2] as HTMLDivElement).innerText).toBe('a');
    expect((div.querySelectorAll('.g2-tooltip-name')[3] as HTMLDivElement).innerText).toBe('b');
    expect((div.querySelectorAll('.g2-tooltip-name')[4] as HTMLDivElement).innerText).toBe('c');

    plot.chart.hideTooltip();
  });

  afterAll(() => {
    plot.destroy();
  });
});
