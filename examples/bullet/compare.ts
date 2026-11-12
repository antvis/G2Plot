/**
 * 多实际值堆叠的横向子弹图
 * 场景：将 Online 与 Retail 两个实际值堆叠为指标总量，再与各自目标刻线比较
 * 要点：实际值 interval 按 series 着色并 stackY，目标数据每个类别仅一行，背景区间独立着色
 */
import { Chart } from '@antv/g2';

const targetData = [
  { category: 'Revenue', target: 75 },
  { category: 'Profit', target: 50 },
  { category: 'Conversion', target: 80 },
];

const measureData = [
  { category: 'Revenue', measure: 40, target: 75, series: 'Online' },
  { category: 'Revenue', measure: 25, target: 75, series: 'Retail' },
  { category: 'Profit', measure: 30, target: 50, series: 'Online' },
  { category: 'Profit', measure: 15, target: 50, series: 'Retail' },
  { category: 'Conversion', measure: 45, target: 80, series: 'Online' },
  { category: 'Conversion', measure: 27, target: 80, series: 'Retail' },
];

const rangeData = targetData.flatMap(({ category }) => [
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
          key: 'rangeColor',
          domain: ['Poor', 'Fair', 'Good', 'Great'],
          range: ['#F0F0F0', '#D9D9D9', '#BFBFBF', '#8C8C8C'],
        },
      },
      style: { maxWidth: 36 },
      legend: { color: false },
      tooltip: false,
    },
    {
      type: 'interval',
      data: measureData,
      encode: { x: 'category', y: 'measure', color: 'series' },
      transform: [{ type: 'stackY' }],
      scale: {
        color: {
          key: 'measureColor',
          domain: ['Online', 'Retail'],
          range: ['#5B8FF9', '#5AD8A6'],
        },
      },
      style: { maxWidth: 16 },
      legend: { color: { position: 'top' } },
      labels: [
        {
          text: 'series',
          position: 'inside',
          style: { fontSize: 10, fill: '#FFFFFF' },
        },
      ],
      tooltip: {
        title: 'category',
        items: [
          { field: 'series', name: '渠道' },
          { field: 'measure', name: '实际值' },
          { field: 'target', name: '目标值' },
        ],
      },
    },
    {
      type: 'point',
      data: targetData,
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
});

chart.render();
