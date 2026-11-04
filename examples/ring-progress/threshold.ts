import { Chart } from '@antv/g2';

/**
 * 阈值配色 + 入场动画
 * 场景：健康度、预算消耗、服务可用性等需要「一眼看出状态」的监控指标
 * 要点：进度色由业务阈值决定（达标绿 / 预警橙 / 危险红），剩余部分保持中性灰；
 *       配合 theta 专用的 waveIn 入场动画，中心同时展示数值与状态文案
 */
const completionRate = 86;
const target = 100;

const progressColor =
  completionRate >= 80 ? '#22C55E' : completionRate >= 60 ? '#F59E0B' : '#EF4444';
const statusText =
  completionRate >= 80 ? '达标' : completionRate >= 60 ? '预警' : '未达标';

const data = [
  { status: '已完成', percent: completionRate },
  { status: '剩余', percent: target - completionRate },
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
      coordinate: { type: 'theta', innerRadius: 0.78, outerRadius: 0.96 },
      scale: { color: { range: [progressColor, '#E8EDF3'] } },
      legend: false,
      tooltip: {
        title: 'status',
        items: [
          {
            channel: 'y',
            name: '占比',
            valueFormatter: (value: number) => `${value}%`,
          },
        ],
      },
      animate: { enter: { type: 'waveIn', duration: 800 } },
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
        fontSize: 38,
        fontWeight: 700,
        fill: progressColor,
      },
      tooltip: false,
    },
    {
      type: 'text',
      data: [{ label: statusText }],
      encode: { text: 'label' },
      style: {
        x: '50%',
        y: '63%',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 14,
        fontWeight: 500,
        fill: progressColor,
      },
      tooltip: false,
    },
  ],
});

chart.render();
