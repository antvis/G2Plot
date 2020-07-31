import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter(document.getElementById('container'), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shape: ['circle', 'square'],
      label: {
        offsetX: 6,
        offsetY: 6,
        style: {
          fill: 'rgba(0, 0, 0, 0.65)',
          stroke: '#ffffff',
          lineWidth: 2,
        },
      },
    });
    scatterPlot.render();
  });
