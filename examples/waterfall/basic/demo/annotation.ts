import { Waterfall } from '@antv/g2plot';

const data = [
  { month: '一月', value: 6200000 },
  { month: '二月', value: -600000 },
  { month: '三月', value: -4100000 },
  { month: '四月', value: 3700000 },
  { month: '五月', value: -2100000 },
  { month: '六月', value: 5300000 },
  { month: '七月', value: 3100000 },
  { month: '八月', value: -500000 },
  { month: '九月', value: 4200000 },
  { month: '十月', value: 5300000 },
  { month: '十一月', value: -500000 },
  { month: '十二月', value: 5100000 },
];

const formatter = (v) => `${v / 10000000} 亿`;

const annotations = [];
data.reduce((v, d) => {
  annotations.push({
    type: 'text',
    position: () => {
      const y = v + d.value / 2;
      return [d.month, y];
    },
    content: formatter(d.value),
    style: {
      fontSize: 10,
      stroke: '#fff',
      fill: '#666',
      lineWidth: 1,
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  });
  return v + d.value;
}, 0);

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
      formatter,
    },
  },
  /** 展示总计 */
  total: {
    label: '总计',
    style: {
      fill: '#96a6a6',
    },
  },
  /** 数据标签展示模式：绝对值 */
  labelMode: 'absolute',
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
  annotations,
});

waterfallPlot.render();
