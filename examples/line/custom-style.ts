import { Chart } from '@antv/g2';

/**
 * 样式自定义：多系列折线图的常用视觉定制
 * 覆盖：系列调色板、线宽、坐标轴标题、图例位置
 */
const data = [
  { month: 'Jan', series: '销售额', value: 120 },
  { month: 'Feb', series: '销售额', value: 200 },
  { month: 'Mar', series: '销售额', value: 150 },
  { month: 'Apr', series: '销售额', value: 280 },
  { month: 'Jan', series: '利润', value: 40 },
  { month: 'Feb', series: '利润', value: 90 },
  { month: 'Mar', series: '利润', value: 60 },
  { month: 'Apr', series: '利润', value: 120 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', color: 'series' },
  // 系列调色板（按 series 字段值序着色）
  scale: {
    color: { range: ['#5B8FF9', '#5AD8A6'] },
  },
  // 线样式：线宽、虚线；单系列场景也可在此用 stroke 固定颜色
  style: { lineWidth: 3, lineDash: [6, 4] },
  // 坐标轴标题与样式
  axis: {
    x: { title: '月份' },
    y: { title: '金额（万元）' },
  },
  // 图例位置
  legend: { color: { position: 'top' } },
});

chart.render();
