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

const gaugePlot = new Gauge(document.getElementById('container'), {
  title: {
    visible: true,
    text: '半圆仪表盘',
  },
  width: 400,
  height: 400,
  value: 64,
  min: 0,
  max: 100,
  range: [0, 70],
  startAngle: -1,
  endAngle: 0,
  format: (v) => {
    if (v === 0 || v === 100) {
      return v + '%';
    }
    return '';
  },
  label: () => {
    return '<div class="g2plot-gauge-label"><p class="title">70%</p><p class="value">加载进度</p></div>';
  },
  gaugeStyle: {
    colors: ['l(0) 0:#b0d0ff 1:#5f92f9'],
    tickLabelSize: 16,
    stripWidth: 20,
    pointerColor: 'rgba(0,0,0,0)',
    labelPos: ['50%', '80%'],
    tickLabelPos: 'outer',
  },
});
gaugePlot.render();
