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
  innerRadius: 0.64,
  label: {
    type: 'inner',
    offset: -35,
    autoRotate: false,
    content: '{value}',
    style: {
      fill: '#333',
      stroke: '#fff',
      strokeWidth: 1,
    },
  },
  statistic: {
    title: {
      formatter: () => '总计',
    },
  },
  // 添加 中心统计文本 交互
  interactions: [{ type: 'pie-statistic-active' }],
});

piePlot.render();
