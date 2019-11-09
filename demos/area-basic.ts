// 基础面积图

$.get('data/fireworks-sales.json', function(data) {
  const areaPlot = new g2plot.Area(document.getElementById('canvas'), {
    width: 600,
    height: 600,
    padding: 'auto',
    data,
    xField: 'Data',
    yField: 'scales',
    xAxis: {
      type: 'time',
      tickCount: 5,
    },
  });
  areaPlot.render();
});

// 作为模块 避免变量冲突
export {}
