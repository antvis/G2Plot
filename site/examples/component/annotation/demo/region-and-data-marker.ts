import { Line } from '@antv/g2plot';

const data = [
  { month: '1', value: 1078 },
  { month: '2', value: 1216 },
  { month: '3', value: 758 },
  { month: '4', value: 623 },
  { month: '5', value: 319 },
  { month: '6', value: 422 },
  { month: '7', value: -4 },
  { month: '8', value: -217 },
  { month: '9', value: -358 },
  { month: '10', value: 1513 },
  { month: '11', value: 1388 },
  { month: '12', value: 597 },
];

const line = new Line('container', {
  data,
  padding: 'auto',
  xField: 'month',
  yField: 'value',
  meta: {
    value: {
      max: 2000,
      min: -1000,
    },
    month: {
      formatter: (val) => `${val} 月`,
    },
  },
  annotations: [
    {
      type: 'region',
      start: ['7', 'min'],
      end: ['9', 'max'],
    },
    {
      type: 'dataMarker',
      position: ['2', 1216],
      text: {
        content: '2月份因逢春节水产销售需求旺盛，\n需求大增',
        style: {
          textAlign: 'left',
        },
      },
      line: {
        length: 20,
      },
      point: {
        style: {
          fill: '#f5222d',
          stroke: '#f5222d',
        },
      },
      autoAdjust: false,
    },
  ],
});

line.render();
