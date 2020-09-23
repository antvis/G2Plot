import { Bullet } from '@antv/g2plot';

const data = [
  {
    title: '满意度',
    ranges: [100],
    measures: [80],
    target: 85,
  },
];

const bulletPlot = new Bullet('container', {
  data,
  measureField: 'measures',
  rangeField: 'ranges',
  targetField: 'target',
  xField: 'title',
  style: {
    range: {
      color: '#5B8FF9',
    },
    measure: {
      color: '#5B8FF9',
    },
    target: {
      color: '#5B8FF9',
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
