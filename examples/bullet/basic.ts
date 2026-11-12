/**
 * 基础横向子弹图
 * 场景：展示单个 KPI 的实际值、目标值与定性区间
 * 要点：宽 interval 绘制堆叠背景区间，窄 interval 绘制实际值，point 的 line 形状绘制目标刻线
 */
import { Chart } from '@antv/g2';

const data = [{ category: 'Sales', measure: 65, target: 75 }];

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
  legend: false,
});

chart.render();
