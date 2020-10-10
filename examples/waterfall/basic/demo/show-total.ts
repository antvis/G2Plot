import { Waterfall } from '@antv/g2plot';

const data = [
  { month: 'Start', value: 23000000 },
  { month: 'Jan', value: 2200000 },
  { month: 'Feb', value: -4600000 },
  { month: 'Mar', value: -9100000 },
  { month: 'Apr', value: 3700000 },
  { month: 'May', value: -2100000 },
  { month: 'Jun', value: 5300000 },
  { month: 'Jul', value: 3100000 },
  { month: 'Aug', value: -1500000 },
  { month: 'Sep', value: 4200000 },
  { month: 'Oct', value: 5300000 },
  { month: 'Nov', value: -1500000 },
  { month: 'Dec', value: 5100000 },
];

const waterfallPlot = new Waterfall('container', {
  data,
  padding: 'auto',
  appendPadding: [20, 0, 0, 0],
  xField: 'month',
  yField: 'value',
  meta: {
    month: {
      alias: '月份',
    },
    value: {
      alias: '销售量',
      formatter: (v) => `${v / 10000000} 亿`,
    },
  },
  /** 展示牵引线 */
  leaderLine: true,
  /** 展示总计 */
  total: {
    label: 'Accumalte',
    style: {
      fill: '#5AD8A6',
    },
  },
  labelDataMode: 'absolute',
  label: {
    style: {
      fontSize: 10,
    },
    background: {
      style: {
        fill: '#f6f6f6',
        stroke: '#e6e6e6',
        radius: 2,
      },
      padding: 1.5,
    },
  },
});

waterfallPlot.render();
