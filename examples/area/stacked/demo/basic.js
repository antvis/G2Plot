import { StackedArea } from '@antv/g2plot';

fetch('../data/oil.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackedArea(document.getElementById('container'), {
      title: {
        visible: true,
        text: '堆叠面积图',
      },
      data,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
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
