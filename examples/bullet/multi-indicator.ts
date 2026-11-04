import { Chart } from '@antv/g2';

/**
 * 多指标子弹图
 * 场景：并列展示多个指标的实际值与目标值达成情况，适合管理报表一次性查看多 KPI
 * 要点：type: 'view' 组合布局，multiple categories with color auto-division；point mark 表示目标值
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
        x: 'category',
        y: 'measure',
      },
    },
    {
      type: 'point',
      encode: {
        x: 'category',
        y: 'target',
      },
      style: { symbol: 'diamond', fill: '#FF6B35', stroke: '#FF6B35' },
    },
  ],
  legend: { color: { position: 'right' } },
});

chart.render();