import { StackedBar, StackedColumn, ViewLayer } from '../../src';
import { createDiv } from '../utils/dom';

describe('$478', () => {
  const container = createDiv('container');
  const data = [
    {
      x: '2019-03',
      y: 385,
      serie: 'Paris',
    },
    {
      x: '2019-04',
      y: 888,
      serie: 'Paris',
    },
    {
      x: '2019-05',
      y: 349,
      serie: 'Paris',
    },
    {
      x: '2019-06',
      y: 468,
      serie: 'Paris',
    },
    {
      x: '2019-07',
      y: 477,
      serie: 'Paris',
    },
    {
      x: '2019-03',
      y: 291,
      serie: 'London',
    },
    {
      x: '2019-04',
      y: 484,
      serie: 'London',
    },
    {
      x: '2019-05',
      y: 293,
      serie: 'London',
    },
    {
      x: '2019-06',
      y: 147,
      serie: 'London',
    },
    {
      x: '2019-07',
      y: 618,
      serie: 'London',
    },
  ];
  const plot = new StackedBar(document.getElementById('container'), {
    data,
    title: {
      visible: true,
      text: '百分比堆叠条形图',
    },
    description: {
      visible: true,
      text: '一个简单的百分比堆叠条形图',
    },
    legend: {
      flipPage: false,
    },
    xAxis: {
      label: {},
      title: {
        text: '百分比',
      },
    },
    yAxis: {
      title: {
        text: '日期',
      },
    },
    theme: 'dark',
    xField: 'y',
    yField: 'x',
    stackField: 'serie',
  });

  plot.render();

  it('yAxis color', () => {
    const view = (plot.getLayer() as ViewLayer).view;
    const axis = view.getController('axis').getComponents()[0].component;
    const labelCfg = axis.get('label');

    expect(labelCfg?.textStyle?.fill).toEqual('rgba(255, 255, 255, 0.45)');
  });
});
