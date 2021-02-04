import { Pie } from '@antv/g2plot';

const data = [
  { name: '分类一', value: 27 },
  { name: '分类二', value: 25 },
  { name: '分类三', value: 18 },
  { name: '分类四', value: 15 },
  { name: '分类五', value: 10 },
  { name: '其他', value: 5 },
];

const piePlot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'name',
  radius: 0.8,
  label: {
    type: 'outer',
  },
  interactions: [{ type: 'element-active' }],
});

piePlot.render();
