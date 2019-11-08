// 堆叠面积图

$.get('data/oil.json', function(data) {
  const areaPlot = new g2plot.StackArea(document.getElementById('canvas'), {
    padding: [20, 100, 100, 50],
    width: 500,
    height: 500,
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

// 作为模块 避免变量冲突
export {}
