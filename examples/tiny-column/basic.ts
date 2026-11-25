/**
 * 基础迷你柱形图
 * 场景：在指标卡中查看最近 7 天的 Agent 调用量。
 * 要点：日期从左到右，隐藏坐标轴与图例，悬停查看日期和次数。
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '2026-11-19', requestCount: 12 },
  { day: '2026-11-20', requestCount: 18 },
  { day: '2026-11-21', requestCount: 15 },
  { day: '2026-11-22', requestCount: 26 },
  { day: '2026-11-23', requestCount: 20 },
  { day: '2026-11-24', requestCount: 17 },
  { day: '2026-11-25', requestCount: 22 },
];

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  data,
  encode: { x: 'day', y: 'requestCount' },
  scale: {
    x: { domain: data.map(({ day }) => day) },
    y: { domain: [0, 30], nice: false },
  },
  axis: false,
  legend: false,
  style: { fill: '#4F6EB8' },
  tooltip: {
    title: 'day',
    items: [{ channel: 'y', name: '调用量', valueFormatter: (value) => `${value} 次` }],
  },
});

chart.render();
