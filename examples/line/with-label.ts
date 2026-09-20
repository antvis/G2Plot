import { Chart } from '@antv/g2';

/**
 * 数据标签与 tooltip 自定义
 * labels：每个数据点旁直接展示数值；tooltip：悬浮提示的标题与条目格式化
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
  type: 'line',
  data,
  encode: { x: 'month', y: 'value' },
  // 数据标签：text 为字段名，position 相对图形的位置
  labels: [{ text: 'value', position: 'top', style: { fontSize: 10, fill: '#666' } }],
  // tooltip 自定义：title 取 x 字段，items 重命名 y 通道并格式化
  tooltip: {
    title: 'month',
    items: [{ channel: 'y', name: '销售额', valueFormatter: (v) => `${v} 万元` }],
  },
});

chart.render();
