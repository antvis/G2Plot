# Circle-packing 圆树/圆包裹图

> 组件用途：展示层级关系的树状结构，通过嵌套圆圈表示类别间的包含与面积比例。

## 何时使用

- **层级树可视化**：组织结构图、目录树、产品/分类层级
- **面积比例展示**：各子类别占父类别的比例（面积 ∝ 数值）
- **空间占比分析**：直观展示各部分在整体中的空间占有情况

## 何时不用

- 纯类别对比（无层级）→ 用 `column` 柱状图 或 `pie` 饼图
- 两个数值变量的相关性 → 用 `scatter` 散点图
- 连续二维空间密度 → 用 `heatmap` 热力图
- 仅关注单个数值大小对比 → 用 `bar` 柱状图

## 数据要求

- **层级长表数据**，每行一个节点，包含路径和数值
- `name` 字段：节点名称（字符串）
- `value` 字段：节点数值（number），决定圆面积大小
- `parent` 字段（可选）：父节点名称，用于构建层级；若缺失则视为根节点
- 数值必须是 `number` 类型，服务端返回的字符串数字需先 `Number()` 转换

**数据示例**：

```json
[
  { "name": "根节点", "value": 100 },
  { "name": "子节点A", "value": 40, "parent": "根节点" },
  { "name": "子节点B", "value": 60, "parent": "根节点" },
  { "name": "子节点A-1", "value": 15, "parent": "子节点A" },
  { "name": "子节点A-2", "value": 25, "parent": "子节点A" }
]
```

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { name: '根节点', value: 100 },
  { name: '子节点A', value: 40, parent: '根节点' },
  { name: '子节点B', value: 60, parent: '根节点' },
  { name: '子节点A-1', value: 15, parent: '子节点A' },
  { name: '子节点A-2', value: 25, parent: '子节点A' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'circle-packing',
  data,
  encode: {
    name: 'name',
    value: 'value',
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多层级嵌套 | `parent` 字段指向更深层父节点，展开更多层级 | [deep-hierarchy.ts](../examples/circle-packing/deep-hierarchy.ts) |
| 颜色分组 | `encode.color` 映射类别字段，按系列着色 | [color-group.ts](../examples/circle-packing/color-group.ts) |
| 根节点高亮 | `style` 调整根节点圆的颜色/边框 | [highlight-root.ts](../examples/circle-packing/highlight-root.ts) |

### 颜色分组核心差异

```ts-snippet
chart.options({
  type: 'circle-packing',
  data,
  encode: {
    name: 'name',
    value: 'value',
    color: 'category',  // 映射类别字段实现分组着色
  },
  scale: {
    color: { range: ['#5B8FF9', '#5AD8A6', '#FA8C00'] },
  },
});
```

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验）：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 颜色色阶 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 多系列按序着色 |
| 单系列颜色 | `style: { fill: '#5B8FF9' }` | 固定圆颜色 |
| 圆边框 | `style: { stroke: '#ddd', lineWidth: 1 }` | 圆圈边框样式 |
| 圆角 | `style: { radius: 2 }` | 圆的圆角（默认 0） |
| 缩进间距 | `style: { inset: 5 }` | 子节点与父节点的间距 |
| 图例位置 | `legend: { color: { position: 'right' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | |
| 内置主题 | `theme: 'light' | 'dark' | 'classic' | 'classicDark'` | 一行切换整体配色 |

### 图表标题与组件文字样式

```ts-snippet
title: {
  title: '组织结构可视化',   // 主标题
  align: 'left',            // 'left' | 'center' | 'right'
  titleFontSize: 16,
  titleFill: '#1d1d1d',
},
```

数据标签与 tooltip 格式化：

```ts-snippet
labels: [{ text: 'value', position: 'top', style: { fontSize: 10 } }],
tooltip: {
  title: 'name',
  items: [{ channel: 'value', name: '数值', valueFormatter: (v) => `${v} (占比)` }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('name*value')` | `.encode('name', 'value')` |
| `import { CirclePacking } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` + `type: 'circle-packing'` |
| `new CirclePacking('container', { data })` | `new Chart({ container })` + `chart.options(spec)` |
| `parentField: 'parent'`（v2 配置） | 通过数据字段 `parent` 配合 `encode` 指定 |
| 字符串数字 `value` 直接使用 | 数值字段需 `Number()` 转换，否则 `NaN` 导致渲染异常 |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/circle-packing/basic.ts) | 最简圆包裹图，单根节点 + 子节点 | `type: 'circle-packing'` + `encode: { name, value }` |
| [deep-hierarchy.ts](../examples/circle-packing/deep-hierarchy.ts) | 多层级嵌套层次，父子多代 | `encode: { name, value, parent }` + 多层级父子关系 |
| [color-group.ts](../examples/circle-packing/color-group.ts) | 不同类别颜色分组，便于对比 | `encode.color` + 自定义 `scale.color.range` |
| [highlight-root.ts](../examples/circle-packing/highlight-root.ts) | 根节点视觉高亮，突出入口 | `style` 调整根节点填充/边框 |