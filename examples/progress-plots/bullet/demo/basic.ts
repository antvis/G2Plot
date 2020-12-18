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
  color: {
    range: '#f0fbff',
    measure: '#1890ff',
    target: '#43a5ff',
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
        marker: { symbol: 'square', style: { fill: '#1890ff', r: 5 } },
      },
      {
        value: '目标值',
        name: '目标值',
        marker: { symbol: 'line', style: { stroke: '#43a5ff', r: 5 } },
      },
    ],
  },
});

bulletPlot.render();
