import { Chart } from '@antv/g2';

/**
 * 基础玉珏图
 * 用途：在环形轨道上对比同一量纲下各分类的数值大小
 * 场景：各渠道订单量、一天内各时段请求量、各品类转化量
 * 关键要点：coordinate 使用 polar 并设置 innerRadius 留出中心孔；x 映射分类（角度），y 映射数值（半径）；关闭图例避免与角度标签重复
 */
const data = [
  { channel: 'App', orders: 1860 },
  { channel: '小程序', orders: 1420 },
  { channel: 'H5', orders: 980 },
  { channel: 'Web', orders: 760 },
  { channel: '线下门店', orders: 540 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'channel', y: 'orders', color: 'channel' },
  coordinate: { type: 'polar', innerRadius: 0.35 },
  legend: false,
});

chart.render();