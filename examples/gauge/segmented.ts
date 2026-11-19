import { Chart } from '@antv/g2';

/**
 * 米轨式（段式）仪表盘
 * 场景：用等长弧段模拟米轨刻度，直观展示资源负载或健康度
 * 要点：等距 thresholds 将量程划分为 10 段，scale.color.range 提供等量颜色；
 *       arcInset 以角度为单位控制弧段间隙，指针定位当前值
 */
const data = {
  metric: '集群负载',
  completionRate: 72,
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
      thresholds: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
  },
  scale: {
    color: {
      range: [
        '#5B8FF9',
        '#5B8FF9',
        '#5B8FF9',
        '#5AD8A6',
        '#5AD8A6',
        '#5AD8A6',
        '#5AD8A6',
        '#F6BD16',
        '#F6BD16',
        '#E8684A',
      ],
    },
  },
  coordinate: {
    type: 'radial',
    innerRadius: 0.76,
    outerRadius: 0.94,
  },
  style: {
    // 每段两侧各内缩 1.5°，形成清晰的米轨间隙
    arcInset: 1.5,
    pointerStroke: '#1d1d1d',
    pointerLineWidth: 3,
    pinR: 7,
    pinFill: '#1d1d1d',
    textContent: (target: number, total: number) =>
      `${Math.round((target / total) * 100)}%\n${data.metric}`,
    textFontSize: 24,
    textY: '70%',
  },
  axis: false,
  legend: false,
});

chart.render();
