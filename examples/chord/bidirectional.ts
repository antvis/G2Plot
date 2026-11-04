import { Chart } from '@antv/g2';

/**
 * 双向互流弦图
 * 场景：城市之间的往返迁徙，去程与返程各是一条独立边
 * 要点：A→B 与 B→A 分别计入弦带宽度，能看出方向上的不对称；
 *       节点仍由边自动合并，不需要重复声明
 */
const links = [
  { origin: '北京', destination: '上海', commuters: 12.4 },
  { origin: '上海', destination: '北京', commuters: 9.6 },
  { origin: '北京', destination: '深圳', commuters: 8.8 },
  { origin: '深圳', destination: '北京', commuters: 11.2 },
  { origin: '上海', destination: '杭州', commuters: 15.6 },
  { origin: '杭州', destination: '上海', commuters: 6.3 },
  { origin: '广州', destination: '深圳', commuters: 18.3 },
  { origin: '深圳', destination: '广州', commuters: 14.1 },
  { origin: '杭州', destination: '广州', commuters: 4.2 },
  { origin: '广州', destination: '杭州', commuters: 7.5 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'chord',
  data: { value: { links } },
  encode: {
    source: 'origin',
    target: 'destination',
    value: 'commuters',
  },
  layout: { nodeWidthRatio: 0.05, nodePaddingRatio: 0.06 },
});

chart.render();
