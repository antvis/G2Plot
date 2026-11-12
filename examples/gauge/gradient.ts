import { Chart } from '@antv/g2';

/**
 * 渐变配色仪表盘
 * 场景：大屏或 KPI 卡片中需要强化视觉质感的单指标完成度
 * 要点：scale.color.range 的第一项使用 CSS 线性渐变表示已完成部分，
 *       第二项使用浅色表示剩余部分；渐变只改变配色，不改变数据语义
 */
const data = {
  metric: '年度目标完成率',
  completionRate: 76,
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
  scale: {
    color: {
      range: [
        'linear-gradient(90deg, #5B8FF9 0%, #9254DE 100%)',
        '#EEF1F6',
      ],
    },
  },
  coordinate: {
    type: 'radial',
    innerRadius: 0.76,
    outerRadius: 0.94,
  },
  style: {
    pointerStroke: '#5B8FF9',
    pointerLineWidth: 3,
    pinFill: '#5B8FF9',
    textContent: (target: number, total: number) =>
      `${Math.round((target / total) * 100)}%\n${data.metric}`,
    textFontSize: 22,
    textY: '68%',
  },
  axis: false,
  legend: false,
});

chart.render();
