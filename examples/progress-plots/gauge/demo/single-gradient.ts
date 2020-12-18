import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  range: {
    color: 'l(0) 0:#bde8ff 1:#9ec9ff',
  },
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  indicator: null,
  statistic: {
    title: {
      offsetY: -36,
      style: {
        fontSize: '36px',
        color: '#4B535E',
      },
      formatter: () => '70%',
    },
    content: {
      style: {
        fontSize: '24px',
        lineHeight: '44px',
        color: '#4B535E',
      },
      formatter: () => '加载进度',
    },
  },
});

gauge.render();
