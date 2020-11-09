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
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.6,
  label: {
    type: 'inner',
    offset: '-50%',
    content: '{percentage}',
    style: {
      fill: '#fff',
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  statistic: {
    title: false,
    content: {
      style: {
        fontSize: 44,
      },
      formatter: () => 'AntV\nG2Plot',
    },
  },
});

piePlot.render();
