import { Scatter } from '@antv/g2plot';

fetch('../data/roma.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter(document.getElementById('container'), {
      title: {
        visible: true,
        text: '散点图图形标签',
      },
      description: {
        visible: true,
        text: '散点图label支持5种方位布局',
      },
      data,
      xField: 'xG conceded',
      yField: 'Shot conceded',
      colorField: 'Result',
      color: ['#c71e1d', '#ffca76', '#09bb9f'],
      pointSize: 5,
      pointStyle: {
        fillOpacity: 1,
      },
      yAxis: {
        visible: true,
        min: 0,
      },
      label: {
        visible: true,
        position: 'right', // left right top bottom middle
      },
    });
    scatterPlot.render();
  });
