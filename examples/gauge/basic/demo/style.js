import { Gauge } from '@antv/g2plot';

const gaugePlot = new Gauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '仪表盘样式',
  },
  value: 64,
  min: 0,
  max: 100,
  range: [20, 40, 60, 80],
  gaugeStyle: {
    colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
    // stripWidth: 30,
    // stripBackColor: '#ddd',
    // tickInterval: 20,
    // tickLabelPos: 'inner',
    // tickLabelSize: 16,
    // tickLabelColor: '#aaa',
    // tickLineColor: '#aaa',
    // subTickCount: 4,
    pointerColor: '#1890FF',
  },
});
gaugePlot.render();
