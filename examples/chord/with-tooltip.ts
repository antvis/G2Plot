import { Chart } from '@antv/g2';

/**
 * tooltip 定制：城市迁徙流向
 * 场景：悬停弦带看具体流向与人数，悬停节点看该城市的总流量
 * 要点：chord 的 tooltip 用 link* / node* 前缀平铺配置（不是嵌套对象）；
 *       link 侧数据含 source / target / value，title 可用回调拼流向
 */
const links = [
  { from: '北京', to: '上海', migrants: 12.4 },
  { from: '上海', to: '北京', migrants: 9.6 },
  { from: '北京', to: '深圳', migrants: 9.8 },
  { from: '深圳', to: '北京', migrants: 7.3 },
  { from: '上海', to: '杭州', migrants: 15.6 },
  { from: '杭州', to: '上海', migrants: 6.3 },
  { from: '深圳', to: '广州', migrants: 18.3 },
  { from: '广州', to: '深圳', migrants: 14.1 },
  { from: '成都', to: '北京', migrants: 7.7 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'chord',
  data: { value: { links } },
  encode: { source: 'from', target: 'to', value: 'migrants' },
  tooltip: {
    linkTitle: (d: { source: string; target: string }) => `${d.source} → ${d.target}`,
    linkItems: [{ field: 'value', name: '迁徙人数（万人）' }],
    nodeTitle: '城市',
    nodeItems: [{ field: 'value', name: '总流量（万人）' }],
  },
});

chart.render();
