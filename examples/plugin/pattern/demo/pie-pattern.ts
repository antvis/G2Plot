import { Pie } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const plot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.6,
  label: false,
  pattern: {
    type: 'dot',
    cfg: {
      size: 4,
      padding: 5,
    },
  },
  interactions: [{ type: 'element-active' }],
});

plot.render();
