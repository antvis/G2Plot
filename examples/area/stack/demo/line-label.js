import { StackArea } from '@antv/g2plot';

fetch('../data/oil.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackArea(document.getElementById('container'), {
      padding: [20, 100, 100, 50],
      data,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: {
        type: 'dateTime',
      },
      label: {
        visible: true,
        type: 'line',
      },
      responsive: true,
    });
    areaPlot.render();
  });
