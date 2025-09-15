import { groupBy, size } from '@antv/util';
import { Facet } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('facet - legend', () => {
  const data = [
    {
      name: 14513,
      carat: 1.35,
      cut: 'Ideal',
      color: 'J',
      clarity: 'VS2',
      depth: 61.4,
      table: 57,
      price: 5862,
      x: 7.1,
      y: 7.13,
      z: 4.37,
    },
    {
      name: 28685,
      carat: 0.3,
      cut: 'Good',
      color: 'G',
      clarity: 'VVS1',
      depth: 64,
      table: 57,
      price: 678,
      x: 4.23,
      y: 4.27,
      z: 2.72,
    },
    {
      name: 50368,
      carat: 0.75,
      cut: 'Ideal',
      color: 'F',
      clarity: 'SI2',
      depth: 59.2,
      table: 60,
      price: 2248,
      x: 5.87,
      y: 5.92,
      z: 3.49,
    },
    {
      name: 7721,
      carat: 0.26,
      cut: 'Ideal',
      color: 'F',
      clarity: 'VS1',
      depth: 60.9,
      table: 57,
      price: 580,
      x: 4.13,
      y: 4.11,
      z: 2.51,
    },
    {
      name: 31082,
      carat: 0.33,
      cut: 'Premium',
      color: 'H',
      clarity: 'VVS1',
      depth: 61.4,
      table: 59,
      price: 752,
      x: 4.42,
      y: 4.44,
      z: 2.72,
    },
    {
      name: 26429,
      carat: 1.52,
      cut: 'Ideal',
      color: 'G',
      clarity: 'VVS1',
      depth: 62.4,
      table: 55,
      price: 15959,
      x: 7.3,
      y: 7.39,
      z: 4.58,
    },
  ];

  const plot = new Facet(createDiv(), {
    data,
    type: 'rect',
    fields: ['cut', 'clarity'],
    cols: 3, // 超过3个换行
    padding: [0, 10, 10],
    appendPadding: 30,
    axes: {},
    meta: {
      carat: {
        sync: true,
      },
      price: {
        sync: true,
      },
      cut: {
        // 设置 sync 同步之后，可以按照 'cut' 进行颜色映射分类
        sync: true,
      },
    },
    colorField: 'color',
    shapeField: 'cut',
    sizeField: 'price',
    // shapeLegend: false,
    // legend: false,
    // sizeLegend: { position: 'left' },
    eachView: (view, f) => {
      return {
        type: 'scatter',
        options: {
          data: f?.data,
          xField: 'carat',
          yField: 'price',
          colorField: 'color',
          shapeField: 'cut',
          sizeField: 'price',
          pointStyle: { fillOpacity: 0.3, stroke: null },
        },
      };
    },
  });
  plot.render();

  it('bubble - default', () => {
    const legendLen = plot.chart.getController('legend').getComponents()?.length;
    // 气泡图默认只画 color legend 和 shape legend 且分开
    expect(legendLen).toBe(2);
  });

  it('bubble - sizeLegend开启', () => {
    plot.update({ sizeLegend: {} });
    const legendLen = plot.chart.getController('legend').getComponents()?.length;
    expect(legendLen).toBe(3);
  });

  it('bubble - legend关闭', () => {
    plot.update({ legend: false });
    expect(plot.chart.getController('legend').getComponents().length).toBe(2);
  });

  afterAll(() => {
    plot.destroy();
  });
});
