import { Chart } from '@antv/g2';

/**
 * 阈值配色进度条
 * 场景：多指标按完成度分档着色（达标 / 预警 / 落后），配合标题说明分档规则
 * 要点：style.fill 传回调按数据取值返回颜色；轨道用更浅的底色，
 *       圆角与条厚与进度层保持一致，避免两层错位
 */
const data = [
  { region: '华东大区', completionRate: 0.94 },
  { region: '华南大区', completionRate: 0.68 },
  { region: '华北大区', completionRate: 0.42 },
  { region: '西南大区', completionRate: 0.81 },
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
      encode: { x: 'region', y: () => 1 },
      style: { fill: '#F7F8FA', radius: 9, maxWidth: 18 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: { x: 'region', y: 'completionRate' },
      style: {
        fill: (d: { completionRate: number }) => {
          const rate = Number(d.completionRate);
          if (rate >= 0.8) return '#52C41A';
          if (rate >= 0.5) return '#FAAD14';
          return '#F4664A';
        },
        radius: 9,
        maxWidth: 18,
      },
    },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 1] } },
  axis: { x: { title: false }, y: false },
  legend: false,
  title: {
    title: '各大区目标达成率',
    subtitle: '绿色 ≥ 80%，橙色 ≥ 50%，红色 < 50%',
    align: 'left',
  },
  tooltip: {
    items: [{ channel: 'y', name: '完成率', valueFormatter: (v) => `${Math.round(Number(v) * 100)}%` }],
  },
});

chart.render();
