import { Gauge } from '@antv/g2plot';
import insertCss from 'insert-css';

insertCss(`
.g2plot-gauge-label {
  width: 100px;
  height: 100px;
  vertical-align: middle;
  text-align: center;
  line-height: 0.2;
}
.g2plot-gauge-label .value {
  font-size: 20px;
  color: #8c8c8c;
  font-weight: 300;
}
.g2plot-gauge-label .title {
  font-size: 30px;
  color: #faad14;
  font-weight: bold;
}
`);

const gaugePlot = new Gauge(document.getElementById('container'), {
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
  style: 'meter',
  statistic: () => {
    return '<div class="g2plot-gauge-label"><p class="title">良</p><p class="value">系统表现</p></div>';
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