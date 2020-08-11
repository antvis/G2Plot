import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter('container', {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      shape: 'circle',
      xAxis: {
        visible: true,
      },
      pointStyle: {
        stroke: '#777',
      },
    });
    scatterPlot.render();
  });
