// 气泡图带趋势线

$.get('../examples/data/revenue.json', function(data) {
  const bubblePlot = new g2plot.Bubble(document.getElementById('canvas'), {
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
    trendline: {
      type: 'log',
    },
  });
  bubblePlot.render();
});

// 作为模块 避免变量冲突
export {};
