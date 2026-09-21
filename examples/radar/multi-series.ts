import { Chart } from '@antv/g2';

/**
 * 多系列雷达图
 * 场景：多个对象的多维能力对比（如两款手机的六维评分对比）
 * 要点：color 通道映射系列字段；area 用低 fillOpacity 避免互相遮挡
 */
const data = [
  { item: '设计', product: '产品A', score: 70 },
  { item: '性能', product: '产品A', score: 60 },
  { item: '续航', product: '产品A', score: 50 },
  { item: '拍照', product: '产品A', score: 80 },
  { item: '屏幕', product: '产品A', score: 90 },
  { item: '性价比', product: '产品A', score: 75 },
  { item: '设计', product: '产品B', score: 40 },
  { item: '性能', product: '产品B', score: 75 },
  { item: '续航', product: '产品B', score: 85 },
  { item: '拍照', product: '产品B', score: 55 },
  { item: '屏幕', product: '产品B', score: 65 },
  { item: '性价比', product: '产品B', score: 60 },
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
      encode: { x: 'item', y: 'score', color: 'product' },
      style: { fillOpacity: 0.15 },
    },
    {
      type: 'line',
      encode: { x: 'item', y: 'score', color: 'product' },
      style: { lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { x: 'item', y: 'score', color: 'product' },
      style: { r: 3 },
    },
  ],
  legend: { color: { position: 'top' } },
});

chart.render();
