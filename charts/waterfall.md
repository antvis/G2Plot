# Waterfall 瀑布图

> 组件用途：展示一个起始值经过一系列增减变化后累积到最终值的过程，同时看清每一步的贡献。

## 何时使用

- 归因拆解：利润 / 现金流 / GMV 从期初到期末，各项因素分别贡献多少
- 增减过程：预算执行、成本构成、用户增长的去向与来源
- 需要同时表达「每一步的量」和「累计后的位置」——普通柱状图只能表达前者

## 何时不用

- 只对比各类别绝对值、不关心累计过程 → 用 column 柱状图
- 时间序列趋势 → 用 line 折线图
- 占比构成（各部分相加等于总量，但没有先后顺序） → 用 pie 饼图或堆叠柱状图
- 增减项超过 12 个 → 先合并为「其他」，否则柱子过窄、标签重叠

## 数据要求

- 长表数据，每行一个阶段，见 [数据模式](../references/data-patterns.md)
- `stage` 字段：阶段名称（字符串），按业务发生顺序排列；**不要**在渲染时再排序
- `change` 字段：该阶段的变动值（number），增加为正、减少为负；期初项填起始值，期末项可填 `0`，最终值由累计结果得出
- 渲染前必须把 `change` 换算成区间字段 `base` / `end`（见下节），直接映射 `change` 会得到从 0 起的普通柱
- 建议额外派生 `direction` 字段（`'增加'` / `'减少'` / `'合计'`），用于 `encode.color` 区分语义色

## 基础实现（G2 v5）

G2 v5 **没有** `waterfall` mark。瀑布图 = `type: 'interval'` + `y` / `y1` 两个位置通道画出浮动区间柱，再用 `color` 区分增减。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础瀑布图：月度利润构成拆解
 * 场景：从期初值出发，逐项展示增减变化如何累积到最终结果
 * 要点：G2 没有 waterfall mark —— 用 interval 的 y / y1 画浮动柱；
 *       先把「变动金额」累加成 [起, 止] 区间，再用 color 区分增加 / 减少 / 合计
 */
type ProfitStep = {
  stage: string;
  /** 该阶段的变动金额；期初项填起始值，期末项由累计结果决定 */
  change: number;
  kind: 'start' | 'change' | 'end';
};

const steps: ProfitStep[] = [
  { stage: '期初利润', change: 120, kind: 'start' },
  { stage: '新增订单', change: 46, kind: 'change' },
  { stage: '客单价提升', change: 28, kind: 'change' },
  { stage: '退款冲减', change: -34, kind: 'change' },
  { stage: '渠道费用', change: -22, kind: 'change' },
  { stage: '期末利润', change: 0, kind: 'end' },
];

// 累计：增加项从当前值向上画，减少项从当前值向下画
let running = 0;
const data = steps.map(({ stage, change, kind }) => {
  if (kind === 'start') {
    running = change;
    return { stage, base: 0, end: change, change, direction: '合计' };
  }
  if (kind === 'end') {
    return { stage, base: 0, end: running, change: running, direction: '合计' };
  }
  const after = running + change;
  const row = {
    stage,
    // 负增长时 running > after，取 min/max 保证柱体从下往上画
    base: Math.min(running, after),
    end: Math.max(running, after),
    change,
    direction: change >= 0 ? '增加' : '减少',
  };
  running = after;
  return row;
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  // y + y1 = 区间柱：柱体画在 [base, end] 之间，而不是从 0 起
  encode: { x: 'stage', y: 'base', y1: 'end', color: 'direction' },
  scale: {
    color: {
      domain: ['增加', '减少', '合计'],
      range: ['#2FA84F', '#E15759', '#5B8FF9'],
    },
  },
});

chart.render();
```

### 从变动量到累计区间

瀑布图的数据准备只有一步：把「变动值」换算成「这一根柱子从哪画到哪」。记住三个规则：

| 阶段类型 | `base` | `end` |
|---|---|---|
| 期初 / 期末（合计） | `0` | 当前累计值 |
| 增加项（`change > 0`） | 变化前的累计值 | 变化后的累计值 |
| 减少项（`change < 0`） | 变化后的累计值 | 变化前的累计值 |

```ts-snippet
const after = running + change;
const row = {
  stage,
  base: Math.min(running, after), // 负增长时 after 更小
  end: Math.max(running, after),
  change,
  direction: change >= 0 ? '增加' : '减少',
};
running = after; // 一定要在计算完当前项后再更新累计值
```

如果数据里已经有服务端算好的 `start` / `end` 字段，直接 `encode: { y: 'start', y1: 'end' }` 即可，跳过这段换算。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 带数据标签 + tooltip | `labels` 回调按方向加正负号，`tooltip.items` 用 `field: 'change'` | [with-label.ts](../examples/waterfall/with-label.ts) |
| 横向瀑布图 | `coordinate: { transform: [{ type: 'transpose' }] }` | [horizontal.ts](../examples/waterfall/horizontal.ts) |
| 品牌样式定制 | `scale.color.range`、`style.radius`、`scale.x.padding`、`title` | [custom-style.ts](../examples/waterfall/custom-style.ts) |

横向瀑布图核心差异（类别名长、项数多时更易读）：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  encode: { x: 'item', y: 'base', y1: 'end', color: 'direction' },
  coordinate: { transform: [{ type: 'transpose' }] },
});
```

带标签时的回调写法（`change` 是原始变动值，不是柱体的 y）：

```ts-snippet
labels: [
  {
    text: (d: { change: number; direction: string }) =>
      d.direction === '合计' ? `${d.change}` : `${d.change > 0 ? '+' : ''}${d.change}`,
    position: 'top',
    style: { fill: (d: { direction: string }) => (d.direction === '减少' ? '#E15759' : '#2FA84F') },
  },
],
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 语义配色 | `scale: { color: { domain: [...], range: [...] } }` | 用 `domain` 固定「增加 / 减少 / 合计」与颜色的对应关系 |
| 柱体圆角 | `style: { radius: 3 }` | 浮动柱同样生效 |
| 柱间距 | `scale: { x: { padding: 0.35 } }` | band scale 的内边距，越大柱子越窄 |
| 坐标轴标题 | `axis: { y: { title: 'GMV（万元）' } }` | 横向瀑布图里 y 对应水平数值轴 |
| 隐藏 y 轴标题 | `axis: { y: { title: null } }` | 单位已写进副标题时可省 |
| 图例位置 | `legend: { color: { position: 'top' } }` | 类别名较长时放顶部 |
| 关闭图例 | `legend: false` | 颜色语义在标题中已说明时可用 |
| 图表标题 | `title: { title, subtitle, align }` | `title` 必须是对象，不能直接写字符串 |

数据标签与 tooltip 格式化，完整示例见 [with-label.ts](../examples/waterfall/with-label.ts)：

```ts-snippet
labels: [{ text: 'change', position: 'top' }],
tooltip: {
  title: 'stage',
  items: [{ field: 'change', name: '变动金额', valueFormatter: (v) => `${v} 万元` }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'waterfall'`（不存在的 mark，运行报错 / 白屏） | `type: 'interval'` + `encode: { y: 'base', y1: 'end' }` |
| 直接把 `change` 映射到 `y` | 柱体会从 0 开始，得到普通柱状图；必须先换算 `base` / `end` |
| 减少项把负值直接给 `y` | 负数柱会倒挂且与相邻柱断开；取 `Math.min/Math.max` 得到正向区间 |
| 先更新 `running` 再算 `base` / `end` | 当前柱的区间错位一格；先算区间，最后更新 `running` |
| 期初 / 期末也用 `change` 当区间 | 合计项必须从 0 画到累计值，`base` 固定为 `0` |
| `chart.options` 里再调一次 `chart.options` | `options` 是全量替换，后一次会覆盖前一次；所有配置写在同一个 spec |
| `encode: { y1: 'end' }` 只写 y1 不写 y | `y` 是区间起点，两个通道必须同时给 |
| G2Plot v2 的 `new Waterfall('container', { xField, yField })` | `new Chart({ container })` + `chart.options(spec)` |
| `import { Waterfall } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| 用 `stackY` 隐藏辅助系列做「假瀑布」 | 可行但需额外隐藏图例；优先用 `y` / `y1` 区间通道，数据更直观 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/waterfall/basic.ts) | 利润从期初到期末的增减拆解，最简起步 | `encode: { y: 'base', y1: 'end', color: 'direction' }` |
| [with-label.ts](../examples/waterfall/with-label.ts) | 复盘会直接读每一项变动金额 | `labels` 正负号回调、`tooltip.items` 的 `field: 'change'` |
| [horizontal.ts](../examples/waterfall/horizontal.ts) | 成本构成拆解，类别名长 | `coordinate.transform: transpose`、`labels.position: 'outside'` |
| [custom-style.ts](../examples/waterfall/custom-style.ts) | 汇报大屏的品牌配色与留白 | `scale.color.range`、`style.radius`、`scale.x.padding`、`title` |
