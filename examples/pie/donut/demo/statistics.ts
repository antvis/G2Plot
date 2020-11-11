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
  meta: {
    value: {
      formatter: (v) => `¥ ${v}`,
    },
  },
  label: { formatter: ({ percent }) => `${percent * 100} %` },
  statistic: {
    title: {
      offsetY: -8,
    },
    content: {
      offsetY: -4,
    },
  },
  // 添加 中心统计文本 交互
  interactions: [
    { type: 'element-selected' },
    { type: 'element-active' },
    {
      type: 'pie-statistic-active',
      cfg: {
        start: [
          { trigger: 'element:mouseenter', action: 'pie-statistic:change' },
          { trigger: 'legend-item:mouseenter', action: 'pie-statistic:change' },
        ],
        end: [
          { trigger: 'element:mouseleave', action: 'pie-statistic:reset' },
          { trigger: 'legend-item:mouseleave', action: 'pie-statistic:reset' },
        ],
      },
    },
  ],
});

piePlot.render();
