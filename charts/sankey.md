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
- 存在循环流向（A → B → A）→ 桑基图不支持环，先拆成有向无环图
- 节点过多（> 30）→ 轨道会拥挤到不可读，先合并小流量或改用汇总视图

## 数据要求

- 每条记录表示一条流，包含 `source`（来源节点）、`target`（去向节点）、`value`（流量，number）
- 数据需包装为 `{ value: { links, nodes? } }`；`nodes` 可省略，省略时从 links 自动推导
- `source` / `target` 是节点名称字符串，同一节点的名称必须完全一致
- `value` 必须是数值，字符串数字先 `Number()` 转换；不支持负数
- 图必须是有向无环图（DAG）
- 同一节点的流入总量与流出总量应尽量相等；不相等时节点高度按较大的一侧计算，视觉上会不平衡
- 需要固定节点顺序时，显式传 `nodes: [{ key: '节点名' }]`，顺序即节点在轨道内的排列顺序
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
| 多层级流转 | 显式 `nodes` 固定顺序 + `layout.nodeWidth / nodePadding / iterations` | [energy.ts](../examples/sankey/energy.ts) |
| 左对齐布局 | `layout: { nodeAlign: 'left' }` | [custom-style.ts](../examples/sankey/custom-style.ts) |
| 节点标签带数值 | `style: { labelText: (d) => ... }` 替换默认标签内容 | [custom-style.ts](../examples/sankey/custom-style.ts) |
| 品牌配色 | `scale: { color: { range: [...] } }` 自定义节点颜色 | [custom-style.ts](../examples/sankey/custom-style.ts) |
| 紧凑轨道 | 减小 `layout.nodeWidth`、`layout.nodePadding` | [energy.ts](../examples/sankey/energy.ts) |

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
| 布局迭代 | `layout: { iterations: 10 }` | 迭代次数越多，交叉越少但计算越慢 |
| 节点调色板 | `scale: { color: { range: ['#5B8FF9', '#61DDAA'] } }` | 节点颜色默认按节点 key 映射 |
| 链接颜色 | `style: { linkFill: '#9fb3c8' }` | 链接默认 `#aaa` |
| 链接透明度 | `style: { linkFillOpacity: 0.35 }` | 降低透明度避免遮挡节点 |
| 节点描边 | `style: { nodeStroke: '#fff', nodeLineWidth: 1 }` | 深色背景常用白色描边分隔节点 |
| 标签字号 | `style: { labelFontSize: 12 }` | 节点标签统一字号 |
| 标签间距 | `style: { labelSpacing: 6 }` | 标签与节点的距离（px） |
| 标签字重 | `style: { labelFontWeight: 'bold' }` | `'normal'` / `'bold'` |
| 标签内容 | `style: { labelText: (d) => \`${d.key} ${d.value}\` }` | 回调参数含节点 `key`、`value`；会替换默认节点名标签 |
| 关闭图例 | `legend: false` | 桑基图默认不展示图例，显式关闭更稳 |

链接默认是统一的半透明灰色；节点颜色随 key 自动分配。需要链接跟随来源节点着色时，用 `encode: { linkColor: 'source' }`，此时链接会按来源名称重新取色，与节点颜色不一定完全一致，优先用中性色链接突出流向。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `data: links` 或 `data: { links }`（缺少 `value` 包装，部分版本渲染空图） | `data: { value: { links } }` |
| `data: { value: { nodes } }` 只给节点不给链接 | 链接是必需的；`nodes` 只是可选的顺序控制 |
| `source: '电力'` 与 `target: '电力公司'` 混用 | 同一节点名称必须完全一致，否则断成两个节点 |
| 数据里出现环（`A → B` 且 `B → A`） | 桑基图只支持有向无环图，先拆分环路 |
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
| [energy.ts](../examples/sankey/energy.ts) | 多级能源流向，一次能源到终端消费 | 显式 `nodes`、`layout.nodeWidth/nodePadding/iterations`、`scale.color.range` |
| [custom-style.ts](../examples/sankey/custom-style.ts) | 预算分配，节点旁直接读金额 | `layout.nodeAlign: 'left'`、`style.labelText` 回调、`labelFontWeight`、`nodeStroke` |
