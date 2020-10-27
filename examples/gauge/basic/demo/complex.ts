import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  range: {
    ticks: [0, 0.2, 0.4, 0.75, 1],
    color: ['#9EDCA6', '#BFE8C3', '#EFF3DE', '#FFE9B8', '#FFDE94'],
  },
  indicator: {
    pointer: {
      style: {
        stroke: '#D0D0D0',
      },
    },
    pin: {
      style: {
        stroke: '#D0D0D0',
      },
    },
  },
  axis: {
    label: {
      formatter(v) {
        return Number(v) * 100;
      },
    },
    subTickLine: {
      count: 3,
    },
  },
  statistic: {
    content: {
      formatter: ({ percent }) => `Rate: ${percent * 100}%`,
    },
    style: {
      fontSize: 60,
    },
  },
});

gauge.render();
