import { Chart } from '@antv/g2';

/**
 * 半环仪表盘
 * 场景：单个核心指标的目标达成度（如季度 KPI 68%），Dashboard 顶部指标卡
 * 要点：theta 坐标系的 startAngle / endAngle 只保留上半圆（π → 2π），
 *       比整环更节省纵向空间，中心留白更适合放大号数值
 */
const completionRate = 68;

const data = [
  { status: '已完成', percent: completionRate },
  { status: '未完成', percent: 100 - completionRate },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data,
      encode: { y: 'percent', color: 'status' },
      transform: [{ type: 'stackY' }],
      coordinate: {
        type: 'theta',
        startAngle: Math.PI, // 从 9 点方向起
        endAngle: Math.PI * 2, // 顺时针越过顶部，到 3 点方向止
        innerRadius: 0.7,
        outerRadius: 0.95,
      },
      scale: { color: { range: ['#5AD8A6', '#EDF1F7'] } },
      legend: false,
      tooltip: false,
    },
    {
      type: 'text',
      data: [{ value: completionRate }],
      encode: { text: (d: { value: number }) => `${d.value}%` },
      style: {
        x: '50%',
        y: '50%',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 40,
        fontWeight: 600,
        fill: '#1d1d1d',
      },
      tooltip: false,
    },
    {
      type: 'text',
      data: [{ label: '季度目标达成度' }],
      encode: { text: 'label' },
      style: {
        x: '50%',
        y: '62%',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 13,
        fill: '#8c8c8c',
      },
      tooltip: false,
    },
  ],
});

chart.render();
