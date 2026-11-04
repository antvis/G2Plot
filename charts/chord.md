# Chord 和弦图

> 组件用途：用圆周上的节点弧与连接弦带，展示多个实体之间的双向流量和关系强度。

## 何时使用

- 双向流量与关系强度：城市人口迁徙、国家进出口贸易、部门协作工单、服务调用量
- 需要同时看两件事：每个实体的总量（外弧长度 = 流入 + 流出）、两两之间的规模（弦带宽度）
- 数据本身是边列表（源节点 / 目标节点 / 权重），节点数在 5 ~ 15 之间

## 何时不用

- 单向、分层的流转（A → B → C 逐级转化）→ 用 sankey 桑基图
- 只看两个类别的交叉密度或相关性，不关心方向 → 用 heatmap 热力图
- 占比、构成 → 用 pie 饼图
- 多指标多维能力对比 → 用 radar 雷达图
- 节点超过 15 个、边稀疏的网络结构 → 用 forceGraph 关系图；或先按总量聚合 TopN 再用 chord

## 数据要求

- 长表边列表，每行一条关系：`{ source, target, value }`
- `source` / `target`：节点名字符串；**同一实体在每条边里的写法必须完全一致**（`'北京'` 与 `'北京市'` 会被当成两个节点）
- `value`：正数值（number）权重，决定弦带宽度与节点弧长；布局对权重有 `|| 1` 兜底，`0` 会被当作 1 画出一条极细的弦，负数会让弧长计算异常，应在数据侧过滤
- 字段名可自定义，用 `encode.source` / `encode.target` / `encode.value` 映射，优先保留业务语义（如 `from` / `to` / `migrants`）
- 数据容器写成 `{ value: { links } }`：外层 `value` 是 data connector 字段，不是权重；直接传 `links` 数组也能渲染，但无法同时附带 `nodes`
- 节点默认由边自动推导；需要固定顺序或加入孤立节点时才额外提供 `nodes: [{ key: '北京' }]`
- 推荐节点 5 ~ 15 个、边 10 ~ 40 条；节点过多时先聚合

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

/**
 * 基础弦图
 * 场景：城市之间的人口迁徙流量，弦带宽度表示迁徙规模
 * 要点：边数据用 { value: { links } } 包裹；encode 映射 source / target / value；
 *       节点默认由边自动推导，无需单独提供 nodes
 */
const links = [
  { from: '北京', to: '上海', migrants: 12.4 },
  { from: '北京', to: '深圳', migrants: 9.8 },
  { from: '北京', to: '杭州', migrants: 6.2 },
  { from: '上海', to: '杭州', migrants: 15.6 },
  { from: '上海', to: '深圳', migrants: 8.1 },
  { from: '深圳', to: '广州', migrants: 18.3 },
  { from: '广州', to: '杭州', migrants: 5.4 },
  { from: '成都', to: '北京', migrants: 7.7 },
  { from: '成都', to: '深圳', migrants: 6.9 },
  { from: '杭州', to: '成都', migrants: 4.2 },
  { from: '广州', to: '成都', migrants: 5.1 },
  { from: '深圳', to: '北京', migrants: 7.3 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'chord',
  data: { value: { links } },
  encode: { source: 'from', target: 'to', value: 'migrants' },
});

chart.render();
```

读图方式：外弧长度 = 该节点的总流量（流入 + 流出），弦带宽度 = 该方向上的流量；节点标签默认显示在圆弧外侧。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 自定义配色 + 节点排序 | `scale.color.range`、`layout.sortBy: 'weight'` | [custom-style.ts](../examples/chord/custom-style.ts) |
| 双向互流 | 同一对节点各写一条 `source` / `target` 相反的边 | [bidirectional.ts](../examples/chord/bidirectional.ts) |
| 暗色大屏 | `theme: 'classicDark'` + 浅色标签 | [dark-theme.ts](../examples/chord/dark-theme.ts) |
| 自定义 tooltip | `tooltip.linkTitle/linkItems/nodeTitle/nodeItems` | [with-tooltip.ts](../examples/chord/with-tooltip.ts) |

自定义配色与节点排序核心差异（按总流量从大到小排列节点，便于阅读主要流向）：

```ts-snippet
layout: { nodeWidthRatio: 0.06, nodePaddingRatio: 0.04, sortBy: 'weight' },
scale: { color: { type: 'ordinal', range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] } },
```

## 样式自定义

chord 是复合 mark，`style` 用前缀区分作用对象：`link*` 作用于弦带、`label*` 作用于节点标签、`node*` 作用于节点弧。完整示例见 [custom-style.ts](../examples/chord/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 节点配色 | `scale: { color: { type: 'ordinal', range: ['#5B8FF9', '#5AD8A6'] } }` | 按节点值序取色；颜色数组用 `range` |
| 节点弧宽度 | `layout: { nodeWidthRatio: 0.05 }` | 0 ~ 1，相对画布的比例 |
| 节点间距 | `layout: { nodePaddingRatio: 0.1 }` | 0 ~ 1，节点之间的留白比例 |
| 节点排序 | `layout: { sortBy: 'weight' }` | `'id'` / `'weight'` / `'frequency'` / 自定义比较函数 |
| 弦带透明度 | `style: { linkFillOpacity: 0.5 }` | 弦带多条重叠时降到 0.4 ~ 0.7 |
| 弦带颜色 | `style: { linkFill: '#aaa' }` | 固定单色；不设置时弦带按 source 节点着色 |
| 弦带描边 | `style: { linkStroke: '#fff' }` | 用底色描边分隔并列的弦带 |
| 弦带虚线 | `style: { linkLineDash: [4, 4] }` | 数组为 实线/间隔 长度 |
| 节点样式 | `style: { nodeStroke: '#fff' }` | `nodeFill` 会覆盖 `scale.color` 的分类配色 |
| 标签字号/颜色/粗细 | `style: { labelFontSize: 12, labelFill: '#333', labelFontWeight: 'bold' }` | 标签默认在圆弧外侧 |
| 标签透明度 | `style: { labelFillOpacity: 0.8 }` | |
| 内置主题 | `theme: 'classicDark'` | 暗色场景自动适配背景与文字 |

tooltip 同样按前缀平铺（不是嵌套对象）：`link*` 作用于弦带、`node*` 作用于节点，完整示例见 [with-tooltip.ts](../examples/chord/with-tooltip.ts)：

```ts-snippet
tooltip: {
  linkTitle: (d) => `${d.source} → ${d.target}`,
  linkItems: [{ field: 'value', name: '迁徙人数（万人）' }],
  nodeTitle: '城市',
  nodeItems: [{ field: 'value', name: '总流量（万人）' }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.source('from').target('to').weight('value')`（v4 链式） | `encode: { source: 'from', target: 'to', value: 'value' }` |
| `new Chord('container', { sourceField, targetField, weightField })`（G2Plot v2） | `new Chart({ container })` + `type: 'chord'` |
| `data: { links }`（缺外层 `value`，数据进不了 connector，图表空白） | `data: { value: { links } }` |
| 边字段叫 `from` / `to` 却没配 encode（默认只找 `source` / `target`，节点变成 undefined） | `encode: { source: 'from', target: 'to' }` |
| 用 chord 画单向分层流转（A → B → C） | 用 `type: 'sankey'` 桑基图 |
| 节点超过 15 个还硬画，标签与弦带互相遮挡 | 先按总量聚合 TopN，或改用关系图 |
| 节点名不统一（`'北京'` / `'北京市'`） | 渲染前统一命名，否则会被拆成两个节点 |
| 边权重写 `0` 却期望完全不可见 | 布局对权重有 `|| 1` 兜底，0 会画成极细的弦；不需要的边先过滤 |
| `style: { fillOpacity: 0.4 }` / `style: { fontSize: 12 }`（无前缀，被丢弃） | 按作用对象加前缀：`linkFillOpacity`、`labelFontSize`、`nodeStroke` |
| `tooltip: { link: { items: [] } }`（嵌套写法不生效） | `tooltip: { linkItems: [] }`，平铺前缀 |
| `scale: { color: { palette: [...数组] } }` | `palette` 只接受调色板名字符串；颜色数组用 `range: [...]` |
| 期待坐标轴、图例、x/y 通道 | chord 无坐标轴；节点分类由颜色与标签表达 |
| 忘记 `chart.render()` | 配置完 spec 后必须调用 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/chord/basic.ts) | 城市间人口迁徙，最简起步 | `type: 'chord'` + `data: { value: { links } }` + `encode.source/target/value` |
| [custom-style.ts](../examples/chord/custom-style.ts) | 部门协作工单量，品牌配色与节点排序 | `scale.color.range`、`layout.nodeWidthRatio/nodePaddingRatio/sortBy`、`style.link*/label*` |
| [bidirectional.ts](../examples/chord/bidirectional.ts) | 城市往返迁徙，区分去程与返程 | `source` / `target` 互换的两条边、`layout.nodePaddingRatio` |
| [dark-theme.ts](../examples/chord/dark-theme.ts) | 监控大屏展示服务调用量 | `theme: 'classicDark'`、`style.linkFillOpacity`、`style.labelFill` |
| [with-tooltip.ts](../examples/chord/with-tooltip.ts) | 弦带/节点提示带单位，区分流向与总量 | `tooltip.linkTitle/linkItems/nodeTitle/nodeItems` |
