/**
 * 峰值高亮的迷你柱形图
 * 场景：在最近 7 天的 Agent 调用量中快速定位峰值。
 * 要点：从数据计算最大值，并列峰值共享强调色，全零时使用普通颜色。
 */
import { Chart } from '@antv/g2';

const dailyRequests = [
  { day: '2026-11-19', requestCount: 12 },
  { day: '2026-11-20', requestCount: 18 },
  { day: '2026-11-21', requestCount: 15 },
  { day: '2026-11-22', requestCount: 26 },
  { day: '2026-11-23', requestCount: 20 },
  { day: '2026-11-24', requestCount: 17 },
  { day: '2026-11-25', requestCount: 22 },
];
const peak = dailyRequests.reduce((max, { requestCount }) => Math.max(max, requestCount), 0);
const data = dailyRequests.map((item) => ({
  ...item,
  highlight: peak > 0 && item.requestCount === peak ? 'peak' : 'normal',
}));

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  data,
  encode: { x: 'day', y: 'requestCount', color: 'highlight' },
  scale: {
    x: { domain: data.map(({ day }) => day) },
    y: { domain: [0, 30], nice: false },
    color: { domain: ['normal', 'peak'], range: ['#8498BF', '#254FC4'] },
  },
  axis: false,
  legend: false,
  tooltip: {
    title: 'day',
    items: [{ channel: 'y', name: '调用量', valueFormatter: (value) => `${value} 次` }],
  },
});

chart.render();
