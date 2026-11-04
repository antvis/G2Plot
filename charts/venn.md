# Venn 韦恩图

> 组件用途：用重叠区域展示 2~4 个集合及其交集的大小关系，适合分析用户群体、功能或技能的重叠。

## 何时使用

- 集合重叠分析：多渠道用户重合、多款产品功能重合、复合型技能分布
- 已知各集合与交集的汇总大小，希望直观呈现“有哪些交集、重叠程度如何”
- 集合数量为 2~4 个，且重点关系能够用少量区域清晰表达

## 何时不用

- 超过 4 个集合或需要比较大量交集 → 用集合交集矩阵（cell 热力图）或 column 柱状图汇总重点交集
- 只展示互斥类别的占比 → 用 pie 饼图
- 强调各类别数值的精确比较 → 用 column 柱状图或 bar 条形图
- 只有逐条成员明细、尚未统计集合与交集大小 → 先聚合，不要直接绘制

## 数据要求

- 汇总数据，每行表示一个集合或一个交集组合，而不是一行一个成员
- `sets` 字段：字符串数组；单集合如 `['前端']`，交集如 `['前端', '后端']`；名称必须完全一致
- `size` 字段：非负数值（number），表示该集合或交集的总大小；单集合大小**包含**交集成员，不是排除交集后的独占人数
- `label` 字段（可选）：区域显示文案；未提供时可通过标签回调组合集合名与数值
- 三集合场景通常提供 3 个单集合、3 个两两交集、1 个三集合交集，共 7 行
- `venn` 数据转换会生成 `key` 和 `path` 字段，无需在输入数据中手工计算

## 基础实现（G2 v5）

韦恩图 = `type: 'path'` + **data 级** `transform: [{ type: 'venn' }]` + `encode: { d: 'path', color: 'key' }`。

```ts
import { Chart } from '@antv/g2';

const data = [
  { sets: ['内容推荐'], size: 1200, label: '内容推荐' },
  { sets: ['社交分享'], size: 800, label: '社交分享' },
  { sets: ['内容推荐', '社交分享'], size: 300, label: '双渠道用户' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: data,
    transform: [{ type: 'venn' }],
  },
  encode: { d: 'path', color: 'key' },
  labels: [{ position: 'inside', text: 'label' }],
  style: {
    opacity: (d: { sets: string[] }) => (d.sets.length > 1 ? 0.45 : 0.75),
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 三集合韦恩图 | 数据补齐单集合、两两交集与三集合交集 | [three-sets.ts](../examples/venn/three-sets.ts) |
| 空心韦恩图 | `encode` 增加 `shape: 'hollow'`，`style.lineWidth` 调整轮廓 | [hollow.ts](../examples/venn/hollow.ts) |
| 带区域标签 | `labels: [{ position: 'inside', text: 'label' }]` | [basic.ts](../examples/venn/basic.ts) |

空心样式核心差异：

```ts-snippet
encode: { d: 'path', color: 'key', shape: 'hollow' },
style: { lineWidth: 2 },
```

## 样式自定义

常用视觉定制项，完整示例见 [three-sets.ts](../examples/venn/three-sets.ts) 与 [hollow.ts](../examples/venn/hollow.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 区域调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] } }` | 自定义颜色数组用 `range`，不要传给 `palette` |
| 交集透明度 | `style: { opacity: (d) => d.sets.length > 1 ? 0.45 : 0.75 }` | 按集合数组长度区分单集合与交集 |
| 空心轮廓 | `encode: { shape: 'hollow' }` + `style: { lineWidth: 2 }` | 只显示区域边界 |
| 区域标签 | `labels: [{ position: 'inside', text: 'label', style: { fontSize: 12 } }]` | 也可用 text 回调拼接 `label` 与 `size` |
| 布局内边距 | `data.transform: [{ type: 'venn', padding: 12 }]` | 单位为 px；这是 venn 布局参数，不是 spec `padding` |
| 图例位置 | `legend: { color: { position: 'top' } }` | 区域较多时可设 `legend: false`，保留区域标签 |
| 图表标题 | `title: { title: '用户渠道重叠', subtitle: '单位：人' }` | `title` 必须是对象，不能直接写字符串 |
| 内置主题 | `theme: 'classicDark'` | 暗色大屏可切换整体配色 |

区域名称与人数提示：

```ts-snippet
tooltip: {
  title: 'label',
  items: [
    { field: 'size', name: '人数', valueFormatter: (v) => `${v} 人` },
  ],
},
```

悬停高亮当前区域：

```ts-snippet
state: {
  active: { opacity: 0.9 },
  inactive: { opacity: 0.2 },
},
interaction: [{ type: 'elementHighlight' }],
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'venn'` | G2 v5 没有独立 venn mark；用 `type: 'path'` + venn 数据转换 |
| 把 `{ type: 'venn' }` 放到 mark 级 `transform` | venn 是数据转换，放在 `data: { type: 'inline', value, transform: [...] }` 内 |
| `encode: { x: 'sets', y: 'size' }` | `encode: { d: 'path', color: 'key' }`；`path` 与 `key` 由转换生成 |
| 手工计算 SVG path 或交集 key | 输入 `sets` / `size`，由 venn 转换生成 `path` / `key` |
| 一行一个成员的原始明细直接绘图 | 先聚合为每个集合/交集一行的 `sets` + `size` 汇总数据 |
| 单集合 `size` 填排除交集后的独占人数 | 单集合填总大小（包含交集），交集大小另起一行提供 |
| `new Venn('container', {...})`（G2Plot v2） | `import { Chart } from '@antv/g2'` + `new Chart({ container })` + `chart.options(spec)` |
| `interactions: [{ type: 'elementHighlight' }]` | 使用单数 `interaction: [{ type: 'elementHighlight' }]` |
| 手动设置 spec `padding` 给布局留白 | 用 venn 转换的 `padding`，保持 spec 默认自动布局 |
| 5 个以上集合仍强行绘制 | 控制在 2~4 个；更多集合改用交集矩阵或重点交集柱状图 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/venn/basic.ts) | 两集合用户群体及重叠人群，最简起步 | `type: 'path'` + data 级 `venn` 转换 + `encode.d/color` + 区域标签 |
| [three-sets.ts](../examples/venn/three-sets.ts) | 三类技能人员的两两及三者重叠 | 7 行集合/交集汇总数据 + `scale.color.range` 自定义区域配色 |
| [hollow.ts](../examples/venn/hollow.ts) | 强调集合边界、减少填充遮挡 | `encode.shape: 'hollow'` + `style.lineWidth` |
