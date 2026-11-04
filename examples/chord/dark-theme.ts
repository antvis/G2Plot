import { Chart } from '@antv/g2';

/**
 * 暗色主题弦图
 * 场景：监控大屏展示服务之间的调用量
 * 要点：theme: 'classicDark' 一行切换背景与文字配色；
 *       暗色下弦带透明度略高、标签用浅色，保证对比度
 */
const links = [
  { caller: '网关', callee: '用户服务', calls: 820 },
  { caller: '网关', callee: '订单服务', calls: 640 },
  { caller: '订单服务', callee: '库存服务', calls: 510 },
  { caller: '订单服务', callee: '支付服务', calls: 430 },
  { caller: '支付服务', callee: '风控服务', calls: 260 },
  { caller: '用户服务', callee: '风控服务', calls: 150 },
  { caller: '库存服务', callee: '风控服务', calls: 90 },
  { caller: '支付服务', callee: '订单服务', calls: 120 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  theme: 'classicDark',
});

chart.options({
  type: 'chord',
  data: { value: { links } },
  encode: { source: 'caller', target: 'callee', value: 'calls' },
  layout: { nodeWidthRatio: 0.06 },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#6DC8EC'],
    },
  },
  style: {
    linkFillOpacity: 0.5,
    labelFontSize: 13,
    labelFill: '#E8E8E8',
  },
});

chart.render();
