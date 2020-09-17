import { Bullet } from '@antv/g2plot';

const data = [
  {
    title: '重庆',
    ranges: [30, 90, 120],
    measures: [65],
    target: 80,
  },
  {
    title: '杭州',
    ranges: [30, 90, 120],
    measures: [50],
    target: 100,
  },
  {
    title: '广州',
    ranges: [30, 90, 120],
    measures: [40],
    target: 85,
  },
  {
    title: '深圳',
    ranges: [30, 90, 120],
    measures: [50],
    target: 100,
  },
];

const bulletPlot = new Bullet('container', {
  data,
  measureField: 'measures',
  rangeField: 'ranges',
  targetField: 'target',
  xField: 'title',
  bulletStyle: {
    range: {
      color: ['#FFB1AC', '#FFDBA2', '#B4EBBF'],
    },
    measure: {
      color: ['#5B8FF9'],
    },
    target: {
      color: '#5B8FF9',
    },
  },
  label: {
    position: 'middle',
    style: {
      fill: '#fff',
    },
  },
  xAxis: {
    line: null,
  },
  yAxis: false,
  // 自定义 legend
  legend: {
    custom: true,
    position: 'bottom',
    items: [
      {
        value: '差',
        name: '差',
        marker: { symbol: 'square', style: { fill: '#FFB1AC', r: 5 } },
      },
      {
        value: '良',
        name: '良',
        marker: { symbol: 'square', style: { fill: '#FFDBA2', r: 5 } },
      },
      {
        value: '优',
        name: '优',
        marker: { symbol: 'square', style: { fill: '#B4EBBF', r: 5 } },
      },
      {
        value: '实际值',
        name: '实际值',
        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
      },
      {
        value: '目标值',
        name: '目标值',
        marker: { symbol: 'line', style: { stroke: '#5B8FF9', r: 5 } },
      },
    ],
  },
});

bulletPlot.render();
