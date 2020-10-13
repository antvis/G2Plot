import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  range: {
    ticks: [0, 0.2, 0.4, 0.75, 1],
    color: ['red', 'yellow', 'green'],
  },
  indicator: {
    pointer: {
      style: {
        stroke: 'pink',
      },
    },
    pin: {
      style: {
        stroke: 'blue',
      },
    },
  },
  axis: {
    label: {
      formatter(v: string) {
        return Number(v) * 100;
      },
    },
    subTickLine: {
      count: 3,
    },
  },
  statistic: {
    content: {
      formatter: ({ percent }) => `分数：${percent * 100}`,
    },
  },
});

gauge.render();
