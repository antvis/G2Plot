import { Chart } from '@antv/g2';

/**
 * 基础折线图
 * 场景：单个连续变量随时间（或有序类别）的变化趋势
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
  height: 360,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value' },
});

chart.render();
