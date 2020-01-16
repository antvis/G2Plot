import { Bubble } from '@antv/g2plot';

fetch('../data/revenue.json')
  .then((res) => res.json())
  .then((data) => {
    const bubblePlot = new Bubble(document.getElementById('container'), {
      title: {
        visible: true,
        text: '气泡图添加趋势线',
      },
      data,
      xField: 'Revenue per club[€ m]',
      yField: 'UEFA points*',
      sizeField: 'UEFA points*',
      pointSize: [4, 25],
      colorField: 'revenueGroup',
      color: ['#72302f', '#beb298', '#d18768', '#e3cda1'],
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        opacity: 0.9,
      },
      xAxis: {
        visible: true,
        min: -5,
        max: 230,
        nice: false,
      },
      tooltip: {
        visible: true,
        showTitle: true,
        titleField: 'revenueGroup',
      },
      trendline: {
        visible: true,
        type: 'log',
      },
    });
    bubblePlot.render();
  });
