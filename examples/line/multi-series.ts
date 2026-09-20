import { Chart } from '@antv/g2';

/**
 * 多系列折线图
 * 场景：多条趋势线对比，通过 color 通道映射系列字段
 */
const data = [
  { month: 'Jan', series: '销售额', value: 120 },
  { month: 'Feb', series: '销售额', value: 200 },
  { month: 'Mar', series: '销售额', value: 150 },
  { month: 'Apr', series: '销售额', value: 280 },
  { month: 'May', series: '销售额', value: 220 },
  { month: 'Jun', series: '销售额', value: 350 },
  { month: 'Jan', series: '利润', value: 40 },
  { month: 'Feb', series: '利润', value: 90 },
  { month: 'Mar', series: '利润', value: 60 },
  { month: 'Apr', series: '利润', value: 120 },
  { month: 'May', series: '利润', value: 95 },
  { month: 'Jun', series: '利润', value: 160 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', color: 'series' },
});

chart.render();
