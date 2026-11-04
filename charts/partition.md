# Partition 矩形分区图

> 组件用途：用矩形宽度表达层级数据中每个节点占父节点的比例，逐层向下展开（又称冰柱图 / icicle）。

## 何时使用

- 多层级构成：预算从部门到项目、流量从渠道到着陆页、存储从目录到文件
- 需要同时看到「层级归属」和「同层占比」：每一行是一个层级，宽度即数值占比
- 层级 2~6 层、单层节点数不多（≤ 15），需要点击下钻逐层探索

## 何时不用

- 只有单层占比、追求整体构成感 → 用 pie 饼图
- 跨类别数值对比、不关心层级 → 用 column / bar 柱状图
- 层级极深（> 8 层）或需要横向长标签 → 用 treemap 矩形树图，partition 的深行会过窄
- 想要同心圆环的层级视觉 → 用 `sunburst`（需 `@antv/g2-extension-plot`），partition 是直角坐标
- 展示节点间的父子路径关系而非占比 → 用 tree 树图

## 数据要求

- 树形结构：`data` 是**树根数组**（可多根），通过 `children` 嵌套子节点，不是长表
- 每个节点都要显式提供名称与数值，包括根节点和中间节点：**父节点数值 = 其子节点数值之和**（partition 不会自动累加，缺值会导致矩形宽度为 0 并重叠）
- 数值字段必须是 `number`；字符串数字先 `Number()` 转换
- 业务字段名不是 `name` / `value` 时，用 `encode.name` / `encode.value` 声明字段名（不是 `layout`）
- 渲染前 G2 会把树展平成节点列表，回调中直接访问 `d.name` / `d.value` / `d.depth` / `d.path`

## 基础实现（G2 v5）

```ts
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
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 按一级分支着色 | `encode.color` 回调返回 `d.path[1] \|\| d.path[0]` | [branch-colors.ts](../examples/partition/branch-colors.ts) |
| 品牌色板 + 图例 | `scale.color.range` 自定义颜色数组，`legend.color.position: 'top'` | [branch-colors.ts](../examples/partition/branch-colors.ts) |
| 下钻探索 | `interaction: { drillDown: true }`（partition 默认已开启） | [drill-down.ts](../examples/partition/drill-down.ts) |
| 每层按数值排序 | `layout: { sort: (a, b) => b.value - a.value }` | [sorted.ts](../examples/partition/sorted.ts) |

分支着色核心差异（`d.path` 是从根到当前节点的名称数组）：

```ts-snippet
encode: {
  value: 'budget',
  name: 'category',
  color: (d: { path: string[] }) => d.path[1] || d.path[0],
},
```

每层降序排列（回调收到原始数据节点，字段名与 data 一致）：

```ts-snippet
layout: {
  fillParent: true,
  sort: (a, b) => b.value - a.value,
},
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 矩形缝隙 | `style: { inset: 1 }` | px，0 为无缝 |
| 分隔线 | `style: { stroke: '#ffffff', lineWidth: 1 }` | 白色描边强化层级边界 |
| 分支调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] } }` | 配合 `encode.color` 的分支回调 |
| 标签内容 | `labels: [{ text: 'name' }]` | 展平字段 `name`；也可传回调 `(d) => d.name` |
| 标签位置 | `labels: [{ text: 'name', position: 'inside' }]` | 浅树用 `'inside'`；深树用 `'left'` + `dx: 8` |
| 标签溢出隐藏 | `labels: [{ ..., transform: [{ type: 'overflowHide' }] }]` | 窄矩形自动隐藏文字，避免重叠 |
| 标签文字样式 | `labels: [{ ..., style: { fill: '#ffffff', fontSize: 12 } }]` | 深色块配白字 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | 默认即关闭 |
| 数值轴标题 | `axis: { x: { title: '预算（万元）' } }` | 层级轴固定用 `axis: { y: false }` |
| 内置主题 | `theme: 'classicDark'` | `'light'` / `'dark'` / `'classic'` / `'classicDark'` / `'academy'` |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `data: { value: root }`（sunburst 的对象写法） | `data: [root]` 树根数组 |
| 根节点 / 中间节点只写 `children` 不给数值 | 每层显式给数值，父节点 = 子节点之和；否则矩形宽度为 0 并重叠 |
| `layout: { nameField: 'category', valueField: 'budget' }` | 用 `encode: { name: 'category', value: 'budget' }`；`layout` 只支持 `sort` / `fillParent` |
| 回调里用 `d.data.name`（d3-hierarchy 写法） | 数据已展平，直接用 `d.name` / `d.value` / `d.path` |
| `encode: { color: 'category' }` 映射原始业务字段 | 展平结果只保留 `name` / `value` / `depth` / `path` / `childNodeCount`；用 `color: 'name'` 或 `path` 回调 |
| 把 `d['ancestor-node']` 当成一级祖先 | 它等于节点自身 `name`，没有分组效果；分支着色用 `d.path[1] \|\| d.path[0]` |
| `labels: [{ text: 'category' }]` | 展平后字段是 `name`：`labels: [{ text: 'name' }]` |
| `coordinate: { type: 'polar' }` 想做旭日图 | partition 是直角坐标；同心圆环用 `sunburst`（需 `@antv/g2-extension-plot`） |
| `encode.color` 回调返回 hex，同时又写死 `scale.color.domain` 为数据名 | 回调返回值即 domain 键，两者必须一致；否则图例出现 hex 条目。只想配色就直接给 `scale.color.range` |
| `new Partition('container', { ... })` / `seriesField`（G2Plot v2） | `new Chart({ container })` + `chart.options({ type: 'partition' })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/partition/basic.ts) | 年度预算在部门与项目间的分配，最简起步 | `encode.name/value` 自定义字段 + `color: (d) => d.path[1]` |
| [branch-colors.ts](../examples/partition/branch-colors.ts) | 同一部门同色，品牌色板 + 顶部图例 | `scale.color.range`、`legend.color.position`、`style.stroke` |
| [drill-down.ts](../examples/partition/drill-down.ts) | 云存储目录占用，点击下钻逐层查看 | `interaction.drillDown` |
| [sorted.ts](../examples/partition/sorted.ts) | 云成本构成，每层按金额从大到小排列 | `layout.sort`、`layout.fillParent` |
