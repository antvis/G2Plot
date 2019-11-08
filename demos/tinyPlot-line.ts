// 迷你图表-折线

$.get('data/income.json', function(data) {
  const tinyLine = new g2plot.TinyLine(document.getElementById('canvas'), {
    width: 200,
    height: 100,
    data,
    xField: 'time',
    yField: 'rate',
    // size: 3,
    // color: '#EB5A05',
    // smooth: true,
    // lineStyle:{ lineDash: [2,2] }
  });
  tinyLine.render();
});

// 作为模块 避免变量冲突
export {}
