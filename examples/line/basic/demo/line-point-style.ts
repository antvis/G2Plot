import { Line } from '@antv/g2plot';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const line = new Line('container', {
  data,
  xField: 'year',
  yField: 'value',
  label: {},
  point: {
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
  },
  tooltip: { showMarkers: false },
  state: {
    active: {
      style: {
        shadowColor: 'yellow',
        shadowBlur: 4,
        stroke: 'transparent',
        fill: 'red',
      },
    },
  },
  theme: {
    geometries: {
      point: {
        // 设置 point(geometry)-diamond(shape) 样式
        diamond: {
          active: {
            style: {
              shadowColor: '#FCEBB9',
              shadowBlur: 2,
              stroke: '#F6BD16',
            },
          },
        },
      },
    },
  },
  interactions: [{ type: 'marker-active' }],
});

line.render();
