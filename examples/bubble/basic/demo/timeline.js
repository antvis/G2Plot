import { Bubble } from '@antv/g2plot';

fetch('../data/life-expectancy.json')
  .then((res) => res.json())
  .then((data) => {
    const bubblePlot = new Bubble(document.getElementById('container'), {
      data,
      xField: 'income',
      yField: 'lifeExpectancy',
      colorField: 'country',
      sizeField: 'population',
      pointSize: [4, 80],
      color: [
        '#5B8FF9',
        '#5AD8A6',
        '#f03838',
        '#35d1d1',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#F6BD16',
        '#FF99C3',
      ],
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
  });
