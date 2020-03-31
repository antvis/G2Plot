// 播放轴气泡图

$.get('../examples/data/life-expectancy.json', function(data) {
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
    forceFit: true,
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
      max: 100000,
      min: 300,
      nice: false,
      type: 'log',
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
    tooltip: {
      visible: true,
      showTitle: true,
      titleField: 'country',
      fields: ['income', 'lifeExpectancy', 'population'],
    },
    legend: {
      visible: false,
    },
    label: {
      visible: true,
      field: 'country',
    },
    interactions: [
      {
        type: 'timeline',
        cfg: {
          field: 'year',
          key: 'country',
          loop: true,
        },
      },
    ],
  });
  bubblePlot.render();

  setTimeout(() => {
    bubblePlot.changeData(data.slice(0, 1000));
  }, 1000);
});

// 作为模块 避免变量冲突
export {};
