import { StackArea } from '@antv/g2plot';

fetch('../data/oil.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackArea(document.getElementById('container'), {
      data,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: {
        type: 'dateTime',
      },
      responsive: true,
    });
    areaPlot.render();
  });
