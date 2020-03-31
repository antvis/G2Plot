import { Gauge } from '@antv/g2plot';

const gaugePlot = new Gauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '仪表盘个性化配置',
  },
  width: 400,
  height: 400,
  value: 75,
  min: 0,
  max: 100,
  range: [0, 75],
  color: ['l(0) 0:#5d7cef 1:#e35767'],
  axis: {
    offset: -15,
    tickLine: {
      visible: true,
      length: 10,
    },
    label: {
      visible: false,
    },
  },
  pivot: {
    visible: true,
    thickness: 10,
    pointer: {
      visible: true,
      style: {
        fill: '#e25869',
      },
    },
    pin: {
      visible: true,
      style: {
        fill: '#e8e6ea',
      },
    },
  },
  statistic: {
    visible: true,
    position: ['50%', '100%'],
    text: '26/48',
    color: '#2e3033',
    size: 40,
  },
});
gaugePlot.render();
