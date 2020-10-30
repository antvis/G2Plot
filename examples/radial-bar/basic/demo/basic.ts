import { RadialBar } from '@antv/g2plot';

const data = [
  { name: 'X6', star: 297 },
  { name: 'G', star: 506 },
  { name: 'AVA', star: 805 },
  { name: 'G2Plot', star: 1478 },
  { name: 'L7', star: 2029 },
  { name: 'F2', star: 7346 },
  { name: 'G6', star: 7100 },
  { name: 'G2', star: 10178 },
];

const bar = new RadialBar('container', {
  width: 400,
  height: 300,
  data,
  xField: 'name',
  yField: 'star',
  // maxRadian: 90, //最大弧度,
  tooltip: {
    formatter: (datum) => {
      return { name: 'star数', value: datum.star };
    },
  },
});
bar.render();
