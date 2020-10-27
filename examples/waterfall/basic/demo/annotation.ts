import { Waterfall } from '@antv/g2plot';

const data = [
  { quarter: '第一季度', value: 6200000 },
  { quarter: '第二季度', value: -2600000 },
  { quarter: '第三季度', value: 4100000 },
  { quarter: '第四季度', value: 3700000 },
];

const formatter = (v) => `${v / 10000000} 亿`;

const annotations = [];
data.reduce((v, d) => {
  annotations.push({
    type: 'text',
    position: () => {
      const y = v + d.value / 2;
      return [d.quarter, y];
    },
    content: formatter(d.value),
    background: {
      style: {
        fill: '#fff',
        radius: 1,
      },
      padding: 1,
    },
    style: {
      fontSize: 14,
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
  xField: 'quarter',
  yField: 'value',
  meta: {
    quarter: {
      alias: '月份',
    },
    value: {
      alias: '销售量',
      min: 0,
      max: Math.pow(10, 9) * 9,
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
      fontSize: 12,
    },
  },

  annotations,
});

waterfallPlot.render();
