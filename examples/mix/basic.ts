/**
 * 基础混合图：柱 + 折线
 * 场景：同一 x 轴上对比「实际营收」与「目标营收」，柱看绝对量、线看目标走势
 * 要点：type 为 'view'，children 按渲染顺序排列（后面的在上层）；
 *       两个子 mark 共享 x/y 比例尺，无需额外配置
 */
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', actual: 320, target: 300 },
  { month: 'Feb', actual: 420, target: 380 },
  { month: 'Mar', actual: 380, target: 410 },
  { month: 'Apr', actual: 520, target: 460 },
  { month: 'May', actual: 480, target: 500 },
  { month: 'Jun', actual: 610, target: 550 },
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
      type: 'interval',
      encode: { x: 'month', y: 'actual' },
      style: { fill: '#5B8FF9', radiusTopLeft: 4, radiusTopRight: 4 },
    },
    {
      type: 'line',
      encode: { x: 'month', y: 'target', shape: 'smooth' },
      style: { stroke: '#F6BD16', lineWidth: 2, lineDash: [6, 4] },
    },
  ],
  axis: { x: { title: '月份' }, y: { title: '营收（万元）' } },
  legend: false,
});

chart.render();
