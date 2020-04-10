// 迷你图表—面积图

$.get('data/fireworks-sales.json', function(data) {
  const areaPlot = new g2plot.TinyArea(document.getElementById('canvas'), {
    width: 200,
    height: 100,
    data,
    xField: 'Data',
    yField: 'scales',
    // color: '#53C3C5',
    smooth: true,
  });
  areaPlot.render();
});

// 作为模块 避免变量冲突
export {};
