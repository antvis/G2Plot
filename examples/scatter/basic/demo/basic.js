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
      xAxis: {
        nice: true,
        label: {
          style: {
            fill: 'green',
            fontSize: 16,
          },
        },
      },
    });
    scatterPlot.render();
  });
