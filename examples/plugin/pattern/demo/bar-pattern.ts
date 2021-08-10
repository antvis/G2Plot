import { Bar } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const plot = new Bar('container', {
  data,
  xField: 'value',
  yField: 'type',
  // 可不设置
  // seriesField: 'type',
  pattern: {
    type: 'dot',
    cfg: {
      radius: 2,
      padding: 10,
      // dot 不进行交错
      isStagger: false,
      mode: 'repeat',
    },
  },
});

plot.render();
