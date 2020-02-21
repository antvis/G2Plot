// 基础气泡图

$.get('../examples/data/smoking-rate.json', function(data) {
  const bubblePlot = new g2plot.Bubble(document.getElementById('canvas'), {
    data,
    xField: 'change in female rate',
    yField: 'change in male rate',
    sizeField: 'pop',
    pointSize: [4, 30],
    colorField: 'continent',
    color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
    pointStyle: {
      stroke: '#777777',
      lineWidth: 1,
      opacity: 0.8,
    },
    xAxis: {
      visible: true,
      max: 5,
      min: -25,
    },
  });
  bubblePlot.render();
});

// 作为模块 避免变量冲突
export {};
