// 播放轴气泡图

$.get('./data/life-expectancy.json', function(data) {
  const bubblePlot = new g2plot.Bubble(document.getElementById('canvas'), {
    title: {
      visible: true,
      text: '带播放轴气泡图',
    },
    data,
    xField: 'income',
    yField: 'lifeExpectancy',
    colorField: 'country',
    sizeField: 'population',
    pointSize: [4, 80],
    width: 1000,
    height: 600,
    xAxis: {
      visible: true,
      label: {
        formatter: (value) => {
          return `$ ${value}`;
        },
      },
      title: {
        visible: true,
        text: '人均收入',
      },
      max: 10000,
      min: 300,
    },
    yAxis: {
      visible: true,
      label: {
        formatter: (value) => {
          return `${value} 岁`;
        },
      },
      title: {
        visible: true,
        text: '人均寿命',
      },
      min: 0,
      max: 100,
    },
    interactions: [
      {
        type: 'timeline',
        cfg: {
          field: 'year',
        },
      },
    ],
  });
  bubblePlot.render();
});

// 作为模块 避免变量冲突
export {};
