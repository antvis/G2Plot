/**
 * 暗色主题横向子弹图
 * 场景：在暗色报表中展示带标题、定性区间、实际值与目标刻线的子弹图
 * 要点：theme 使用 classicDark，三层结构不变，背景区间与实际值采用暗场可辨识配色
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
  theme: 'classicDark',
  coordinate: { transform: [{ type: 'transpose' }] },
  title: {
    title: '指标达成情况分析',
    subtitle: '单位：%',
    align: 'left',
    titleFontSize: 16,
    titleFill: '#FFFFFF',
    subtitleFontSize: 12,
    subtitleFill: '#A6A6A6',
  },
  children: [
    {
      type: 'interval',
      data: rangeData,
      encode: { x: 'category', y: 'range', color: 'level' },
      transform: [{ type: 'stackY' }],
      scale: {
        color: {
          domain: ['Poor', 'Fair', 'Good', 'Great'],
          range: ['#3A3A3A', '#4A4A4A', '#5A5A5A', '#6A6A6A'],
        },
      },
      style: { maxWidth: 36 },
      tooltip: false,
    },
    {
      type: 'interval',
      data,
      encode: { x: 'category', y: 'measure', color: '#5AD8A6' },
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
        color: '#FFFFFF',
        size: 8,
      },
      tooltip: false,
    },
  ],
  legend: { color: { position: 'right' } },
});

chart.render();
