import { Bar } from '@antv/g2plot';

const data = [
  {
    label: 'Mon.',
    type: 'series1',
    value: 2800,
  },
  {
    label: 'Mon.',
    type: 'series2',
    value: 2260,
  },
  {
    label: 'Tues.',
    type: 'series1',
    value: 1800,
  },
  {
    label: 'Tues.',
    type: 'series2',
    value: 1300,
  },
  {
    label: 'Wed.',
    type: 'series1',
    value: 950,
  },
  {
    label: 'Wed.',
    type: 'series2',
    value: 900,
  },
  {
    label: 'Thur.',
    type: 'series1',
    value: 500,
  },
  {
    label: 'Thur.',
    type: 'series2',
    value: 390,
  },
  {
    label: 'Fri.',
    type: 'series1',
    value: 170,
  },
  {
    label: 'Fri.',
    type: 'series2',
    value: 100,
  },
];

const stackedBarPlot = new Bar('container', {
  data,
  isGroup: true,
  xField: 'value',
  yField: 'label',
  seriesField: 'type',
  marginRatio: 0,
  label: {
    // 可手动配置 label 数据标签位置
    position: 'right', // 'left', 'middle', 'right'
    offset: 4,
  },
  barStyle: { radius: [2, 2, 0, 0] },
});

stackedBarPlot.render();
