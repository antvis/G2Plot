import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  range: {
    ticks: [0, 1],
    color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
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
      style: {
        fontSize: '36px',
        lineHeight: '36px',
      },
    },
  },
});

gauge.render();
