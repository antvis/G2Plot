/**
 * 带达成率的横向子弹图
 * 场景：在完整子弹图中标注实际值及其相对目标的完成百分比
 * 要点：三层结构保持不变，实际值标签使用数据回调，目标刻线使用虚线样式
 */
import { Chart } from '@antv/g2';

const data = [
  { category: 'Sales', measure: 65, target: 75 },
  { category: 'Profit', measure: 45, target: 50 },
  { category: 'Conversion', measure: 72, target: 80 },
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
      labels: [
        {
          text: (d: any) => `${d.measure} (${Math.round((d.measure / d.target) * 100)}%)`,
          position: 'right',
          style: { fontSize: 10 },
        },
      ],
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
        color: '#FF6B35',
        size: 8,
      },
      style: { stroke: '#FF6B35', lineDash: [4, 4], lineWidth: 2 },
      tooltip: false,
    },
  ],
  legend: false,
});

chart.render();
