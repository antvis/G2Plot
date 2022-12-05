import { Waterfall } from '@antv/g2plot';

const data = [
  { month: '2019', value: 23000000 },
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
  /** 展示总计 */
  total: {
    label: '2020',
  },
  color: ({ month, value }) => {
    if (month === '2019' || month === '2020') {
      return '#96a6a6';
    }
    return value > 0 ? '#f4664a' : '#30bf78';
  },
  legend: {
    custom: true,
    items: [
      {
        name: 'Increase',
        value: 'increase',
        marker: { symbol: 'square', style: { r: 5, fill: '#f4664a' } },
      },
      {
        name: 'Decrease',
        value: 'decrease',
        marker: { symbol: 'square', style: { r: 5, fill: '#30bf78' } },
      },
      {
        name: 'Total',
        value: 'total',
        marker: { symbol: 'square', style: { r: 5, fill: '#96a6a6' } },
      },
    ],
  },
  label: {
    style: {
      fontSize: 10,
    },
    layout: [{ type: 'interval-adjust-position' }],
    background: {
      style: {
        fill: '#f6f6f6',
        stroke: '#e6e6e6',
        strokeOpacity: 0.65,
        radius: 2,
      },
      padding: 1.5,
    },
  },
  waterfallStyle: () => {
    return {
      fillOpacity: 0.85,
    };
  },
});

waterfallPlot.render();
