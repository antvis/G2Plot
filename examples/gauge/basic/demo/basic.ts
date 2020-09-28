import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.65,
  range: {
    color: ['l(0) 0:#5d7cef 1:#e35767'],
  },
});

gauge.render();
