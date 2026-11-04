import { Chart } from '@antv/g2';

/**
 * 水平抖动图
 * 场景：横向比较各仓库订单配送时长的原始观测分布，类别名称较长时更易读
 * 要点：类别字段映射到 y 轴，使用 jitterY 只抖动垂直方向，不改变配送时长
 */
const data = [
  { warehouse: '华东中心仓', deliveryHours: 18 },
  { warehouse: '华东中心仓', deliveryHours: 22 },
  { warehouse: '华东中心仓', deliveryHours: 20 },
  { warehouse: '华东中心仓', deliveryHours: 26 },
  { warehouse: '华东中心仓', deliveryHours: 19 },
  { warehouse: '华东中心仓', deliveryHours: 24 },
  { warehouse: '华南中心仓', deliveryHours: 28 },
  { warehouse: '华南中心仓', deliveryHours: 31 },
  { warehouse: '华南中心仓', deliveryHours: 25 },
  { warehouse: '华南中心仓', deliveryHours: 35 },
  { warehouse: '华南中心仓', deliveryHours: 29 },
  { warehouse: '华南中心仓', deliveryHours: 33 },
  { warehouse: '西南中心仓', deliveryHours: 36 },
  { warehouse: '西南中心仓', deliveryHours: 42 },
  { warehouse: '西南中心仓', deliveryHours: 38 },
  { warehouse: '西南中心仓', deliveryHours: 45 },
  { warehouse: '西南中心仓', deliveryHours: 40 },
  { warehouse: '西南中心仓', deliveryHours: 34 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: {
    x: 'deliveryHours',
    y: 'warehouse',
    color: 'warehouse',
    size: 4,
  },
  transform: [{ type: 'jitterY', padding: 0.1 }],
  style: { fillOpacity: 0.7 },
  axis: { x: { title: '配送时长（小时）' } },
  legend: false,
});

chart.render();
