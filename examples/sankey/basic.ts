import { Chart } from '@antv/g2';

/**
 * 基础桑基图
 * 场景：拆解一条用户转化路径，看每个环节的流量去向与流失量
 * 要点：data 用 { value: { links } } 包装；source / target / value 为保留字段名；
 *       节点由 links 自动推导，无需手写 nodes
 */
const links = [
  { source: '访问官网', target: '注册试用', value: 4200 },
  { source: '访问官网', target: '直接离开', value: 5800 },
  { source: '注册试用', target: '激活账号', value: 3000 },
  { source: '注册试用', target: '放弃试用', value: 1200 },
  { source: '激活账号', target: '购买付费', value: 900 },
  { source: '激活账号', target: '免费使用', value: 2100 },
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
  style: {
    labelSpacing: 6,
    labelFontSize: 12,
    nodeLineWidth: 1,
    linkFillOpacity: 0.35,
  },
  legend: false,
});

chart.render();
