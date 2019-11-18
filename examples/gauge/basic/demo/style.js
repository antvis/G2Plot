import { Gauge } from '@antv/g2plot';

const gaugePlot = new Gauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '仪表盘样式',
  },
  width: 400,
  height: 400,
  value: 64,
  min: 0,
  max: 100,
  range: [20, 40, 60, 80],
  gaugeStyle: {
    colors: ['#f4664a', '#faad14', '#a0d911', '#30bf78'],
    tickLabelSize: 20,
    // stripWidth: 30,
    // stripBackColor: '#ddd',
    // tickInterval: 20,
    // tickLabelPos: 'inner',
    // tickLabelSize: 16,
    // tickLabelColor: '#aaa',
    // tickLineColor: '#aaa',
    // subTickCount: 4,
    // pointerColor: '#1890FF',
  },
});
gaugePlot.render();
