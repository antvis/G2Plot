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
  radius: 1,
  innerRadius: 0.6,
  label: {
    type: 'inner',
    offset: '-50%',
    content: '{value}',
    style: {
      textAlign: 'center',
      fontSize: 14,
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  statistic: {
    title: false,
    content: {
      style: {
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      formatter: () => 'AntV\nG2Plot',
    },
  },
});

piePlot.render();
