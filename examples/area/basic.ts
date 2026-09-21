import { Chart } from '@antv/g2';

/**
 * 基础面积图
 * 场景：单个连续变量的趋势，同时强调累积量级（如累计访问量、库存水位）
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
  type: 'area',
  data,
  encode: { x: 'month', y: 'value' },
  style: { fillOpacity: 0.3 },
});

chart.render();
