import { StackArea } from '@antv/g2plot';

fetch('../data/oil.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackArea(document.getElementById('container'), {
      title: {
        visible: true,
        text: '堆叠面积图',
      },
      data,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
      legend: {
        visible: true,
        position: 'right-top',
      },
      responsive: true,
    });
    areaPlot.render();
  });
