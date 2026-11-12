import { Chart } from '@antv/g2';

/**
 * 环形进度条
 * 场景：仪表盘太占空间时，用一整圈环形展示单指标完成度（预算执行、任务进度）
 * 要点：coordinate 用 radial 且起止角差 2π（-π/2 → 3π/2）画满整圈；
 *       innerRadius / outerRadius 决定环的粗细；
 *       pointerShape: false、pinShape: false 隐藏指针与轴心，文字居中
 */
const data = {
  metric: '本月预算执行率',
  completionRate: 68,
  target: 100,
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      name: data.metric,
      target: data.completionRate,
      total: data.target,
    },
  },
  coordinate: {
    type: 'radial',
    innerRadius: 0.8,
    outerRadius: 1,
    startAngle: -Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
  },
  scale: {
    color: { range: ['#5B8FF9', '#EEF1F6'] },
  },
  style: {
    pointerShape: false,
    pinShape: false,
    textContent: (target: number, total: number) =>
      `${Math.round((target / total) * 100)}%\n${data.metric}`,
    textFontSize: 20,
    textFill: '#1d1d1d',
    textY: '50%',
  },
  axis: false,
  legend: false,
});

chart.render();
