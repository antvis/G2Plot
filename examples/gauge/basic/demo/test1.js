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
  color: #30bf78;
  font-weight: bold;
}
`);

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
  gaugeStyle: {
    colors: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
    tickLabelSize: 20,
  },
  statistic: () => {
    return '<div class="g2plot-gauge-label"><p class="title">优</p><p class="value">系统表现</p></div>';
  },
});
gaugePlot.render();