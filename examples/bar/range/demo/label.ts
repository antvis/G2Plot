import { Bar } from '@antv/g2plot';

const data = [
  { type: '分类一', values: [76, 100] },
  { type: '分类二', values: [56, 108] },
  { type: '分类三', values: [38, 129] },
  { type: '分类四', values: [58, 155] },
  { type: '分类五', values: [45, 120] },
  { type: '分类六', values: [23, 99] },
  { type: '分类七', values: [18, 56] },
  { type: '分类八', values: [18, 34] },
];

const barPlot = new Bar('container', {
  data: data.reverse(),
  xField: 'values',
  yField: 'type',
  color: 'l(0) 0:#3e5bdb 1:#dd3121',
  isRange: true,
  barStyle: {
    fillOpacity: 0.8,
  },
  label: {
    position: 'middle',
    style: {
      fill: '#fff',
    },
  },
});

barPlot.render();
