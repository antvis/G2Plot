import { Bubble } from '@antv/g2plot';

fetch('../data/life-expectancy.json')
  .then((res) => res.json())
  .then((data) => {
    const bubblePlot = new Bubble(document.getElementById('container'), {
      title: {
        visible: true,
        text: '气泡图加播放轴',
      },
      data,
      xField: 'income',
      yField: 'lifeExpectancy',
      colorField: 'country',
      sizeField: 'population',
      pointSize: [4, 80],
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
      legend: {
        visible: false,
      },
      tooltip: {
        visible: true,
        showTitle: true,
        titleField: 'country',
        itemField: ['income', 'lifeExpectancy', 'population'],
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
