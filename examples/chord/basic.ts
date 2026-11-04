import { Chart } from '@antv/g2';

/**
 * 基础弦图
 * 场景：城市之间的人口迁徙流量，弦带宽度表示迁徙规模
 * 要点：边数据用 { value: { links } } 包裹；encode 映射 source / target / value；
 *       节点默认由边自动推导，无需单独提供 nodes
 */
const links = [
  { from: '北京', to: '上海', migrants: 12.4 },
  { from: '北京', to: '深圳', migrants: 9.8 },
  { from: '北京', to: '杭州', migrants: 6.2 },
  { from: '上海', to: '杭州', migrants: 15.6 },
  { from: '上海', to: '深圳', migrants: 8.1 },
  { from: '深圳', to: '广州', migrants: 18.3 },
  { from: '广州', to: '杭州', migrants: 5.4 },
  { from: '成都', to: '北京', migrants: 7.7 },
  { from: '成都', to: '深圳', migrants: 6.9 },
  { from: '杭州', to: '成都', migrants: 4.2 },
  { from: '广州', to: '成都', migrants: 5.1 },
  { from: '深圳', to: '北京', migrants: 7.3 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'chord',
  data: { value: { links } },
  encode: { source: 'from', target: 'to', value: 'migrants' },
});

chart.render();
