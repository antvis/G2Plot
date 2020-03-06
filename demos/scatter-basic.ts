// 基础散点图

$.get('data/country-economy.json', function(data) {
  const scatterPlot = new g2plot.Scatter(document.getElementById('canvas'), {
    width: 800,
    height: 600,
    padding: 'auto',
    data,
    xField: 'GDP',
    yField: 'LifeExpectancy',
    pointSize: 5,
    colorField: 'continent',
    quadrant: {
      visible: true,
      xBaseline: 20000,
      yBaseline: 70,
      regionStyle: [
        { fill: 'black', opacity: 0.05 },
        { fill: 'green', opacity: 0.05 },
        { fill: 'white', opacity: 0 },
        { fill: 'white', opacity: 0 },
      ],
      label: {
        text: ['第一象限', '第二象限', '第三象限', '第四象限'],
      },
    },
    trendline: {
      visible: true,
      type: 'quad',
      showConfidence: true,
    },
    label: {
      visible: true,
    },
  });
  scatterPlot.render();
});
