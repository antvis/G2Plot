import { MeterGauge } from '@antv/g2plot';

const gaugePlot = new MeterGauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '刻度仪表盘',
  },
  width: 400,
  height: 400,
  value: 40,
  min: 0,
  max: 100,
  range: [0, 25, 50, 75, 100],
  statistic: {
    visible: true,
    text: '良',
    color: '#faad14',
  },
  gaugeStyle: {
    colors: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
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
