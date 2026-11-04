import { Chart } from '@antv/g2';

/**
 * 带汇总标签的树图
 * 场景：层级节点需要直接读出规模（如品类树的 SKU 数、目录的销量）
 * 要点：1) 数值只挂在叶子节点，内部节点的 d.value 由 d3 自动累加；
 *       2) 标签文本用回调读 d.data（原始字段）和 d.value（汇总值）；
 *       3) labelBackground 给标签加底色，避免文字与连线重叠
 */
const categoryData = {
  category: '全站商品',
  children: [
    {
      category: '数码',
      children: [
        { category: '手机', skuCount: 320 },
        { category: '笔记本', skuCount: 180 },
        { category: '平板', skuCount: 95 },
      ],
    },
    {
      category: '服饰',
      children: [
        { category: '男装', skuCount: 260 },
        { category: '女装', skuCount: 410 },
      ],
    },
    {
      category: '食品',
      children: [
        { category: '零食', skuCount: 150 },
        { category: '饮料', skuCount: 120 },
      ],
    },
  ],
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'tree',
  data: { type: 'inline', value: categoryData },
  encode: { value: 'skuCount' },
  coordinate: { transform: [{ type: 'transpose' }] },
  layout: { sortBy: (a: any, b: any) => a.value - b.value },
  style: {
    nodeFill: '#1677ff',
    linkStroke: '#91caff',
    linkLineWidth: 1.5,
    labelText: (d: any) => `${d.data.category} ${d.value}`,
    labelFontSize: 11,
    labelFill: '#262626',
    labelPosition: 'right',
    labelDx: 6,
    labelBackground: true,
    labelBackgroundFill: '#ffffff',
    labelBackgroundOpacity: 0.85,
  },
  tooltip: {
    nodeTitle: 'name',
    nodeItems: [{ field: 'value', name: 'SKU 数' }],
  },
});

chart.render();
