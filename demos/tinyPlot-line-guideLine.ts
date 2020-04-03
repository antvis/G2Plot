// 迷你图表-带辅助线的折线

$.get('data/income.json', function (data) {
  const tinyLine = new g2plot.TinyLine(document.getElementById('canvas'), {
    width: 200,
    height: 100,
    data,
    xField: 'time',
    yField: 'rate',
    guideLine: [
      // statistical guidelines, options: mean | median | max | min
      { type: 'median' },
    ],
  });
  tinyLine.render();
});

// 作为模块 避免变量冲突
export {};
