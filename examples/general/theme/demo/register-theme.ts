import { Pie, G2 } from '@antv/g2plot';

const { registerTheme } = G2;

registerTheme('custom-theme', {
  colors10: [
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
  ],
  colors20: [
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
    '#FFC328',
    '#A0DC2C',
    '#946DFF',
    '#626681',
    '#EB4185',
    '#CD8150',
    '#36BCCB',
    '#327039',
    '#803488',
    '#83BC99',
  ],
});

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
  label: {
    type: 'inner',
    offset: '-10%',
    content: '{percentage}',
  },
  interactions: [{ type: 'element-active' }],
  theme: 'custom-theme',
});

piePlot.render();
