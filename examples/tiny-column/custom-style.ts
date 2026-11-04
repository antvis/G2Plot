/**
 * 自定义迷你柱状图样式
 * 场景：品牌 KPI 卡片需要统一配色、圆角柱体和带单位的悬浮提示
 * 要点：style 控制固定填充色、圆角与最大柱宽；tooltip.items 格式化数值
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '周一', orders: 86 },
  { day: '周二', orders: 112 },
  { day: '周三', orders: 95 },
  { day: '周四', orders: 138 },
  { day: '周五', orders: 164 },
  { day: '周六', orders: 126 },
  { day: '周日', orders: 148 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'day', y: 'orders' },
  axis: { x: false, y: false },
  legend: false,
  style: {
    fill: '#722ED1',
    radiusTopLeft: 2,
    radiusTopRight: 2,
    maxWidth: 10,
  },
  tooltip: {
    title: 'day',
    items: [{ channel: 'y', name: '订单量', valueFormatter: (v) => `${v} 单` }],
  },
});

chart.render();
