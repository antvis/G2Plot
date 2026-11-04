import { Chart } from '@antv/g2';

/**
 * 半圆玉珏图 + 自定义色板
 * 场景：大屏顶部展示各业务线的月度目标完成度，半圆造型更省纵向空间
 * 要点：startAngle / endAngle 限定半圆范围；scale.color.range 自定义品牌色；图例放顶部
 */
const data = [
  { department: '电商', completion: 86 },
  { department: '本地生活', completion: 72 },
  { department: '云计算', completion: 94 },
  { department: '广告', completion: 63 },
  { department: '金融', completion: 78 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'department', y: 'completion', color: 'department' },
  coordinate: {
    type: 'radial',
    innerRadius: 0.35,
    startAngle: -Math.PI / 2,
    endAngle: Math.PI / 2,
  },
  scale: {
    y: { domain: [0, 100] },
    color: { range: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A'] },
  },
  axis: {
    x: { title: false, label: false, tick: false, line: false },
    y: { title: false, label: false, tick: false, line: false, grid: false },
  },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: 'department',
    items: [
      {
        channel: 'y',
        name: '完成度',
        valueFormatter: (v) => `${v}%`,
      },
    ],
  },
  style: { radius: 6 },
});

chart.render();
