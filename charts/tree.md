# Tree 树图

> 组件用途：用节点 + 连线展示层级数据的从属关系（组织架构、品类树、目录结构、决策树）。

## 何时使用

- 展示层级关系：谁是谁的上级 / 子级，如公司组织架构、商品品类树、文件目录
- 数据本身是嵌套结构（每层有 `children`），层级在 2~4 层、节点在 50 个以内
- 需要一眼看清「分支从哪来、叶子挂在哪」的结构，而不是比较同层数值大小
- 想在节点旁直接标注部门名、汇总人数 / 任务数等业务信息

## 何时不用

- 层级数据的占比 / 面积对比 → 用 treemap 矩形树图（`type: 'treemap'`）
- 节点之间的流量、转化与流向 → 用 sankey 桑基图
- 同层级类别的数值对比 → 用 column / bar 柱状条形图
- 只有「父 → 子」两层且关注子级数值 → 分组柱状图比树图更直观
- 节点上百、层级很深 → 树图会拥挤，改用可展开的列表 / treemap

## 数据要求

- **嵌套 JSON 对象**（不是长表数组）：每个节点是一个对象，子节点放在 `children` 数组里

```ts-snippet
const treeData = {
  department: '总公司',
  children: [
    { department: '研发中心', children: [{ department: '前端组', headcount: 45 }] },
  ],
};
```

- `data` 必须写成 `{ type: 'inline', value: treeData }`：G2 对非数组对象按「数据连接器」解析，直接写 `data: treeData` 会取不到 `value`，图表白屏
- 数值字段（权重）挂在**叶子节点**上；内部节点不填，布局会自动累加出 `d.value`
- `encode.value` 指定数值字段名（如 `'headcount'`）；不写时默认找 `'value'` 字段
- 节点名称：字段叫 `name` 时可以直接用字符串标签（层级函数会把 `data.name` 挂到节点上）；叫 `department` 等其它名字时，标签必须用回调读 `d.data.department`
- 回调拿到的 `d` 是 d3 hierarchy 节点，不是原始数据对象：

| 属性 | 含义 |
|---|---|
| `d.data` | 原始数据对象（`department`、`headcount` 等业务字段在这里） |
| `d.value` | 该节点子树的汇总值 |
| `d.depth` | 层级深度，根节点为 0 |
| `d.height` | 子树高度，叶子节点为 0（常用 `d.height === 0` 判断叶子） |

- 后端给的是 `id` / `parentId` 扁平表时，先在前端组装 `children` 再渲染，见 [flat-data.ts](../examples/tree/flat-data.ts)

## 基础实现（G2 v5）

树图是复合 mark（内部由 link 连线和 point 节点组成），不需要写坐标轴，位置由 tidy tree 布局计算。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础树图（横向组织架构）
 * 场景：展示组织架构、分类层级等「一对多」的层级关系
 * 要点：1) 数据是嵌套 JSON（children 字段），不是长表数组；
 *       2) 必须包一层 data: { value: treeData }，直接把树对象传给 data 会白屏；
 *       3) transpose 让层级从左到右展开，部门名称较长时比纵向更易读
 */
const orgData = {
  department: '总公司',
  children: [
    {
      department: '研发中心',
      children: [
        { department: '前端组', headcount: 45 },
        { department: '后端组', headcount: 70 },
        { department: '算法组', headcount: 35 },
      ],
    },
    {
      department: '市场中心',
      children: [
        { department: '品牌组', headcount: 25 },
        { department: '增长组', headcount: 55 },
      ],
    },
    {
      department: '产品中心',
      children: [
        { department: 'B 端产品', headcount: 35 },
        { department: 'C 端产品', headcount: 25 },
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
  data: { type: 'inline', value: orgData },
  encode: { value: 'headcount' },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    // 叶子节点用主题蓝，内部节点用深灰
    nodeFill: (d: any) => (d.height === 0 ? '#5B8FF9' : '#1d1d1d'),
    linkStroke: '#bfbfbf',
    linkLineWidth: 1,
    // 标签读原始数据要走 d.data
    labelText: (d: any) => d.data.department,
    labelFontSize: 11,
    labelFill: '#595959',
    labelPosition: (d: any) => (d.height === 0 ? 'right' : 'left'),
    labelTextAlign: (d: any) => (d.height === 0 ? 'start' : 'end'),
    labelDx: (d: any) => (d.height === 0 ? 6 : -6),
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 横向组织架构 | `coordinate: { transform: [{ type: 'transpose' }] }` | [basic.ts](../examples/tree/basic.ts) |
| 节点标签带汇总值 | `labelText` 回调拼 `d.value`，`labelBackground` 加底色 | [with-label.ts](../examples/tree/with-label.ts) |
| 径向树（放射状） | `coordinate: { type: 'polar' }`，根节点在圆心 | [radial.ts](../examples/tree/radial.ts) |
| 扁平表转树 | 按 `id` / `parentId` 组装 `children` 后再渲染 | [flat-data.ts](../examples/tree/flat-data.ts) |

径向树核心差异（去掉 transpose，用极坐标把深度映射成半径）：

```ts-snippet
chart.options({
  type: 'tree',
  data: { type: 'inline', value: moduleData },
  encode: { value: 'taskCount' },
  coordinate: { type: 'polar' },
  style: {
    nodeFill: (d: any) => ['#722ed1', '#9254de', '#b37feb'][d.depth] ?? '#d3adf7',
    labelText: (d: any) => d.data.module,
  },
});
```

同级排序核心差异（按子树汇总值升序，避免默认按值降序打乱业务顺序）：

```ts-snippet
layout: { sortBy: (a: any, b: any) => a.value - b.value },
```

## 样式自定义

树图的 `style` 是**复合 mark 的前缀写法**：`nodeXxx` 配置节点（point）、`linkXxx` 配置连线（link）、`labelXxx` 配置节点标签。不要写成 `style: { node: { fill } }` 这种嵌套对象，嵌套键会被忽略。

| 定制项 | 写法 | 说明 |
|---|---|---|
| 节点填充 | `style: { nodeFill: '#5B8FF9' }` | 支持回调 `(d) => d.depth === 0 ? '#000' : '#5B8FF9'` |
| 节点描边 | `style: { nodeStroke: '#fff', nodeLineWidth: 1 }` | 深色背景下用白描边把节点与连线分开 |
| 连线颜色 | `style: { linkStroke: '#bfbfbf' }` | 默认 `#999` |
| 连线宽度 / 虚线 | `style: { linkLineWidth: 2, linkLineDash: [4, 4] }` | 虚线用于弱化从属关系 |
| 标签内容 | `style: { labelText: (d) => d.data.department }` | 字符串只对层级节点的 `name` 生效，业务字段用回调 |
| 标签字号 / 颜色 | `style: { labelFontSize: 11, labelFill: '#595959' }` | |
| 标签位置 / 偏移 | `style: { labelPosition: 'right', labelDx: 6, labelTextAlign: 'start' }` | `'left'` / `'right'` / `'top'` / `'bottom'` |
| 标签底色 | `style: { labelBackground: true, labelBackgroundFill: '#fff', labelBackgroundOpacity: 0.85 }` | 节点密集时避免文字压在连线上 |
| 布局排序 | `layout: { sortBy: (a, b) => a.value - b.value }` | 同级节点的排列顺序 |
| 布局间距 | `layout: { separation: (a, b) => (a.parent === b.parent ? 1 : 2) }` | d3 tidy tree 的相邻叶节点间距 |
| 径向布局 | `coordinate: { type: 'polar' }` | 根节点在圆心，适合层级深、节点多的场景 |
| 整体主题 | `theme: 'classicDark'` | 暗色大屏用 `'classicDark'`，连线与标签颜色自动适配 |

标签前缀同样适用于 tooltip：树图的 tooltip 按 `node` / `link` 分组，写 `tooltip: { nodeTitle: 'name', nodeItems: [{ field: 'value', name: '人数' }] }`；直接写在顶层的 `title` / `items` 对树图不生效。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `data: orgData`（直接传树对象） | `data: { type: 'inline', value: orgData }`；非数组对象会被当成连接器，`value` 为空导致白屏 |
| 扁平数组（`id` / `parentId`）直接传给 `data` | 先组装成 `children` 嵌套结构再渲染；5.4.8 的 tree 不支持 `layout.path` 扁平路径 |
| `encode: { x: 'x', y: 'y' }` 控制节点位置 | 位置由 tidy tree 布局计算，`encode` 只用 `value` 指定权重字段 |
| `labels: [{ text: 'department' }]` 传业务字段名字符串 | 字符串按层级节点字段取值（只有 `name` 有值）；业务字段用回调 `text: (d) => d.data.department` |
| `style: { node: { fill: '#000' } }` 嵌套写样式 | 复合 mark 用前缀扁平写法：`nodeFill` / `linkStroke` / `labelText` |
| `tooltip: { title: '部门', items: [...] }` | `tooltip: { nodeTitle: 'name', nodeItems: [...] }`；树图 tooltip 按 node / link 前缀分组 |
| `coordinate: { type: 'transpose' }` | `coordinate: { transform: [{ type: 'transpose' }] }`；transpose 是坐标变换不是坐标系类型 |
| `style: { nodeSize: 8 }` 放大节点，或把 `layout.nodeSize` 当节点大小 | 节点半径由内部 point 的 `encode.size`（固定 2）决定，`style.nodeSize` 不生效；`layout.nodeSize` 是 d3 布局间距，不是视觉大小 |
| `linkShape: 'vhv'` 想换直角连线 | tree 内部的 link mark 已把 `shape` 固定为 `smooth`，改连线形状需要自己用 link + point 拼组合图 |
| `new Tree('container', { data, childrenField })`（G2Plot v2） | `new Chart({ container })` + `type: 'tree'` |
| 用 `type: 'treemap'` 表达层级 | tree 强调层级连接关系；treemap 用矩形面积表达占比 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/tree/basic.ts) | 横向组织架构，最简起步 | `type: 'tree'`、`data.value` 包裹、`transpose`、`labelText` 回调 |
| [with-label.ts](../examples/tree/with-label.ts) | 品类树节点直接展示名称与汇总 SKU 数 | `labelText` 拼 `d.value`、`labelBackground`、`nodeTitle/nodeItems` |
| [radial.ts](../examples/tree/radial.ts) | 层级较多的产品模块地图，放射状布局 | `coordinate: { type: 'polar' }`、`nodeFill` 按 `d.depth` 着色 |
| [flat-data.ts](../examples/tree/flat-data.ts) | 后端返回 `id` / `parentId` 扁平表 | 先 `buildTree` 组装 `children`，再交给 tree 渲染 |
