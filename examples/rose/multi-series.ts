import { Chart } from '@antv/g2';

/**
 * 多系列玫瑰图
 * 场景：对比不同时期或不同部门的产品类别分布，展示多组数据的类别级别比较
 * 要点：在 encode 中增加 color 通道映射 series 字段，实现系列分组显色；type: 'rose'
 */
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
  type: 'rose',
  data,
  encode: { value: 'value', color: 'series' },
});

chart.render();