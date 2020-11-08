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
  radius: 1,
  innerRadius: 0.64,
  meta: {
    value: {
      formatter: (v) => `${v} ¥`,
    },
  },
  label: {
    type: 'inner',
    offset: '-50%',
    autoRotate: false,
    content: '{value}',
    style: {
      textAlign: 'center',
    },
  },
  statistic: {
    title: false,
    content: {
      formatter: (datum, data) => (datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`),
    },
  },
  // 添加 中心统计文本 交互
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }],
});

piePlot.render();
