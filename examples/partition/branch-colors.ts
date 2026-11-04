import { Chart } from '@antv/g2';

/**
 * 按一级分支着色的矩形分区图
 * 场景：三层预算结构，希望同一部门（一级分支）下的项目保持同色，并配品牌色板与顶部图例
 * 要点：
 * - encode.color 回调返回 path[1]（一级分支名），根节点回退到 path[0]
 * - scale.color.range 自定义分支调色板；不带 domain 时 ordinal 自动收集分支名作为图例
 * - style.stroke + lineWidth 画白色分隔线，inset 留缝，标签用白字压深色块
 */
const data = [
  {
    category: '年度预算',
    budget: 1000,
    children: [
      {
        category: '产品研发',
        budget: 450,
        children: [
          { category: '前端平台', budget: 180 },
          { category: '后端服务', budget: 160 },
          { category: '质量保障', budget: 110 },
        ],
      },
      {
        category: '市场增长',
        budget: 300,
        children: [
          { category: '内容营销', budget: 120 },
          { category: '渠道推广', budget: 100 },
          { category: '品牌活动', budget: 80 },
        ],
      },
      {
        category: '运营支持',
        budget: 250,
        children: [
          { category: '客户服务', budget: 140 },
          { category: '数据分析', budget: 110 },
        ],
      },
    ],
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'partition',
  data,
  encode: {
    value: 'budget',
    name: 'category',
    color: (d: { path: string[] }) => d.path[1] || d.path[0],
  },
  scale: {
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#9270CA'],
    },
  },
  labels: [
    {
      text: 'name',
      position: 'inside',
      style: { fill: '#ffffff', fontSize: 12 },
      transform: [{ type: 'overflowHide' }],
    },
  ],
  style: { inset: 1, stroke: '#ffffff', lineWidth: 1 },
  legend: { color: { position: 'top' } },
  axis: { x: { title: '预算（万元）' }, y: false },
});

chart.render();
