import { Chart } from '@antv/g2';

/**
 * 堆叠面积图
 * 场景：多系列趋势的总量与构成（如各渠道流量占比随时间变化）
 * 要点：多系列面积必须加 stackY，否则系列间互相遮挡
 */
const data = [
  { month: 'Jan', channel: '搜索', value: 320 },
  { month: 'Feb', channel: '搜索', value: 420 },
  { month: 'Mar', channel: '搜索', value: 380 },
  { month: 'Apr', channel: '搜索', value: 520 },
  { month: 'Jan', channel: '社交', value: 220 },
  { month: 'Feb', channel: '社交', value: 280 },
  { month: 'Mar', channel: '社交', value: 350 },
  { month: 'Apr', channel: '社交', value: 300 },
  { month: 'Jan', channel: '直接访问', value: 120 },
  { month: 'Feb', channel: '直接访问', value: 150 },
  { month: 'Mar', channel: '直接访问', value: 130 },
  { month: 'Apr', channel: '直接访问', value: 180 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'month', y: 'value', color: 'channel' },
  transform: [{ type: 'stackY' }],
  style: { fillOpacity: 0.6 },
});

chart.render();
