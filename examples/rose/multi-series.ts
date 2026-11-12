/**
 * 分组多系列玫瑰图
 * 场景：在同一类别下并排对比 Q1、Q2 的销售量，便于比较单系列绝对值
 * 要点：color 只负责分色；分组布局必须显式使用 dodgeX
 */
import { Chart } from '@antv/g2';

const data = [
  { product: '产品A', value: 120, series: 'Q1' },
  { product: '产品B', value: 200, series: 'Q1' },
  { product: '产品C', value: 150, series: 'Q1' },
  { product: '产品D', value: 280, series: 'Q1' },
  { product: '产品E', value: 220, series: 'Q1' },
  { product: '产品F', value: 350, series: 'Q1' },
  { product: '产品A', value: 180, series: 'Q2' },
  { product: '产品B', value: 250, series: 'Q2' },
  { product: '产品C', value: 160, series: 'Q2' },
  { product: '产品D', value: 300, series: 'Q2' },
  { product: '产品E', value: 260, series: 'Q2' },
  { product: '产品F', value: 400, series: 'Q2' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  coordinate: { type: 'polar' },
  encode: { x: 'product', y: 'value', color: 'series' },
  transform: [{ type: 'dodgeX' }],
});

chart.render();
