import { Chart } from '@antv/g2';

/**
 * 平滑折线图
 * 场景：弱化单点波动、强调整体趋势；shape 通道设为 'smooth'
 */
const data = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 150 },
  { month: 'Apr', value: 280 },
  { month: 'May', value: 220 },
  { month: 'Jun', value: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', shape: 'smooth' },
});

chart.render();
