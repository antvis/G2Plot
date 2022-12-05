import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  radius: 0.75,
  range: {
    color: '#30BF78',
    width: 12,
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
  statistic: {
    content: {
      formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
    },
    style: {
      fontSize: 60,
    },
  },
  gaugeStyle: {
    lineCap: 'round',
  },
});

gauge.render();
