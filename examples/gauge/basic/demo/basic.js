import { Gauge } from '@antv/g2plot';

const gaugePlot = new Gauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '仪表盘',
  },
  width: 400,
  height: 400,
  value: 64,
  min: 0,
  max: 100,
  gaugeStyle: {
    colors: ['#f4664a', '#faad14', '#a0d911', '#30bf78'],
    tickLabelSize: 20,
  },
});
gaugePlot.render();
