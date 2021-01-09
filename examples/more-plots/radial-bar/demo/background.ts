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

const bar = new RadialBar('container', {
  data,
  xField: 'name',
  yField: 'star',
  maxAngle: 350, //最大旋转角度,
  radius: 0.8,
  innerRadius: 0.2,
  tooltip: {
    formatter: (datum) => {
      return { name: 'star数', value: datum.star };
    },
  },
  colorField: 'star',
  color: ({ star }) => {
    if (star > 10000) {
      return '#6349ec';
    } else if (star > 1000) {
      return '#ff9300';
    }
    return '#ff93a7';
  },
  barBackground: {},
  barStyle: { lineCap: 'round' },
  annotations: [
    {
      type: 'html',
      position: ['50%', '50%'],
      html: (container, view) => {
        const coord = view.getCoordinate();
        const w = coord.polarRadius * coord.innerRadius * 1.15;
        return `<div style="transform:translate(-50%,-46%)">
          <img width="${
            (w / 203) * 231
          }" height="${w}" alt="" src="https://gw.alipayobjects.com/zos/antfincdn/zrh%24J08soH/AntV%252520LOGO%2525202.png">
        </div>`;
      },
    },
  ],
});
bar.render();
