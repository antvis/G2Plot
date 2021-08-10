import { RadialBar } from '@antv/g2plot';

const data = [
  { name: 'X6', star: 297 },
  { name: 'G', star: 506 },
  { name: 'AVA', star: 805 },
  { name: 'G2Plot', star: 1478 },
  { name: 'L7', star: 2029 },
  { name: 'G6', star: 7100 },
  { name: 'F2', star: 7346 },
  { name: 'G2', star: 10178 },
];

const plot = new RadialBar('container', {
  data,
  xField: 'name',
  yField: 'star',
  // color 字段，可不设置
  // colorField: 'name',
  radius: 0.8,
  innerRadius: 0.2,
  tooltip: {
    formatter: (datum) => {
      return { name: 'star数', value: datum.star };
    },
  },
  pattern: {
    type: 'dot',
    cfg: {
      radius: 2,
      padding: 2,
      // dot 不进行交错
      isStagger: false,
      mode: 'repeat',
    },
  },
});

plot.render();
