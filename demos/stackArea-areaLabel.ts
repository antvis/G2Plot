// 堆叠面积图

$.get('data/oil.json', function(data) {
  const areaPlot = new g2plot.StackArea(document.getElementById('canvas'), {
    title: {
      text: '堆叠面积图-areaLabel',
    },
    description: {
      text:
        '堆叠面积图中，将label type设置为area时，label显示在堆叠区域内，使用户能够更容易的通过视觉将label和对应图形产生联系。autoScale配置项设置为true时，label会自适应堆叠区域的大小。',
    },
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
      type: 'area',
      autoScale: true,
    },
    responsive: true,
  });
  areaPlot.render();
});

// 作为模块 避免变量冲突
export {}
