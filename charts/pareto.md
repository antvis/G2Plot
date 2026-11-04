# Pareto 帕累托图

> 组件用途：用降序柱形展示各类别的数值，用累计占比折线识别贡献最大的“关键少数”。

## 何时使用

- 80/20 分析：定位造成大部分缺陷、投诉或成本的主要类别
- 优先级排序：同时查看单类别数量与其累计贡献，决定先处理哪些事项
- 类别可明确排序，且数值可求和并解释为总量的一部分

## 何时不用

- 只比较类别数值、不关心累计贡献 → 用 column 柱状图；类别名称过长时用 bar 条形图
- 展示时间趋势 → 用 line 折线图，时间顺序不应按数值降序重排
- 只展示静态占比构成 → 用 pie 饼图
- 对比两个无累计关系的指标 → 用 dual-axes 双轴图，不要套用 Pareto

## 数据要求

- 每行一个类别的汇总值；原始明细需先按类别聚合，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串，如问题类型、投诉原因、成本项目
- `value` 字段：非负数值（number），字符串数字先 `Number()` 转换；总量为 0 时不应计算累计占比
- 绘制前按 `value` **降序**排序，再依次计算 `cumulativePercentage = 累计值 / 总值`
- `cumulativePercentage` 使用 0~1 小数，最后一个类别应为 1；不要传入已经格式化的百分比字符串

## 基础实现（G2 v5）

Pareto = `type: 'view'` + 降序 `interval` + 累计占比 `line`；折线用 `scale.y.independent` 启用独立右轴。排序和累计计算必须在绘制前完成。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础帕累托图
 * 场景：按质量问题的发生次数降序排列，识别累计贡献最高的关键少数问题
 * 要点：先排序并计算累计占比；interval 展示次数，line 使用独立右轴展示累计占比
 */
const qualityIssues = [
  { issueType: '外观划痕', issueCount: 12 },
  { issueType: '包装破损', issueCount: 48 },
  { issueType: '其他', issueCount: 4 },
  { issueType: '标签错误', issueCount: 30 },
  { issueType: '功能异常', issueCount: 8 },
  { issueType: '零件缺失', issueCount: 18 },
];

const totalIssues = qualityIssues.reduce(
  (total, issue) => total + issue.issueCount,
  0,
);
let cumulativeIssues = 0;
const data = [...qualityIssues]
  .sort((firstIssue, secondIssue) => secondIssue.issueCount - firstIssue.issueCount)
  .map((issue) => {
    cumulativeIssues += issue.issueCount;
    return {
      ...issue,
      cumulativePercentage: cumulativeIssues / totalIssues,
    };
  });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'issueType', y: 'issueCount' },
      style: { fill: '#5B8FF9' },
      axis: { y: { title: '问题数量（次）' } },
    },
    {
      type: 'line',
      encode: { x: 'issueType', y: 'cumulativePercentage' },
      scale: { y: { independent: true, domain: [0, 1] } },
      style: { stroke: '#F4664A', lineWidth: 2 },
      axis: {
        y: {
          position: 'right',
          title: '累计占比',
          labelFormatter: (value: number) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 数量与累计占比标签 | 两个 child 分别配置 `labels`，累计占比格式化为百分比 | [with-labels.ts](../examples/pareto/with-labels.ts) |
| 80% 参考线 | 添加 `lineY`，数据为 `[0.8]`，与累计折线使用相同百分比轴范围 | [threshold.ts](../examples/pareto/threshold.ts) |

累计占比标签核心写法：

```ts-snippet
labels: [
  {
    text: (issue: { cumulativePercentage: number }) =>
      `${(issue.cumulativePercentage * 100).toFixed(1)}%`,
    position: 'top',
  },
],
```

80% 参考线核心写法。`lineY` 是独立 mark，显式使用与累计折线相同的 `[0, 1]` 范围，避免落到柱形的计数轴上：

```ts-snippet
{
  type: 'lineY',
  data: [0.8],
  scale: { y: { independent: true, domain: [0, 1] } },
  style: { stroke: '#FAAD14', strokeDasharray: '4 4' },
  axis: { y: false },
}
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 柱形颜色 | interval child 的 `style: { fill: '#5B8FF9' }` | 所有类别使用统一颜色，突出排序而非分类着色 |
| 累计线颜色与线宽 | line child 的 `style: { stroke: '#F4664A', lineWidth: 2 }` | 与柱形使用对比色 |
| 百分比轴范围 | line child 的 `scale: { y: { independent: true, domain: [0, 1] } }` | 固定为 0~100%，避免右轴自动截断 |
| 右轴位置与标题 | `axis: { y: { position: 'right', title: '累计占比' } }` | 明确左右轴单位 |
| 百分比刻度 | `axis.y.labelFormatter: (v) => (v * 100).toFixed(0) + '%'` | 数据保持 0~1，仅在展示层格式化 |
| 柱形数值标签 | interval child 的 `labels: [{ text: 'issueCount', position: 'outside' }]` | 直接显示各类别数量 |
| Tooltip 格式化 | 各 child 的 `tooltip.items` 配置 `name` 与 `valueFormatter` | 分别添加次数单位、百分比格式 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 使用 `type: 'pareto'`，期待自动排序和累计 | G2 v5 无内置 `pareto` mark；用 `view` 组合 `interval` 与 `line`，自行预处理数据 |
| 原始类别未按数值降序，直接累计 | 先按数值降序，再沿排序后的顺序累计 |
| 先计算累计占比，再用 `sortX` 改变柱形顺序 | 排序必须发生在累计计算之前；展示层排序不会重算累计值 |
| 折线直接使用各类别占比，而非累计占比 | 当前点值为“当前及之前所有类别之和 ÷ 总值”，最后一点为 100% |
| 忘记 `scale: { y: { independent: true } }` | 累计折线使用独立右轴，否则会与次数共用左轴而被压平 |
| 将 `80` 作为百分比轴上的 80% | 比率数据使用 0~1，80% 对应 `0.8`；也可用 0~100 数据，但全图必须统一 |
| 80% 参考线复用柱形计数轴 | `lineY` 使用与累计折线一致的独立百分比轴及 `domain: [0, 1]` |
| `new Pareto('container', { xField, yField })` | `import { Chart } from '@antv/g2'`，通过 `chart.options()` 配置组合视图 |
| 空数据或总量为 0 仍执行除法 | 渲染前检查总量；总量为 0 时展示空状态，不生成 `NaN` 累计占比 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/pareto/basic.ts) | 质量问题降序与累计贡献分析 | 数据预处理、`view` children、`scale.y.independent` |
| [with-labels.ts](../examples/pareto/with-labels.ts) | 报告直接读取问题数量与累计百分比 | 双 child `labels`、`tooltip.items.valueFormatter` |
| [threshold.ts](../examples/pareto/threshold.ts) | 80/20 分析，识别关键少数 | `lineY` + `[0.8]`、百分比轴 `domain: [0, 1]` |
