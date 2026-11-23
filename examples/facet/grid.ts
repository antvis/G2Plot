/**
 * 用渠道与设备组成 2 × 2 分面，比较每周会话走势
 * 两个字段只负责面板分区；每个面板用同一种折线图
 * 子图共享周序与 0 至 60 的数量轴，便于对照峰值和走势
 */
import { Chart } from '@antv/g2';

const weeks = ['W1', 'W2', 'W3', 'W4', 'W5'];
const groups = [
  { channel: 'Direct', device: 'Desktop', counts: [12, 18, 26, 24, 39] },
  { channel: 'Direct', device: 'Mobile', counts: [19, 26, 22, 41, 52] },
  { channel: 'Referral', device: 'Desktop', counts: [8, 12, 10, 18, 23] },
  { channel: 'Referral', device: 'Mobile', counts: [10, 15, 14, 20, 17] },
];
const data = groups.flatMap(({ channel, device, counts }) =>
  counts.map((sessions, i) => ({ channel, device, week: weeks[i], sessions })),
);

// Leave room for labels of the nested panel axes.
const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 56,
  paddingBottom: 36,
});

chart.options({
  type: 'facetRect',
  title: 'Weekly sessions (count)',
  data,
  encode: { x: 'channel', y: 'device' },
  scale: {
    x: { domain: ['Direct', 'Referral'] },
    y: { domain: ['Desktop', 'Mobile'] },
  },
  axis: { x: { title: false }, y: { title: false } },
  children: [
    {
      type: 'line',
      encode: { x: 'week', y: 'sessions' },
      scale: {
        x: { type: 'point', domain: weeks },
        y: { type: 'linear', domain: [0, 60], nice: false, tickCount: 4 },
      },
      axis: { x: { title: false }, y: { title: false } },
      style: { stroke: '#2563EB', lineWidth: 2.5 },
      tooltip: { title: 'week', items: ['channel', 'device', 'sessions'] },
    },
  ],
});

chart.render();
