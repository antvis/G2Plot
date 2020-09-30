import { Rose } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const rosePlot = new Rose('container', {
  data,
  xField: 'type',
  yField: 'value',
  seriesField: 'type',
  radius: 0.9,
  label: {
    layout: {
      type: 'limit-in-shape',
    },
  },
  // 设置 active 状态样式
  state: {
    active: {
      style: {
        lineWidth: 0,
        fillOpacity: 0.65,
      },
    },
  },
  legend: {
    position: 'bottom',
  },
  interactions: [{ type: 'element-active' }],
});

rosePlot.render();
