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
    expect(barPlot.chart.geometries[0].elements[0].getData().sales).toBe(data[0].sales);
    expect(barPlot.chart.getData()).toEqual(chartData);

    barPlot.destroy();
  });

  it.only('changeData should change scale correctly', () => {
    const barPlot = new Bar(createDiv(), {
      data: [
        { copyAlias: 'test1接口', cpuUtil: 35 },
        { copyAlias: 'test2接口', cpuUtil: 35 },
        { copyAlias: 'test3接口', cpuUtil: 35 },
      ],
      xField: 'cpuUtil',
      yField: 'copyAlias',
      xAxis: {
        min: 0,
        max: 100,
        minLimit: 0,
        maxLimit: 100,
      },
    });

    barPlot.render();
    barPlot.changeData([
      { copyAlias: 'test4接口', cpuUtil: 35 },
      { copyAlias: 'test5接口', cpuUtil: 35 },
      { copyAlias: 'test6接口', cpuUtil: 35 },
    ]);

    const boxes = barPlot.chart.geometries[0].elements.map((ele) => ele.getBBox());
    expect(boxes[0].maxY).toBeLessThan(boxes[1].minY);
    expect(boxes[1].maxY).toBeLessThan(boxes[2].minY);

    barPlot.destroy();
  });
});
