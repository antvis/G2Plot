// 堆叠面积图

$.get('data/oil.json', function(data) {
  const areaPlot = new g2plot.StackArea(document.getElementById('canvas'), {
    width: 500,
    height: 500,
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

// 作为模块 避免变量冲突
export {};
