/**
 * 带数据点的迷你折线图
 * 场景：在小型报表卡片中既展示趋势，也标出每天的实际观测值
 * 要点：type: 'view' + children 叠加 line 与 point，共享有序数据
 */
import { Chart } from '@antv/g2';

const data = [
  { day: 'Mon', checkIns: 36 },
  { day: 'Tue', checkIns: 42 },
  { day: 'Wed', checkIns: 38 },
  { day: 'Thu', checkIns: 55 },
  { day: 'Fri', checkIns: 49 },
  { day: 'Sat', checkIns: 64 },
  { day: 'Sun', checkIns: 70 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  axis: false,
  legend: false,
  tooltip: false,
  children: [
    {
      type: 'line',
      encode: { x: 'day', y: 'checkIns' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { x: 'day', y: 'checkIns', shape: 'point', size: 3 },
      style: { fill: '#fff', stroke: '#5B8FF9', lineWidth: 1.5 },
    },
  ],
});

chart.render();
