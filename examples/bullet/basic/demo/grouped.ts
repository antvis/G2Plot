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
  color: {
    range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
    measure: '#1890ff',
    target: '#39a3f4',
  },
  label: {
    measure: {
      position: 'middle',
      style: {
        fill: '#fff',
      },
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
        marker: { symbol: 'square', style: { fill: '#FFbcb8', r: 5 } },
      },
      {
        value: '良',
        name: '良',
        marker: { symbol: 'square', style: { fill: '#FFe0b0', r: 5 } },
      },
      {
        value: '优',
        name: '优',
        marker: { symbol: 'square', style: { fill: '#bfeec8', r: 5 } },
      },
      {
        value: '实际值',
        name: '实际值',
        marker: { symbol: 'square', style: { fill: '#1890ff', r: 5 } },
      },
      {
        value: '目标值',
        name: '目标值',
        marker: { symbol: 'line', style: { stroke: '#39a3f4', r: 5 } },
      },
    ],
  },
});

bulletPlot.render();
