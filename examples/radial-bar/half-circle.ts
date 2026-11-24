import { Chart } from '@antv/g2';

/**
 * 半圆玉珏图
 * 用途：把环带压缩到半圆，用更紧凑的横向空间表达同类数值对比
 * 场景：仪表盘页头、移动端窄屏的分类指标
 * 关键要点：coordinate 通过 startAngle / endAngle 截取半圆（-π/2 → π/2），innerRadius 保持 0.25 留出中心窗口
 */
const data = [
  { region: '华东', revenue: 320 },
  { region: '华南', revenue: 268 },
  { region: '华北', revenue: 214 },
  { region: '西南', revenue: 156 },
  { region: '西北', revenue: 92 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'region', y: 'revenue', color: 'region' },
  coordinate: {
    type: 'polar',
    innerRadius: 0.25,
    startAngle: -Math.PI / 2,
    endAngle: Math.PI / 2,
  },
  axis: { x: { grid: false } },
  legend: false,
});

chart.render();