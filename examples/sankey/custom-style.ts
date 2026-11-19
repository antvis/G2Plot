import { Chart } from '@antv/g2';

/**
 * 桑基图样式定制
 * 场景：公司年度预算从收入到各项支出的分配，需要在节点旁直接读出金额
 * 要点：layout.nodeAlign 左对齐、nodeWidth / nodePadding 控制轨道；
 *       style.labelText 用回调替换默认节点名标签，拼接金额；品牌色用 scale.color.range
 */
const links = [
  { source: '总营收', target: '产品收入', value: 6800 },
  { source: '总营收', target: '服务收入', value: 3200 },
  { source: '产品收入', target: '研发投入', value: 2400 },
  { source: '产品收入', target: '市场推广', value: 1800 },
  { source: '产品收入', target: '利润', value: 2600 },
  { source: '服务收入', target: '交付成本', value: 1200 },
  { source: '服务收入', target: '客户成功', value: 800 },
  { source: '服务收入', target: '利润', value: 1200 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sankey',
  data: { value: { links } },
  layout: {
    nodeAlign: 'left',
    nodeWidth: 0.03,
    nodePadding: 0.05,
  },
  scale: {
    color: {
      range: ['#1B3B6F', '#2E6F95', '#4FA3A5', '#8CC084', '#D9BF77'],
    },
  },
  style: {
    labelText: (d: any) => `${d.key} ${d.value} 万元`,
    labelSpacing: 8,
    labelFontSize: 12,
    labelFontWeight: 'bold',
    nodeLineWidth: 1,
    nodeStroke: '#ffffff',
    linkFill: '#c9d6e3',
    linkFillOpacity: 0.45,
  },
  legend: false,
});

chart.render();
