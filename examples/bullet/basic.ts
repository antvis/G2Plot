import { Chart } from '@antv/g2';

/**
 * 基础子弹图
 * 场景：单个指标的实际值 vs 目标值展示，用于 KPI 考核与目标达成报告
 * 要点：type: 'view' 组合布局，children 同时包含 interval（实际值 bar）和 point（目标标记）
 */
const data = [
  { category: 'Sales', measure: 65, target: 75 },
  { category: 'Profit', measure: 45, target: 50 },
  { category: 'Conversion', measure: 72, target: 80 },
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
      style: { symbol: 'triangle', fill: '#FF6B35', stroke: '#FF6B35' },
    },
  ],
});

chart.render();