import { Pie } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const pattern = ({ type }) => {
  if (type === '分类一') {
    return {
      type: 'line',
      cfg: {
        lineWidth: 6,
        spacing: 5,
      },
    };
  } else if (type === '分类三') {
    return {
      type: 'dot',
      cfg: {
        size: 10,
      },
    };
  }
  return;
};

const piePlot = new Pie('container', {
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.7,
  innerRadius: 0.6,
  label: {
    type: 'outer',
    offset: '50%',
    content: '{value}',
    style: {
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
      content: 'AntV\nG2Plot',
    },
  },
  pattern,
});

piePlot.update({
  theme: {
    styleSheet: {
      brandColor: '#014c63',
      paletteQualitative10: [
        '#014c63',
        '#168575',
        '#0bc286',
        '#96dcb0',
        '#F2EAEA',
        '#FFA884',
        '#FF6836',
        '#D13808',
        '#7A270E',
      ],
      paletteQualitative20: [
        '#014c63',
        '#10686c',
        '#168575',
        '#16a37e',
        '#0bc286',
        '#65cf9b',
        '#96dcb0',
        '#c1e8c5',
        '#F2EAEA',
        '#FFC5AC',
        '#FFA884',
        '#FF895D',
        '#FF6836',
        '#F3470D',
        '#D13808',
        '#A4300C',
        '#7A270E',
      ],
    },
  },
});
piePlot.render();
