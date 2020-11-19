import { Pie } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const piePlot = new Pie('container', {
  appendPadding: 10,
  data,
  theme: 'dark',
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.64,
  meta: {
    value: {
      formatter: (v) => `¥ ${v}`,
    },
  },
  label: {
    type: 'inner',
    offset: '-50%',
    autoRotate: false,
    style: { textAlign: 'center', fill: '#fff' },
    formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
  },
  statistic: {
    title: {
      offsetY: -8,
      style: { color: '#fff' },
    },
    content: {
      style: { color: '#fff' },
      offsetY: -4,
    },
  },
  pieStyle: { lineWidth: '' },
});

piePlot.render();
