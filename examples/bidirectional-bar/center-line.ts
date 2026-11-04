import { Chart } from '@antv/g2';

/**
 * 带中心参考线的双向条形图
 * 场景：满意度调查结果展示，中心线帮助判断正负倾向
 */
const data = [
  { category: '非常不同意', value: -40 },
  { category: '不同意', value: -20 },
  { category: 'neutral', value: 0 },
  { category: '同意', value: 20 },
  { category: '非常同意', value: 40 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'value', y: 'category' },
  scale: { x: { nice: false } },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: { lineDash: [4, 4] },
  labels: [{ text: 'value', position: 'right', style: { fontSize: 10 } }],
  tooltip: {
    title: 'category',
    items: [
      {
        channel: 'x',
        name: '得分',
        valueFormatter: (v: number) => (v >= 0 ? '+' : '') + String(v),
      },
    ],
  },
});

chart.render();