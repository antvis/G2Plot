import { Chart } from '@antv/g2';

/**
 * 环形图（Donut）
 * 场景：占比构成 + 中心展示汇总指标（如总销售额），Dashboard 常用
 * 要点：coordinate.theta 设置 innerRadius；中心文字用 title 或 annotations
 */
const data = [
  { category: '电子产品', value: 40 },
  { category: '服装', value: 25 },
  { category: '食品', value: 20 },
  { category: '其他', value: 15 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', innerRadius: 0.6 },
  labels: [
    { text: 'category', position: 'outside', style: { fontSize: 12 } },
  ],
  legend: { color: { position: 'bottom' } },
});

chart.render();
