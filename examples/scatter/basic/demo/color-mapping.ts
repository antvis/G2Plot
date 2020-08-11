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
      colorField: 'Genre',
      sizeField: 'Rating',
      size: [2, 5],
      yAxis: {
        nice: true,
      },
      xAxis: {
        visible: false,
        min: -100,
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
      },
      pointStyle: {
        stroke: '#fff',
      },
    });
    scatterPlot.render();
  });
