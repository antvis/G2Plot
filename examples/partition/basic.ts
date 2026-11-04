import { Chart } from '@antv/g2';

/**
 * 基础矩形分区图
 * 场景：展示年度预算在部门与项目之间的层级分配，每一层的宽度代表预算占比
 * 要点：
 * - data 是「树根数组」，children 嵌套子节点；根节点与中间节点都要显式给数值（= 子节点之和）
 * - 业务字段不是 name/value 时，用 encode.name / encode.value 指定字段名
 * - 回调里拿到的是展平后的节点：d.name / d.value / d.depth / d.path，用 d.path[1] 按一级分支着色
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
    // 同一一级部门下的所有节点同色；根节点没有 path[1]，回退到 path[0]
    color: (d: { path: string[] }) => d.path[1] || d.path[0],
  },
  labels: [
    {
      text: 'name',
      position: 'inside',
      transform: [{ type: 'overflowHide' }],
    },
  ],
  style: { inset: 0.5 },
  axis: { x: { title: '预算（万元）' }, y: false },
});

chart.render();
