import { Area } from '@antv/g2plot';

fetch('../data/fireworks-sales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new Area(document.getElementById('container'), {
      title: {
        visible: true,
        text: '基础面积图',
      },
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
