import { Pie, getCanvasPattern } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const pattern = (datum, color) =>
  getCanvasPattern({
    type: datum.type === '其他' ? 'dot' : 'line',
    cfg: {
      backgroundColor: datum.type === '其他' ? '#014c63' : color,
    },
  });

const plot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.6,
  label: {
    type: 'outer',
    offset: '20%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 12,
    },
  },
  pieStyle: {
    lineWidth: 1,
  },
  legend: {
    // 缺少文档
    marker: (text, index, item) => {
      const color = item.style.fill;
      return {
        style: {
          fill: pattern({ type: text }, color),
        },
      };
    },
  },
  pattern,
  interactions: [{ type: 'element-active' }],
});

plot.render();
