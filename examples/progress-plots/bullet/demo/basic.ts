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
    range: '#f0efff',
    measure: '#5B8FF9',
    target: '#3D76DD',
  },
  xAxis: {
    line: null,
  },
  yAxis: {
    tickMethod: ({ max }) => {
      const interval = Math.ceil(max / 5);
      // 自定义刻度 ticks
      return [0, interval, interval * 2, interval * 3, interval * 4, max];
    },
  },
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
        marker: { symbol: 'line', style: { stroke: '#3D76DD', r: 5 } },
      },
    ],
  },
});

bulletPlot.render();
