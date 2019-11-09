import { Area } from '@antv/g2plot';

fetch('../data/fireworks-sales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new Area(document.getElementById('container'), {
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
    });
    areaPlot.render();
  });
