import { Chart } from '@antv/g2';

/**
 * 带异常点的箱线图
 * 场景：数据存在长尾尖峰（接口偶发超时），需要一眼定位离群值
 * 要点：point 默认为 true，boxplot 用 1.5 倍 IQR 规则自动标出离群点；
 *       离群点样式用 point* 前缀（pointFill / pointR / pointStroke），
 *       写 outlierFill 之类的键会被静默丢弃
 */
const data = [
  { service: '订单服务', latencyMs: 120 },
  { service: '订单服务', latencyMs: 135 },
  { service: '订单服务', latencyMs: 140 },
  { service: '订单服务', latencyMs: 150 },
  { service: '订单服务', latencyMs: 160 },
  { service: '订单服务', latencyMs: 175 },
  { service: '订单服务', latencyMs: 190 },
  { service: '订单服务', latencyMs: 620 },
  { service: '订单服务', latencyMs: 780 },
  { service: '支付服务', latencyMs: 90 },
  { service: '支付服务', latencyMs: 95 },
  { service: '支付服务', latencyMs: 100 },
  { service: '支付服务', latencyMs: 110 },
  { service: '支付服务', latencyMs: 115 },
  { service: '支付服务', latencyMs: 120 },
  { service: '支付服务', latencyMs: 130 },
  { service: '支付服务', latencyMs: 145 },
  { service: '支付服务', latencyMs: 480 },
  { service: '用户服务', latencyMs: 60 },
  { service: '用户服务', latencyMs: 65 },
  { service: '用户服务', latencyMs: 70 },
  { service: '用户服务', latencyMs: 75 },
  { service: '用户服务', latencyMs: 80 },
  { service: '用户服务', latencyMs: 85 },
  { service: '用户服务', latencyMs: 95 },
  { service: '用户服务', latencyMs: 110 },
  { service: '用户服务', latencyMs: 260 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'service', y: 'latencyMs' },
  style: {
    boxFill: '#5B8FF9',
    boxFillOpacity: 0.2,
    boxStroke: '#2F54EB',
    boxLineWidth: 1.5,
    pointFill: '#F4664A',
    pointStroke: '#F4664A',
    pointR: 4,
  },
  axis: { y: { title: '响应耗时（ms）' } },
});

chart.render();
