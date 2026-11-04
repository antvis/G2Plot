import { Chart } from '@antv/g2';

/**
 * 进度条子弹图
 * 场景：展示指标完成进度，bar 显示已完成比例，留白显示未完成比例，以及达成目标线
 * 要点：type: 'view' 组合布局，interval y=measure, color=measure用sequential色阶，point mark 表示目标值
 * labels 回调显示数值和百分比
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
      style: { symbol: 'line', stroke: '#5B8FF9', lineDash: [4, 4] },
    },
  ],
  scale: {
    color: {
      type: 'sequential',
      palette: 'YlOrRd',
    },
  },
  labels: [
    { text: (d: any) => `${d.measure} (${Math.round((d.measure / d.target) * 100)}%)`, position: 'end', style: { fontSize: 10 } },
  ],
});

chart.render();