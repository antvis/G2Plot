import { Chart } from '@antv/g2';

/**
 * 多组别对比的熊蜂图
 * 场景：通过颜色分组展示多个实验/处理方案的数值分布差异
 */
const data = [
  { category: 'Control', value: 12.5, group: 'A' },
  { category: 'Control', value: 15.3, group: 'A' },
  { category: 'Control', value: 11.8, group: 'B' },
  { category: 'Control', value: 13.2, group: 'B' },
  { category: 'Treatment', value: 22.1, group: 'A' },
  { category: 'Treatment', value: 19.7, group: 'A' },
  { category: 'Treatment', value: 23.4, group: 'B' },
  { category: 'Treatment', value: 21.0, group: 'B' },
  { category: 'Treatment', value: 24.5, group: 'A' },
  { category: 'Treatment', value: 18.8, group: 'B' },
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
    color: 'group',
  },
  style: {
    strokeWidth: 2,
  },
  axis: {
    x: { title: '实验组' },
    y: { title: '数值', min: 0 },
  },
  legend: {
    color: { position: 'top' },
  },
  tooltip: {
    title: '类别',
    items: [
      { channel: 'color', name: '组别' },
      { channel: 'y', name: '数值' },
    ],
  },
});

chart.render();