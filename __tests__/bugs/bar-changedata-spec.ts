import { Bar } from '../../src';
import { createDiv } from '../utils/dom';

describe('bar changeData should keep order', () => {
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
  ];

  it('keep data order', () => {
    const barPlot = new Bar(createDiv(), {
      data,
      xField: 'sales',
      yField: 'type',
      seriesField: 'type',
    });

    barPlot.render();
    const chartData = barPlot.chart.getData();
    barPlot.changeData(data);

    // 绘制从下至上
    expect(barPlot.chart.geometries[0].elements[0].getData().sales).toBe(data[2].sales);
    expect(barPlot.chart.getData()).toEqual(chartData);

    barPlot.destroy();
  });
});
