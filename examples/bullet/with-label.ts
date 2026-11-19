/**
 * 带标签与格式化提示的横向子弹图
 * 场景：标注实际值和达成率，并在 tooltip 中同时展示实际值与真实 target 字段
 * 要点：labels 配置在实际值 interval 上，tooltip 使用 field 读取 measure/target，不使用 y2
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
          style: { fontSize: 11, fill: '#262626' },
        },
      ],
      tooltip: {
        title: 'category',
        items: [
          {
            field: 'measure',
            name: '实际值',
            valueFormatter: (value) => `${value} 单位`,
          },
          {
            field: 'target',
            name: '目标值',
            valueFormatter: (value) => `${value} 单位`,
          },
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
