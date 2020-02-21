// 四象限气泡图

$.get('../examples/data/smoking-rate.json', function(data) {
  const filterData = data.filter((item) => {
    return item['change in male rate'] !== 'NA';
  });
  const bubblePlot = new g2plot.Bubble(document.getElementById('canvas'), {
    width: 800,
    height: 600,
    data: filterData,
    xField: 'change in female rate',
    yField: 'change in male rate',
    sizeField: 'pop',
    pointSize: [4, 30],
    colorField: 'continent',
    color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
    pointStyle: {
      stroke: '#777777',
      lineWidth: 1,
      opacity: 0.8,
    },
    xAxis: {
      visible: true,
      max: 5,
      min: -25,
    },
    quadrant: {
      visible: true,
      xBaseline: 0,
      yBaseline: 0,
      regionStyle: [
        { fill: '#d8d0c0', opacity: 0.2 },
        { fill: '#a3dda1', opacity: 0.1 },
        { fill: 'white', opacity: 0 },
        { fill: '#d8d0c0', opacity: 0.2 },
      ],
      label: {
        text: [
          'Female decrease,\nmale increase',
          'Female & male decrease',
          'Female &\n male increase',
          'Male decrease,\nfemale increase',
        ],
      },
    },
  });
  bubblePlot.render();
});

// 作为模块 避免变量冲突
export {};
