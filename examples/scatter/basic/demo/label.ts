import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/3e4db10a-9da1-4b44-80d8-c128f42764a8.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter('container', {
      appendPadding: 30,
      data,
      xField: 'xG conceded',
      yField: 'Shot conceded',
      colorField: 'Result',
      color: ['#c71e1d', '#ffca76', '#09bb9f'],
      size: 5,
      shape: 'circle',
      pointStyle: {
        fillOpacity: 1,
      },
      xAxis: {
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
      },
      label: {},
    });
    scatterPlot.render();
  });
