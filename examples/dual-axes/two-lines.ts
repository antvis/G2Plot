import { Chart } from '@antv/g2';

/**
 * 双折线双轴图
 * 场景：两个同趋势但量级悬殊的指标（PV 百万级 与 转化率 %）
 * 要点：两条 line children，第二条独立 y 轴；颜色区分左右轴归属
 */
const data = [
  { date: '09-15', pv: 1200000, cvr: 0.032 },
  { date: '09-16', pv: 1500000, cvr: 0.041 },
  { date: '09-17', pv: 1350000, cvr: 0.038 },
  { date: '09-18', pv: 1800000, cvr: 0.052 },
  { date: '09-19', pv: 2100000, cvr: 0.061 },
  { date: '09-20', pv: 1950000, cvr: 0.055 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'line',
      encode: { x: 'date', y: 'pv' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
      axis: {
        y: { title: 'PV', labelFormatter: (v: number) => `${v / 10000}w` },
      },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'cvr', shape: 'smooth' },
      scale: { y: { independent: true } },
      style: { stroke: '#5AD8A6', lineWidth: 2, lineDash: [4, 4] },
      axis: {
        y: {
          title: '转化率',
          labelFormatter: (v: number) => `${(v * 100).toFixed(1)}%`,
        },
      },
    },
  ],
});

chart.render();
