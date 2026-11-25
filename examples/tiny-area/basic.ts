/**
 * 基础迷你面积图
 * 场景：在指标卡中查看最近 14 天每日消耗的 Token 数。
 * 要点：按日期排序，填充至零基线，悬停查看当天用量。
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '2026-11-21', tokenCount: 9800 },
  { day: '2026-11-12', tokenCount: 4200 },
  { day: '2026-11-13', tokenCount: 5100 },
  { day: '2026-11-14', tokenCount: 4800 },
  { day: '2026-11-15', tokenCount: 6100 },
  { day: '2026-11-16', tokenCount: 5300 },
  { day: '2026-11-17', tokenCount: 0 },
  { day: '2026-11-18', tokenCount: 7000 },
  { day: '2026-11-19', tokenCount: 6600 },
  { day: '2026-11-20', tokenCount: 8400 },
  { day: '2026-11-22', tokenCount: 7500 },
  { day: '2026-11-23', tokenCount: 10900 },
  { day: '2026-11-24', tokenCount: 8200 },
  { day: '2026-11-25', tokenCount: 9400 },
].sort((a, b) => a.day.localeCompare(b.day));

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'area',
  data,
  encode: { x: 'day', y: 'tokenCount' },
  margin: 0,
  padding: 6,
  scale: {
    x: { type: 'point', domain: data.map(({ day }) => day) },
    y: { domain: [0, 12000], nice: false },
  },
  axis: false,
  legend: false,
  style: { fill: '#3563CC', fillOpacity: 0.5 },
  tooltip: {
    title: 'day',
    items: [{
      channel: 'y',
      name: 'Token 用量',
      valueFormatter: (value) => value == null ? '缺测' : `${value.toLocaleString('en-US')} Token`,
    }],
  },
});

chart.render();
