/**
 * 基础水波图
 * 场景：展示单个 KPI 的完成率，如季度目标完成进度
 * 要点：type: 'liquid' + 单个 0～1 数值；outline* 控制外框，waveLength 控制波长
 */
import { Chart } from '@antv/g2';

const completionRate = 0.72;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: completionRate,
  style: {
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
