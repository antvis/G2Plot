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
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }],
});

piePlot.render();
setInterval(() => {
  piePlot.changeData(data.map((d) => ({ ...d, value: d.value * Math.random() })));
}, 1200);
