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
  range: [0, 70],
  startAngle: -1,
  endAngle: 0,
  gaugeStyle: {
    colors: ['l(0) 0:#b0d0ff 1:#5f92f9'],
    tickLabelSize: 20,
    stripWidth: 15,
    pointerColor: 'rgba(0,0,0,0)',
  },
});
gaugePlot.render();
