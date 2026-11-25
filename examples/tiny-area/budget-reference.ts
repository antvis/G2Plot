/**
 * 带日预算参考线的迷你面积图
 * 场景：在指标卡中判断最近 14 天的 Token 用量何时超过日预算。
 * 要点：面积与折线保留缺测断点，预算虚线和用量共用 y 比例尺。
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
  { day: '2026-11-22', tokenCount: null },
  { day: '2026-11-23', tokenCount: 10900 },
  { day: '2026-11-24', tokenCount: 8200 },
  { day: '2026-11-25', tokenCount: 9400 },
].sort((a, b) => a.day.localeCompare(b.day));

const dailyBudget = 9000;
const encode = { x: 'day', y: 'tokenCount' };
const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'view',
  data,
  margin: 0,
  padding: 6,
  scale: {
    x: { type: 'point', domain: data.map(({ day }) => day) },
    y: { domain: [0, 12000], nice: false },
  },
  axis: false,
  legend: false,
  children: [
    {
      type: 'area',
      encode,
      style: {
        fill: 'linear-gradient(90deg, rgba(53,99,204,0.60) 0%, rgba(53,99,204,0.08) 100%)',
      },
      tooltip: false,
    },
    {
      type: 'line',
      encode,
      style: { stroke: '#3563CC', lineWidth: 2 },
      tooltip: {
        title: 'day',
        items: [{
          channel: 'y',
          name: 'Token 用量',
          valueFormatter: (value) => value == null ? '缺测' : `${value.toLocaleString('en-US')} Token`,
        }],
      },
    },
    {
      type: 'lineY',
      data: [dailyBudget],
      style: { stroke: '#A54A18', lineWidth: 2, lineDash: [4, 3] },
      labels: [
        {
          text: `日预算 ${dailyBudget.toLocaleString('en-US')} Token`,
          position: 'top-left',
          style: { fill: '#A54A18', fontSize: 10, textBaseline: 'bottom', dy: -3 },
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
