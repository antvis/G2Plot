import { Chart } from '@antv/g2';

/**
 * 堆叠柱状图
 * 场景：对比各类别总量，同时看内部构成（各月总销量及其渠道构成）
 * 要点：transform 用 stackY；与 dodgeX 的区别是堆叠看总量、分组看单值
 */
const data = [
  { month: 'Jan', channel: '线上', sales: 220 },
  { month: 'Feb', channel: '线上', sales: 280 },
  { month: 'Mar', channel: '线上', sales: 250 },
  { month: 'Apr', channel: '线上', sales: 320 },
  { month: 'Jan', channel: '线下', sales: 120 },
  { month: 'Feb', channel: '线下', sales: 150 },
  { month: 'Mar', channel: '线下', sales: 180 },
  { month: 'Apr', channel: '线下', sales: 140 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'month', y: 'sales', color: 'channel' },
  transform: [{ type: 'stackY' }],
});

chart.render();
