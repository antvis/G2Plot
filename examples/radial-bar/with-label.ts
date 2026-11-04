import { Chart } from '@antv/g2';

/**
 * 带数值标签的玉珏图
 * 场景：展示各产品线的 NPS 得分，需要在每段圆弧末端直接读出分数
 * 要点：labels 用 text 回调拼接单位，position: 'outside' 定位到弧末端，autoRotate: false 保持文字水平
 */
const data = [
  { product: '智能手表', nps: 72 },
  { product: '无线耳机', nps: 85 },
  { product: '运动手环', nps: 64 },
  { product: '智能音箱', nps: 58 },
  { product: '平板电脑', nps: 77 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'product', y: 'nps', color: 'product' },
  coordinate: { type: 'radial', innerRadius: 0.25 },
  scale: { y: { domain: [0, 100] } },
  labels: [
    {
      text: (d: { nps: number }) => `${d.nps} 分`,
      position: 'outside',
      autoRotate: false,
      style: { fontSize: 12, fill: '#555' },
    },
  ],
  axis: {
    x: { title: false, label: false, tick: false, line: false },
    y: { title: false, label: false, tick: false, line: false, grid: false },
  },
  legend: { color: { position: 'right' } },
  style: { radius: 4 },
});

chart.render();
