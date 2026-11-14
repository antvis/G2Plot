# Sankey 桑基图

> 组件用途：展示有方向的流量如何在不同节点之间分配与汇合，宽度表示数量大小。

## 何时使用

- 路径拆解：用户从访问、注册到付费的每一跳去向，同时看到流失分支
- 多级流转：能源、资金、物料经过多个环节流向终端
- 总量分配：一份预算/流量被拆分到多个去向，需要同时表达「分了多少」和「分到哪」
- 数据可抽象为「来源 → 去向 + 数值」，且流向无环

## 何时不用

- 单一链路的阶段转化率（没有分支）→ 用 funnel 漏斗图
- 类别占比、构成 → 用 pie 饼图
- 两个类别的交叉密度、无方向关系 → 用 heatmap 热力图
- 存在循环流向（A → B → A）→ 桑基图不支持环，先按[无环处理](#无环处理拆环参考)拆成有向无环图
- 节点过多（> 30）→ 轨道会拥挤到不可读，先合并小流量或改用汇总视图

## 数据要求

- 每条记录表示一条流，包含 `source`（来源节点）、`target`（去向节点）、`value`（流量，number）
- 数据需包装为 `{ value: { links, nodes? } }`；`nodes` 可省略，省略时从 links 自动推导
- `source` / `target` 是节点名称字符串，同一节点的名称必须完全一致
- `value` 必须是数值，字符串数字先 `Number()` 转换；不支持负数
- 图必须是有向无环图（DAG）
- 同一节点的流入总量与流出总量应尽量相等；不相等时节点高度按较大的一侧计算，视觉上会不平衡
- 需要固定节点顺序时：显式传 `nodes: [{ key: '节点名' }]`，**并**设 `layout.nodeSort: null`；默认 `nodeSort: undefined` 布局仍会按节点纵向位置自动重排，只传 `nodes` 固定不了顺序
- 显式 `nodes` 必须覆盖**全部链接端点**：links 里出现而 `nodes` 漏列的节点会直接抛 `missing: 节点名`
- 字段名不是 `source` / `target` / `value` 时，用 `encode` 重新映射：

```ts-snippet
data: {
  value: {
    links: [
      { from: '访问', to: '注册', amount: 4200 },
    ],
  },
},
encode: { source: 'from', target: 'to', value: 'amount' },
```

固定节点顺序的完整写法（`nodes` 列全 + 关闭自动重排）：

```ts-snippet
data: {
  value: {
    links: [
      { source: '煤炭', target: '发电', value: 280 },
      { source: '石油', target: '交通', value: 200 },
      // ...
    ],
    // nodes 必须覆盖上面所有 source / target，漏一个就抛 missing: 节点名
    nodes: [{ key: '煤炭' }, { key: '石油' }, { key: '发电' }, { key: '交通' }],
  },
},
layout: {
  nodeSort: null, // null = 沿用 nodes 给定顺序；undefined（默认）会自动重排
  // nodeSort: (a, b) => b.value - a.value, // 也可传自定义比较函数
},
```

## 无环处理（拆环参考）

桑基图只接受有向无环图，数据里出现 `A → B` 且 `B → A` 时会报 `circular link`。按数据语义二选一：

- **业务确实分阶段**：按阶段区分节点，把回流指向「下一阶段的副本」而不是原节点，避免重新闭合回路。例如返工流程拆成 `处理(第1期) → 验收(第1期) → 处理(第2期)`，节点名带期次/阶段后缀，整体仍是 DAG
- **真实循环关系**：没有阶段语义、A 与 B 互为上下游时，桑基图不合适，改用能表达关系的图表（两两关系密度用 heatmap，网络结构用 G6 力导向图）

拆环后仍要让每个中间节点的流入总量 ≈ 流出总量。

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const links = [
  { source: '访问官网', target: '注册试用', value: 4200 },
  { source: '访问官网', target: '直接离开', value: 5800 },
  { source: '注册试用', target: '激活账号', value: 3000 },
  { source: '注册试用', target: '放弃试用', value: 1200 },
  { source: '激活账号', target: '购买付费', value: 900 },
  { source: '激活账号', target: '免费使用', value: 2100 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sankey',
  data: { value: { links } },
  layout: {
    nodeAlign: 'justify',
    nodePadding: 0.03,
  },
  style: {
    labelSpacing: 6,
    labelFontSize: 12,
    nodeLineWidth: 1,
    linkFillOpacity: 0.35,
  },
  legend: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多层级流转 | 显式 `nodes` + `layout.nodeSort: null` 固定顺序，`nodeWidth / nodePadding / iterations` 调轨道 | [energy.ts](../examples/sankey/energy.ts) |
| 左对齐布局 | `layout: { nodeAlign: 'left' }` | [custom-style.ts](../examples/sankey/custom-style.ts) |
| 节点标签带数值 | `style: { labelText: (d) => ... }` 替换默认标签内容 | [custom-style.ts](../examples/sankey/custom-style.ts) |
| 品牌配色 | `scale: { color: { range: [...] } }` 自定义节点颜色 | [custom-style.ts](../examples/sankey/custom-style.ts) |
| 紧凑轨道 | 减小 `layout.nodeWidth`、`layout.nodePadding` | [energy.ts](../examples/sankey/energy.ts) |
| 悬停状态高亮 | `interaction: [{ type: 'elementHighlight' }]` + `state.active / inactive` | [interaction.ts](../examples/sankey/interaction.ts) |

对齐方式控制节点在水平方向靠哪一侧，`justify` 会把末端节点推到最右侧：

```ts-snippet
layout: {
  nodeAlign: 'left', // 'left' | 'right' | 'center' | 'justify'
  nodeWidth: 0.03,   // 节点宽度，相对画布宽度（0~1）
  nodePadding: 0.05, // 节点上下间距，相对画布高度（0~1）
},
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 节点宽度 | `layout: { nodeWidth: 0.02 }` | 相对画布宽度，0~1 |
| 节点间距 | `layout: { nodePadding: 0.03 }` | 相对画布高度，0~1 |
| 节点对齐 | `layout: { nodeAlign: 'justify' }` | `'left'` / `'right'` / `'center'` / `'justify'` |
| 节点顺序 | `layout: { nodeSort: null }` | `null` 沿用 `nodes` 给定顺序；`undefined`（默认）自动重排；也可传比较函数 `(a, b) => number` |
| 布局迭代 | `layout: { iterations: 10 }` | 迭代次数越多，交叉越少但计算越慢 |
| 节点调色板 | `scale: { color: { range: ['#5B8FF9', '#61DDAA'] } }` | 节点颜色默认按节点 key 映射 |
| 链接颜色 | `style: { linkFill: '#9fb3c8' }` | 链接默认 `#aaa` |
| 链接透明度 | `style: { linkFillOpacity: 0.35 }` | 降低透明度避免遮挡节点 |
| 节点描边 | `style: { nodeStroke: '#fff', nodeLineWidth: 1 }` | 深色背景常用白色描边分隔节点 |
| 标签字号 | `style: { labelFontSize: 12 }` | 节点标签统一字号 |
| 标签间距 | `style: { labelSpacing: 6 }` | 标签与节点的距离（px） |
| 标签字重 | `style: { labelFontWeight: 'bold' }` | `'normal'` / `'bold'` |
| 标签内容 | `style: { labelText: (d) => \`${d.key} ${d.value}\` }` | 回调参数含节点 `key`、`value`；会替换默认节点名标签 |
| 悬停高亮 | `interaction: [{ type: 'elementHighlight' }]` + `state: { active: {...} }` | 命中的节点/链接进入 `active` 状态 |
| 其余变淡 | `state: { inactive: { fillOpacity: 0.15 } }` | 与 `elementHighlight` 配合，未命中的元素进入 `inactive` |
| 关闭图例 | `legend: false` | 桑基图默认不展示图例，显式关闭更稳 |

链接默认是统一的半透明灰色；节点颜色随 key 自动分配。需要链接跟随来源节点着色时，用 `encode: { linkColor: 'source' }`，此时链接会按来源名称重新取色，与节点颜色不一定完全一致，优先用中性色链接突出流向。

**交互能力边界**：当前内置 sankey 只开箱提供 hover 高亮与 tooltip，**不提供 `nodeDraggable` 开关**（G2 5.4.8 无此配置）。旧版/其他库常见的「拖拽节点手动调布局」需要自定义交互实现：监听指针事件改写数据后重新 `chart.render()`；不要写 `layout: { nodeDraggable: true }` 之类的幻觉配置。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `data: links` 或 `data: { links }`（缺少 `value` 包装，部分版本渲染空图） | `data: { value: { links } }` |
| `data: { value: { nodes } }` 只给节点不给链接 | 链接是必需的；`nodes` 只是可选的顺序控制 |
| 传了 `nodes` 就以为顺序固定了 | 还要 `layout: { nodeSort: null }`；默认 `undefined` 会自动重排 |
| `nodes` 只列想排序的几个节点 | `nodes` 必须覆盖全部链接端点，漏列抛 `missing: 节点名` |
| 拆环时把回流接回原节点（`A → B`、`B → A`） | 按阶段区分节点（`A(第1期) → B → A(第2期)`）；无阶段的真实循环改用其他图表 |
| 写 `layout: { nodeDraggable: true }` 期望拖拽节点 | 内置 sankey 无 `nodeDraggable` 开关，需自定义交互实现 |
| `source: '电力'` 与 `target: '电力公司'` 混用 | 同一节点名称必须完全一致，否则断成两个节点 |
| 数据里出现环（`A → B` 且 `B → A`） | 桑基图只支持有向无环图，按[无环处理](#无环处理拆环参考)拆分环路 |
| `value: '4200'`（字符串） | `value: 4200`，或先 `Number()` 转换 |
| `xField` / `yField` / `seriesField`（G2Plot v2） | `encode: { source, target, value }` |
| `new Sankey('container', { ... })`（G2Plot v2） | `new Chart({ container })` + `type: 'sankey'` |
| 手动传 `x` / `y` 坐标 | 桑基图由 `layout` 自动计算节点与链接位置 |
| 流入流出总量差异很大却期望节点等高 | 先补齐/合并数据，让每个中间节点的流入总量与流出总量相等 |
| 节点超过 30 个仍不聚合 | 合并小流量节点，或改用汇总视图 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/sankey/basic.ts) | 用户转化路径，含流失分支，最简起步 | `data: { value: { links } }`、`layout.nodeAlign`、`style.linkFillOpacity` |
| [energy.ts](../examples/sankey/energy.ts) | 多级能源流向，一次能源到终端消费 | 显式 `nodes`、`layout.nodeSort: null`、`layout.nodeWidth/nodePadding/iterations`、`scale.color.range` |
| [custom-style.ts](../examples/sankey/custom-style.ts) | 预算分配，节点旁直接读金额 | `layout.nodeAlign: 'left'`、`style.labelText` 回调、`labelFontWeight`、`nodeStroke` |
| [interaction.ts](../examples/sankey/interaction.ts) | 供应链多级流向，悬停看清某条链路 | `interaction.elementHighlight`、`state.active` / `state.inactive` |
