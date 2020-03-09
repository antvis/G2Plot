import { FanGauge } from '@antv/g2plot';
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
  font-size: 16px;
  color: #8c8c8c;
  font-weight: 300;
}
.g2plot-gauge-label .title {
  font-size: 30px;
  color: #000000;
  font-weight: bold;
}
`);

const gaugePlot = new FanGauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '扇形仪表盘',
  },
  style: 'fan',
  width: 400,
  height: 400,
  value: 34,
  min: 0,
  max: 100,
  range: [0, 70],
  format: (v) => {
    return v + '%';
  },
  statistic: () => {
    return '<div class="g2plot-gauge-label"><p class="title">70%</p><p class="value">系统进度</p></div>';
  },
  gaugeStyle: {
    colors: ['l(0) 0:#b0d0ff 1:#5f92f9'],
    tickLabelSize: 16,
    stripWidth: 20,
    pointerColor: 'rgba(0,0,0,0)',
    statisticPos: ['50%', '80%'],
    tickLabelPos: 'outer',
  },
});
gaugePlot.render();