/**
 * 品牌配色横向子弹图
 * 场景：使用深蓝色实际值与品牌橙红色虚线目标刻线，并自定义定性区间配色
 * 要点：三层结构保持不变，分别配置背景色阶、实际值样式和 point 目标线样式
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
          range: ['#FFF1E8', '#FFD8BF', '#FFBB96', '#FF9C6E'],
        },
      },
      style: { maxWidth: 36 },
      tooltip: false,
    },
    {
      type: 'interval',
      data,
      encode: { x: 'category', y: 'measure', color: '#5B8FF9' },
      style: { maxWidth: 16, stroke: '#2F54EB', lineWidth: 1 },
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
  axis: {
    x: { labelAlign: 'center' },
    y: { title: '完成度 (%)' },
  },
  legend: { color: { position: 'right' } },
});

chart.render();
