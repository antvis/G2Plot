/**
 * 堆叠多系列玫瑰图
 * 场景：比较各产品的销售总量，同时观察 Q1、Q2 对总量的构成
 * 要点：堆叠布局必须显式使用 stackY；与分组 dodgeX 不可混用
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
  transform: [{ type: 'stackY' }],
});

chart.render();
