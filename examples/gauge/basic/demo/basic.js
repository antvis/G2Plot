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
  range: [0, 25, 50, 75, 100],
  color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
  statistic: {
    visible: true,
    text: '优',
    color: '#30bf78',
  },
});
gaugePlot.render();
