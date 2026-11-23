import { Chart } from '@antv/g2';

/**
 * 状态交互桑基图（悬停高亮）
 * 场景：供应链从原材料到渠道的多级流向，节点较多，需要悬停看清某一条链路
 * 要点：interaction 用 elementHighlight，命中的节点/链接进入 active、其余进入 inactive；
 *       state 与 encode / style 并列写在顶层（不能嵌进 style），fillOpacity 控制变淡程度
 */
const links = [
  { source: '钢材', target: '汽车制造', value: 320 },
  { source: '钢材', target: '家电制造', value: 180 },
  { source: '铝材', target: '汽车制造', value: 140 },
  { source: '铝材', target: '电子元件', value: 220 },
  { source: '塑料', target: '家电制造', value: 160 },
  { source: '塑料', target: '包装', value: 90 },
  { source: '汽车制造', target: '4S 渠道', value: 300 },
  { source: '汽车制造', target: '直营门店', value: 160 },
  { source: '家电制造', target: '电商平台', value: 240 },
  { source: '家电制造', target: '线下卖场', value: 100 },
  { source: '电子元件', target: '品牌代工', value: 220 },
  { source: '包装', target: '电商包裹', value: 90 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sankey',
  data: { value: { links } },
  layout: {
    nodeAlign: 'justify',
    nodePadding: 0.03,
  },
  // 悬停高亮：命中元素进入 active，其余元素进入 inactive
  state: {
    active: { fillOpacity: 0.95, lineWidth: 1, stroke: '#1f1f1f' },
    inactive: { fillOpacity: 0.15 },
  },
  interaction: [{ type: 'elementHighlight' }],
  style: {
    labelSpacing: 5,
    labelFontSize: 11,
    nodeLineWidth: 1,
    nodeStroke: '#ffffff',
    linkFillOpacity: 0.35,
  },
  legend: false,
});

chart.render();
