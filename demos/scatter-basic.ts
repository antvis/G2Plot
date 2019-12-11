// 基础散点图

$.get('data/country-economy.json', function(data) {
  const scatterPlot = new g2plot.Scatter(document.getElementById('canvas'), {
    width: 800,
    height: 600,
    padding: 'auto',
    data,
    xField: 'GDP',
    yField: 'LifeExpectancy',
    colorFields: 'continent',
    quadrant: {
      xBaseline: 20000,
      yBaseline: 70,
    },
  });
  scatterPlot.render();
});
