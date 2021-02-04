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
  // 设置圆弧起始角度
  startAngle: Math.PI,
  endAngle: Math.PI * 1.5,
  label: {
    type: 'inner',
    offset: '-8%',
    content: '{name}',
    style: { fontSize: 18 },
  },
  interactions: [{ type: 'element-active' }],
  pieStyle: {
    lineWidth: 0,
  },
});

piePlot.render();
