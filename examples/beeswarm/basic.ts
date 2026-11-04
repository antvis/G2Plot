import { Chart } from '@antv/g2';

/**
 * 基础熊蜂图
 * 场景：展示不同实验组的数值分布，每个数据点均可见
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
  axis: {
    x: { title: '实验组' },
    y: { title: '数值', min: 0 },
  },
  legend: false,
});

chart.render();