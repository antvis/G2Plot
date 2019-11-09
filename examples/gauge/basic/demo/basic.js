import { Gauge } from '@antv/g2plot';

const gaugePlot = new Gauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '仪表盘',
  },
  value: 64,
  min: 0,
  max: 100,
  range: [20, 40, 60, 80],
});
gaugePlot.render();
