import { Chart } from '@antv/g2';

/**
 * 基础雷达图（单系列）
 * 场景：单个对象的多维能力评估（如一款产品的设计/性能/续航等评分）
 * 要点：view + polar 坐标 + area/line children；y 轴固定 domainMin 0
 */
const data = [
  { item: '设计', score: 85 },
  { item: '性能', score: 72 },
  { item: '续航', score: 90 },
  { item: '拍照', score: 60 },
  { item: '屏幕', score: 78 },
  { item: '性价比', score: 66 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  coordinate: { type: 'polar' },
  scale: {
    x: { padding: 0.5, align: 0 },
    y: { tickCount: 5, domainMin: 0, domainMax: 100 },
  },
  axis: {
    x: { grid: true },
    y: { zIndex: 1, title: false, label: false },
  },
  children: [
    {
      type: 'area',
      encode: { x: 'item', y: 'score' },
      style: { fill: '#5B8FF9', fillOpacity: 0.25 },
    },
    {
      type: 'line',
      encode: { x: 'item', y: 'score' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { x: 'item', y: 'score' },
      style: { r: 4, fill: '#5B8FF9' },
    },
  ],
});

chart.render();
