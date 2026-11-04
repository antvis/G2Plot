import { Chart } from '@antv/g2';

/**
 * 纵向子弹图
 * 场景：类别名称较长或希望纵向布局以节省横向空间，适合展示较多指标而不重叠
 * 要点：type: 'view' 组合布局，interval x=measure, y=category，point x=target, y=category
 * 轴标题设置 '完成度 (%)'，图例隐藏
 */
const data = [
  { category: 'Sales', measure: 65, target: 75 },
  { category: 'Profit', measure: 45, target: 50 },
  { category: 'Conversion', measure: 72, target: 80 },
  { category: 'Retention', measure: 88, target: 90 },
  { category: 'Growth', measure: 35, target: 50 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: {
        x: 'measure',
        y: 'category',
      },
    },
    {
      type: 'point',
      encode: {
        x: 'target',
        y: 'category',
      },
      style: { symbol: 'diamond', fill: '#5B8FF9', stroke: '#5B8FF9' },
    },
  ],
  axis: {
    x: { title: '完成度 (%)' },
    y: { title: null },
  },
  legend: false,
});

chart.render();