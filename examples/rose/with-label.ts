import { Chart } from '@antv/g2';

/**
 * 带数据标签的玫瑰图
 * 场景：需要在每个花瓣上直接标注数值的场景，便于快速阅读具体数值而不依赖 tooltip
 * 要点：通过 `labels` 配置将数值文本展示在花瓣外侧，`position: 'outside'` 确保标签不被遮挡
 */
const data = [
  { product: '产品A', value: 120 },
  { product: '产品B', value: 200 },
  { product: '产品C', value: 150 },
  { product: '产品D', value: 280 },
  { product: '产品E', value: 220 },
  { product: '产品F', value: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rose',
  data,
  encode: { value: 'value' },
  labels: [{ text: 'value', position: 'outside', style: { fontSize: 10 } }],
  tooltip: {
    title: 'product',
    items: [{ channel: 'value', name: '数值', valueFormatter: (v) => `${v}` }],
  },
});

chart.render();