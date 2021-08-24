// 外置方法 getCanvasPattern
import { Pie, getCanvasPattern } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '其他', value: 5 },
];

const pattern = (datum, color) =>
  getCanvasPattern({
    type: datum.type === '分类一' ? 'dot' : 'line',
    cfg: {
      backgroundColor: datum.type === '分类一' ? '#d78ab7' : color,
    },
  });

const plot = new Pie('container', {
  data,
  angleField: 'value',
  colorField: 'type',
  color: ['#215B77', '#1B9CD0', '#61C9FF', '#ABDFFF', '#FFDE94'],
  radius: 0.6,
  label: {
    type: 'outer',
    offset: 10,
    labelLine: false,
    content: '{value}',
  },
  pieStyle: {
    lineWidth: 1,
  },
  // 给legend增加贴图
  legend: {
    marker: (text, index, item) => {
      const color = item.style.fill;
      return {
        style: {
          fill: pattern({ type: text }, color),
          r: 8,
        },
      };
    },
  },
  pattern,
  interactions: [{ type: 'element-active' }],
});

plot.render();
