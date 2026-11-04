import { Chart } from '@antv/g2';

/**
 * 河流图样式自定义
 * 场景：品牌内容看板，需要定制配色、分层边界、标题与图例
 * 要点：tooltip 读取原始 listeningHours 字段，避免展示对称偏移后的坐标值
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
  title: {
    title: '音乐品类收听趋势',
    subtitle: '单位：万小时',
    align: 'left',
  },
  scale: {
    color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#9270CA'] },
  },
  style: { fillOpacity: 0.9, stroke: '#fff', lineWidth: 1 },
  axis: {
    x: { title: '月份' },
    y: false,
  },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: 'month',
    items: [
      {
        field: 'listeningHours',
        name: '收听时长',
        valueFormatter: (value) => `${value} 万小时`,
      },
    ],
  },
});

chart.render();
