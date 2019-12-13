// 基础气泡图

$.get('data/country-economy.json', function(data) {
  const bubblePlot = new g2plot.Bubble(document.getElementById('canvas'), {
    width: 800,
    height: 600,
    padding: 'auto',
    data,
    xField: 'GDP',
    yField: 'LifeExpectancy',
    sizeField: 'Population',
    colorFields: 'continent',
    label: {
      visible: true,
    },
  });
  bubblePlot.render();
});

// 作为模块 避免变量冲突
export {};
