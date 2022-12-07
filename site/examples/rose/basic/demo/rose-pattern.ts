import { Rose } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const PATTERN_MAP = {
  分类一: {
    type: 'dot',
    cfg: {
      size: 20,
      padding: 5,
      fill: '#fff',
      strokeOpacity: 1,
      opacity: 0.8,
    },
  },
  分类二: {
    type: 'line',
    cfg: {
      stroke: '#FFA884',
      lineWidth: 5,
      spacing: 10,
      rotation: 90,
      backgroundColor: '#F2EAEA',
    },
  },
  分类三: {
    type: 'square',
    cfg: {
      size: 3,
      fill: '#014c63',
      padding: 6,
    },
  },
};

const rosePlot = new Rose('container', {
  data,
  xField: 'type',
  yField: 'value',
  seriesField: 'type',
  radius: 0.9,
  legend: false,
  pattern: ({ type }) => {
    return PATTERN_MAP[type] || { type: 'line' };
  },
});

rosePlot.update({
  theme: {
    styleSheet: {
      brandColor: '#215B77',
      paletteQualitative10: [
        '#215B77',
        '#1B9CD0',
        '#61C9FF',
        '#ABDFFF',
        '#EFF3DE',
        '#FFDE94',
        '#FFC741',
        '#D09C10',
        '#795B16',
      ],
      paletteQualitative20: [
        '#215B77',
        '#227BA2',
        '#1B9CD0',
        '#22BAED',
        '#61C9FF',
        '#8AD4FF',
        '#ABDFFF',
        '#C9E9FF',
        '#EFF3DE',
        '#FFE9B8',
        '#FFDE94',
        '#FFD470',
        '#FFC741',
        '#EDB40A',
        '#D09C10',
        '#A37B16',
        '#795B16',
      ],
    },
  },
});
rosePlot.render();
