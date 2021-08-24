import { Bar, getCanvasPattern } from '@antv/g2plot';
import { deepMix } from '@antv/util';

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
  },
  分类三: {
    type: 'line',
  },
  分类四: {
    type: 'square',
    cfg: {
      size: 4,
      padding: 1,
      rotation: 45,
      isStagger: false,
    },
  },
  分类五: {
    type: 'line',
    cfg: {
      spacing: 3,
      lineWidth: 2,
      rotation: 90,
    },
  },
};
const pattern = ({ type }, color) =>
  getCanvasPattern(deepMix({}, PATTERN_MAP[type], { cfg: { backgroundColor: color } }));

const plot = new Bar('container', {
  data,
  xField: 'value',
  yField: 'type',
  // 可不设置
  seriesField: 'type',
  legend: {
    marker: (text, index, item) => {
      const color = item.style.fill;
      return {
        style: {
          fill: pattern({ type: text }, color),
        },
      };
    },
  },
  pattern: ({ type }) => {
    return PATTERN_MAP[type] || { type: 'dot' };
  },
});

plot.render();
