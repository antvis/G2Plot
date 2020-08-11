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
      shapeField: 'Genre',
      shape: ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'hyphen', 'line', 'cross'],
      colorField: 'Genre',
      size: 6,
      yAxis: {
        nice: true,
      },
      xAxis: {
        visible: false,
        min: -100,
        nice: true,
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
