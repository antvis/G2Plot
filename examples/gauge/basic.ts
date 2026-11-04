import { Chart } from '@antv/g2';

/**
 * 基础仪表盘（单指标）
 * 场景：展示单个 KPI 的完成度，如季度目标完成率
 * 要点：type: 'gauge'；data 必须包一层 { value: { target, total, name } }；
 *       target 是当前值、total 是满分/目标值；默认带指针、轴心与中心文字
 */
const data = {
  metric: '季度销售目标完成率',
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
    },
  },
  style: {
    // 中心文字：默认只显示 target 数值，这里改成百分比
    textContent: (target: number, total: number) =>
      `${((target / total) * 100).toFixed(0)}%`,
    textFontSize: 28,
  },
  // 仪表盘只表达一个数，关掉 y 轴刻度与图例
  axis: false,
  legend: false,
});

chart.render();
