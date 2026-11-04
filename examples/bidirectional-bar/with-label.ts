import { Chart } from '@antv/g2';

/**
 * 带数据标签的双向条形图
 * 场景：每个条上直接标注数值，便于快速读取正负大小
 */
const data = [
  { category: '东区', value: 120 },
  { category: '西区', value: -80 },
  { category: '北区', value: 150 },
  { category: '南区', value: -50 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'value', y: 'category' },
  scale: { x: { nice: false } },
  coordinate: { transform: [{ type: 'transpose' }] },
  labels: [
    { text: 'value', position: 'right', style: { fontSize: 10 } },
    { text: (d: { value: number }) => (d.value > 0 ? '+' : '') + String(d.value), position: 'left', style: { fontSize: 10, fill: '#fff' } },
  ],
  tooltip: {
    title: 'category',
    items: [
      {
        channel: 'x',
        name: '数值',
        valueFormatter: (v: number) => (v > 0 ? '+' : '') + String(v) + ' 件',
      },
    ],
  },
});

chart.render();