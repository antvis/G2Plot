import { Bar } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
];
const PATTERN_MAP = {
  分类一: {
    type: 'dot',
  },
  分类二: {
    type: 'square',
    cfg: {
      size: 5,
      padding: 0,
      rotation: 0,
      isStagger: true,
    },
  },
  分类三: {
    type: 'line',
  },
  分类四: {
    type: 'square',
    cfg: {
      size: 5,
      padding: 1,
      rotation: 45,
      isStagger: false,
    },
  },
  分类五: {
    type: 'line',
    cfg: {
      spacing: 6,
      lineWidth: 2,
      rotation: 90,
    },
  },
};
const plot = new Bar('container', {
  data,
  xField: 'value',
  yField: 'type',
  // 可不设置
  seriesField: 'type',
  pattern: ({ type }) => {
    return PATTERN_MAP[type] || { type: 'dot' };
  },
});

plot.render();
