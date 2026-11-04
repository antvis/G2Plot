import { Chart } from '@antv/g2';

/**
 * 带数据标签的熊蜂图
 * 场景：每个数据点旁标注具体数值，适合数据量适中（≤ 50 个点）的分布展示
 */
const data = [
  { category: 'Control', value: 12.5 },
  { category: 'Control', value: 15.3 },
  { category: 'Control', value: 11.8 },
  { category: 'Control', value: 13.2 },
  { category: 'Treatment', value: 22.1 },
  { category: 'Treatment', value: 19.7 },
  { category: 'Treatment', value: 23.4 },
  { category: 'Treatment', value: 21.0 },
  { category: 'Treatment', value: 24.5 },
  { category: 'Treatment', value: 18.8 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: {
    x: 'category',
    y: 'value',
  },
  style: {
    fill: '#5B8FF9',
    stroke: '#1890FF',
    lineWidth: 2,
  },
  labels: [
    { text: 'value', position: 'top', style: { fontSize: 10 } },
  ],
  axis: {
    x: { title: '实验组' },
    y: { title: '数值', min: 0 },
  },
  legend: false,
  tooltip: {
    title: '类别',
    items: [{ channel: 'y', name: '数值' }],
  },
});

chart.render();