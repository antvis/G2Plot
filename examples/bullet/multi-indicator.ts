/**
 * 多指标横向子弹图
 * 场景：并列展示多个 KPI 的实际值、目标值与定性区间
 * 要点：每个类别共享三层子弹图结构，背景区间按类别堆叠，目标使用 point 刻线
 */
import { Chart } from '@antv/g2';

const data = [
  { category: 'Sales', measure: 65, target: 75 },
  { category: 'Profit', measure: 45, target: 50 },
  { category: 'Conversion', measure: 72, target: 80 },
  { category: 'Retention', measure: 88, target: 90 },
  { category: 'Growth', measure: 35, target: 50 },
];

const rangeData = data.flatMap(({ category }) => [
  { category, range: 40, level: 'Poor' },
  { category, range: 20, level: 'Fair' },
  { category, range: 20, level: 'Good' },
  { category, range: 20, level: 'Great' },
]);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  children: [
    {
      type: 'interval',
      data: rangeData,
      encode: { x: 'category', y: 'range', color: 'level' },
      transform: [{ type: 'stackY' }],
      scale: {
        color: {
          domain: ['Poor', 'Fair', 'Good', 'Great'],
          range: ['#F0F0F0', '#D9D9D9', '#BFBFBF', '#8C8C8C'],
        },
      },
      style: { maxWidth: 36 },
      tooltip: false,
    },
    {
      type: 'interval',
      data,
      encode: { x: 'category', y: 'measure', color: '#5B8FF9' },
      style: { maxWidth: 16 },
      tooltip: {
        title: 'category',
        items: [
          { field: 'measure', name: '实际值' },
          { field: 'target', name: '目标值' },
        ],
      },
    },
    {
      type: 'point',
      data,
      encode: {
        x: 'category',
        y: 'target',
        shape: 'line',
        color: '#262626',
        size: 8,
      },
      tooltip: false,
    },
  ],
  legend: { color: { position: 'right' } },
});

chart.render();
