import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  range: {
    color: ['l(0) 0:#bde8ff 1:#7eabff'],
  },
  indicator: {
    pin: false,
    pointer: false,
  },
  statistic: {
    content: {
      style: {
        fontSize: '48px',
        lineHeight: '48px',
        textBaseline: 'bottom',
      },
    },
  },
});

gauge.render();
