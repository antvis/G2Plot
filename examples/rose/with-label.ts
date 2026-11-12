/**
 * 带数据标签的环形玫瑰图
 * 场景：预留中心区域，并在花瓣外侧直接展示数值以便阅读
 * 要点：polar.innerRadius 设置内孔；labels 展示标签；tooltip.items 用 field 指定原始字段
 */
import { Chart } from '@antv/g2';

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
  type: 'interval',
  data,
  coordinate: { type: 'polar', innerRadius: 0.25 },
  encode: { x: 'product', y: 'value', color: 'product' },
  labels: [{ text: 'value', position: 'outside', style: { fontSize: 10 } }],
  tooltip: {
    title: 'product',
    items: [{ field: 'value', name: '数值', valueFormatter: (v) => `${v}` }],
  },
});

chart.render();
