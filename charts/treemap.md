# Treemap 矩形树图

> 组件用途：用嵌套矩形的面积展示层级数据的数值大小与构成关系。

## 何时使用

- 层级占比：品类 → 商品的销售额、部门 → 项目的预算构成
- 空间占用：目录 → 文件的磁盘占用、仓库 → 库位的容量使用
- 既要比较叶节点大小，又要保留一级分类或更深层级关系
- 分类较多，希望充分利用矩形区域，而非强调精确角度或排名

## 何时不用

- 只有少量单层类别且关注精确百分比 → 用 pie 饼图
- 无层级关系且需要精确比较或排序 → 用 bar 条形图 / column 柱状图
- 只关注节点连接关系、不比较数值面积 → 用 tree 树形图
- 展示连续时间的变化趋势 → 用 line 折线图

## 数据要求

- 使用单根树形对象：每个节点有 `name`，非叶节点通过 `children` 嵌套子节点；不要直接传长表
- 树形对象不是数组，需使用完整数据连接器：`data: { value: treeData }`
- 叶节点数值字段必须是非负 `number`，通过 `encode.value` 映射；字符串数字先 `Number()` 转换
- 默认 `layout.ignoreParentValue: true`，父级面积由叶节点自动汇总；通常只给叶节点填数值，避免父子重复计数
- 颜色、标签等回调拿到的是层次节点：原始字段在 `d.data`，层级路径在 `d.path`，汇总值在 `d.value`

## 基础实现（G2 v5）

```ts
/**
 * 基础矩形树图
 * 场景：按商品品类和具体商品观察销售额构成，矩形面积代表销售额大小
 * 要点：使用 children 嵌套树形数据；encode.value 映射叶节点数值，父级数值自动汇总
 */
import { Chart } from '@antv/g2';

const salesData = {
  name: '全部商品',
  children: [
    {
      name: '数码产品',
      children: [
        { name: '笔记本电脑', salesAmount: 420 },
        { name: '智能手机', salesAmount: 360 },
        { name: '平板电脑', salesAmount: 180 },
      ],
    },
    {
      name: '家用电器',
      children: [
        { name: '空气净化器', salesAmount: 260 },
        { name: '扫地机器人', salesAmount: 220 },
        { name: '咖啡机', salesAmount: 140 },
      ],
    },
    {
      name: '图书文具',
      children: [
        { name: '技术图书', salesAmount: 160 },
        { name: '文学图书', salesAmount: 120 },
        { name: '办公文具', salesAmount: 90 },
      ],
    },
  ],
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'treemap',
  data: { value: salesData },
  encode: { value: 'salesAmount' },
  layout: { tile: 'treemapSquarify', paddingInner: 2 },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分支配色 + 数值标签 | `encode.color` 按 `path[1]` 分组；`style.labelText` 自定义标签 | [custom-style.ts](../examples/treemap/custom-style.ts) |
| 层级下钻 | `interaction: { treemapDrillDown: { ... } }` | [drill-down.ts](../examples/treemap/drill-down.ts) |
| 市值涨跌热力图 | 面积映射市值，`encode.color` 回调读涨跌幅并发散配色 | [diverging-color.ts](../examples/treemap/diverging-color.ts) |

按一级分支着色的核心差异（同一分支使用相同颜色）：

```ts-snippet
encode: {
  value: 'salesAmount',
  color: (d) => d.path[1] || d.data.name,
},
```

## 样式自定义

常用视觉定制项，完整示例见 [custom-style.ts](../examples/treemap/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 分割算法 | `layout: { tile: 'treemapSquarify' }` | 默认接近正方形；也可选 `treemapBinary` / `treemapDice` / `treemapSlice` / `treemapSliceDice` |
| 矩形间距 | `layout: { paddingInner: 2 }` | 同层矩形之间的像素间距 |
| 四周留白 | `layout: { paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 5 }` | 单独使用 `paddingOuter` 会被默认四侧 padding 覆盖，实际不生效，需显式设置四个方向 |
| 父级标题空间 | `layout: { paddingTop: 20 }` | 在父级顶部预留空间，适合展示多层级标签 |
| 分类调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 配合 `encode.color` 的分支回调使用 |
| 发散色阶 | `scale: { color: { type: 'linear', domain: [-5, 0, 5], range: ['#D73027', '#FEE08B', '#1A9850'] } }` | 涨跌等正负指标：`linear` + 三色 `range` + 三段 `domain` 实现发散映射；G2 v5 未注册 `diverging` 色阶，不要使用 |
| 边框 | `style: { stroke: '#fff', lineWidth: 1 }` | 增强相邻矩形边界 |
| 填充透明度 | `style: { fillOpacity: 0.9 }` | 取值 0～1 |
| 标签内容与样式 | `style: { labelText: (d) => d.data.name, labelFill: '#fff', labelFontSize: 12 }` | 原始名称从 `d.data.name` 读取 |
| 标签换行 | `style: { labelMaxLines: 2 }` | 标签含 `\n` 或自动换行时必须设置；默认 `maxLines: 1` 会截断成只显示第一行 |
| 图例位置 | `legend: { color: { position: 'top' } }` | 也可 `legend: false` 关闭 |
| 提示格式化 | `tooltip.items` 配置 `field: 'value'` 与 `valueFormatter` | `value` 是当前节点的汇总值 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `import { Treemap } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new Treemap('container', { ... })`（G2Plot v2） | `new Chart({ container })` + `type: 'treemap'` |
| `data: treeData`（直接传树形对象） | `data: { value: treeData }` |
| 直接传 `[{ category, product, amount }]` 长表 | 先转换成 `name` / `children` 嵌套的树形对象 |
| 用 `encode.x/y` 控制矩形面积 | 用 `encode: { value: 'salesAmount' }`，布局自动计算 `x/y` |
| `encode: { color: 'growthRate' }` 读取叶节点自定义字段 | `color: (d) => d.data.growthRate`，原始字段在 `d.data` |
| 标签回调使用 `d.name` | 使用 `d.data.name`；默认标签也可直接显示路径末级名称 |
| 父节点和叶节点都填数值，又设置 `ignoreParentValue: false` | 通常只填叶节点数值并保持默认 `ignoreParentValue: true`，避免重复求和 |
| `interaction: { drillDown: true }` | treemap 专用交互为 `interaction: { treemapDrillDown: true }` |
| `scale: { color: { type: 'diverging', ... } }` | G2 v5 未注册 `diverging` 色阶，会报 `Unknown Component`；发散配色用 `type: 'linear'` + `domain: [-5, 0, 5]` + 三色 `range` |
| 单独设置 `layout: { paddingOuter: 5 }` 留白 | `paddingOuter` 会被默认四侧 padding 覆盖不生效；显式设置 `paddingTop` / `paddingRight` / `paddingBottom` / `paddingLeft` |
| 标签写 `\n` 换行就以为会多行显示 | 必须同时设置 `style.labelMaxLines: 2`，默认 `maxLines: 1` 只显示第一行 |
| 负值或字符串数字直接映射面积 | 面积值需为非负 `number`；负向指标仅用于颜色，不用于 `encode.value` |
| 颜色回调直接 `rate.toFixed(1)` | 涨跌幅字段可能缺失，先判空回退（如 `?? 0` 或显示 `—`），避免运行时报错 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/treemap/basic.ts) | 品类 → 商品销售额构成，最简起步 | `data: { value }` + `encode.value` + `layout.tile` |
| [custom-style.ts](../examples/treemap/custom-style.ts) | 分支配色、名称与数值标签、提示格式化 | `encode.color` 分支回调、`scale.color.range`、`style.labelText`、`style.labelMaxLines` |
| [diverging-color.ts](../examples/treemap/diverging-color.ts) | 面积表示市值、颜色红黄绿表示涨跌幅的发散配色 | `encode.color` 回调读 `d.data`、`scale.color` linear 三色发散、缺失值回退 |
| [drill-down.ts](../examples/treemap/drill-down.ts) | 从业务线下钻到产品并返回上级 | `interaction.treemapDrillDown` + 面包屑样式 |
