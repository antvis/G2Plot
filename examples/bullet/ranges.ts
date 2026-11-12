/**
 * 四段定性区间子弹图
 * 场景：通过 Poor/Fair/Good/Great 背景区间观察指标等级，同时对比实际值与目标值
 * 要点：背景 interval 使用 stackY 堆叠四段 range，实际值 interval 更窄，目标使用 point 刻线
 */
import { Chart } from '@antv/g2';

const data = [
  { category: 'Sales', measure: 65, target: 75 },
  { category: 'Profit', measure: 45, target: 50 },
  { category: 'Conversion', measure: 72, target: 80 },
  { category: 'Retention', measure: 88, target: 90 },
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
          range: ['#D8E2DC', '#8C9EAB', '#5B8FF9', '#2F4554'],
        },
      },
      style: { maxWidth: 36 },
      tooltip: false,
    },
    {
      type: 'interval',
      data,
      encode: { x: 'category', y: 'measure', color: '#FF6B35' },
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
