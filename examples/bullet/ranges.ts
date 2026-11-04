import { Chart } from '@antv/g2';

/**
 * 定性区间子弹图
 * 场景：在子弹图背景中展示 Poor/Fair/Good/Great 四个定性区间，配合实际值和目标值观察达成等级
 * 要点：type: 'view' 组合布局，interval color 映射 range 字段，point mark 表示目标值
 * scale.color 四段色：Poor/Fair/Good/Great
 */
const data = [
  { category: 'Sales', measure: 65, target: 75, range: 'good' },
  { category: 'Profit', measure: 45, target: 50, range: 'fair' },
  { category: 'Conversion', measure: 72, target: 80, range: 'great' },
  { category: 'Retention', measure: 88, target: 90, range: 'poor' },
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
        color: 'range',
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
  scale: {
    color: {
      type: 'ordinal',
      range: ['#D8E2DC', '#8C9EAB', '#5B8FF9', '#2F4554'],
    },
  },
  legend: { color: { position: 'right' } },
});

chart.render();