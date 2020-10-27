import { DualAxes } from '@antv/g2plot';

const data = [
  { time: '2019-03', value: 350, count: 800 },
  { time: '2019-04', value: 900, count: 600 },
  { time: '2019-05', value: 300, count: 400 },
  { time: '2019-06', value: 450, count: 380 },
  { time: '2019-07', value: 470, count: 220 },
];

const dualAxes = new DualAxes('container', {
  data: [data, data],
  xField: 'time',
  yField: ['value', 'count'],
  yAxis: [
    // 格式化左坐标轴
    {
      min: 0,
      label: {
        formatter: (val) => `${val}个`,
      },
    },
    // 隐藏右坐标轴
    false,
  ],
  geometryOptions: [
    {
      geometry: 'column',
      color: '#5B8FF9',
      columnWidthRatio: 0.4,
      columnStyle: {
        opacity: 0.4,
      },
      label: {
        position: 'middle',
      },
    },
    {
      geometry: 'line',
      color: '#5AD8A6',
    },
  ],
  // 更改柱线交互，默认为 [{type: 'active-region'}]
  interactions: [
    {
      type: 'element-highlight',
    },
    {
      type: 'active-region',
    },
  ],
});

dualAxes.render();
