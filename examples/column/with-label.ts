import { Chart } from '@antv/g2';

/**
 * 带数据标签的柱状图
 * 场景：报表场景需要直接读数，减少用户看轴估算
 * 要点：position 'inside' 把标签放进柱体；text 用回调自定义内容；style.dx/dy 微调偏移
 */
const data = [
  { city: '北京', gdp: 4.0 },
  { city: '上海', gdp: 4.3 },
  { city: '广州', gdp: 2.8 },
  { city: '深圳', gdp: 3.2 },
  { city: '杭州', gdp: 1.8 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'city', y: 'gdp' },
  labels: [
    {
      // 自定义标签内容：数值 + 单位
      text: (d: { gdp: number }) => `${d.gdp} 万亿`,
      position: 'inside', // 标签放柱体中间
      style: { fontSize: 11, fill: '#fff', dy: -2 }, // dy 微调垂直偏移
    },
  ],
  tooltip: {
    items: [{ channel: 'y', name: 'GDP', valueFormatter: (v) => `${v} 万亿` }],
  },
});

chart.render();
