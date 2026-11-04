import { Chart } from '@antv/g2';

/**
 * 横向河流图
 * 场景：纵向排布时间、横向展开各品类的收听规模，适合窄长报表区域
 * 要点：保留 stackY → symmetryY 顺序，通过 coordinate transpose 转置
 */
const data = [
  { month: '2026-01', genre: '流行', listeningHours: 120 },
  { month: '2026-01', genre: '摇滚', listeningHours: 80 },
  { month: '2026-01', genre: '电子', listeningHours: 60 },
  { month: '2026-01', genre: '古典', listeningHours: 40 },
  { month: '2026-02', genre: '流行', listeningHours: 150 },
  { month: '2026-02', genre: '摇滚', listeningHours: 90 },
  { month: '2026-02', genre: '电子', listeningHours: 85 },
  { month: '2026-02', genre: '古典', listeningHours: 45 },
  { month: '2026-03', genre: '流行', listeningHours: 135 },
  { month: '2026-03', genre: '摇滚', listeningHours: 110 },
  { month: '2026-03', genre: '电子', listeningHours: 105 },
  { month: '2026-03', genre: '古典', listeningHours: 50 },
  { month: '2026-04', genre: '流行', listeningHours: 180 },
  { month: '2026-04', genre: '摇滚', listeningHours: 105 },
  { month: '2026-04', genre: '电子', listeningHours: 130 },
  { month: '2026-04', genre: '古典', listeningHours: 55 },
  { month: '2026-05', genre: '流行', listeningHours: 165 },
  { month: '2026-05', genre: '摇滚', listeningHours: 130 },
  { month: '2026-05', genre: '电子', listeningHours: 150 },
  { month: '2026-05', genre: '古典', listeningHours: 60 },
  { month: '2026-06', genre: '流行', listeningHours: 210 },
  { month: '2026-06', genre: '摇滚', listeningHours: 145 },
  { month: '2026-06', genre: '电子', listeningHours: 175 },
  { month: '2026-06', genre: '古典', listeningHours: 70 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: {
    x: 'month',
    y: 'listeningHours',
    color: 'genre',
    shape: 'smooth',
  },
  transform: [{ type: 'stackY' }, { type: 'symmetryY' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: { y: false },
  style: { fillOpacity: 0.85 },
});

chart.render();
