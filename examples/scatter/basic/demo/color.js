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
      sizeField: 'weight',
      size: [5, 10],
      xAxis: {
        nice: true,
      },
      pointStyle: {
        fill: 'red',
        stroke: 'yellow',
        lineWidth: 4,
        lineDash: [2, 2],
        opacity: 0.5,
        fillOpacity: 0.5,
        strokeOpacity: 0.5,
      },
    });
    scatterPlot.render();
  });
