import { Bar } from '../../src';
import { createDiv } from '../utils/dom';

describe('bar yaxis formatter', () => {
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

  it('xAxis not influence yAxis', () => {
    const plot = new Bar(createDiv(), {
      data,
      xField: 'sales',
      yField: 'type',
      xAxis: {
        label: {
          formatter: (v) => 'hello',
        },
      },
    });

    plot.render();

    expect(plot.chart.getOptions().axes['sales'].label.formatter).toBeDefined();
    expect(plot.chart.getOptions().axes['type'].label.formatter).toBeUndefined();

    plot.destroy();
  });
});
