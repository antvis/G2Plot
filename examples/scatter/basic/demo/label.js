import { Scatter } from '@antv/g2plot';

fetch('../data/roma.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter(document.getElementById('container'), {
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
      },
    });
    scatterPlot.render();
  });
