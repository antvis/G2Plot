import { Chart } from '@antv/g2';

/**
 * 基础柱状图
 * 场景：无序/有序类别间的数值对比（各产品销量、各部门人数）
 */
const data = [
  { product: '手机', sales: 320 },
  { product: '平板', sales: 200 },
  { product: '耳机', sales: 150 },
  { product: '手表', sales: 280 },
  { product: '音箱', sales: 90 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'product', y: 'sales' },
});

chart.render();
