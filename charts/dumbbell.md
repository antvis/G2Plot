# Dumbbell 哑铃图

> 组件用途：用同一类别上的两个端点及连接线，对比两个时点或状态的数值与差距。

## 何时使用

- 两期对比：各部门今年与去年满意度、各门店改版前后完成时长
- 实际与目标对比：各大区实际销售额与目标销售额之间的差距
- 既关注两个端点的具体数值，也关注差值的方向和幅度
- 类别名称较长时，用横向布局便于阅读

## 何时不用

- 三个及以上连续时点的趋势 → 用 line 折线图
- 单个数值的类别对比 → 用 column 柱状图或 bar 条形图
- 同一类别有三个及以上并列系列 → 用分组柱状图
- 最小值/最大值区间、置信区间 → 用区间图，不要把区间误当作两个时点
- 占比或构成 → 用 pie 饼图

## 数据要求

- `link` 使用宽表：**每行一个类别**，包含两个端点字段，见 [数据模式](../references/data-patterns.md)
- `category` 字段：类别字符串，如部门、门店、产品；横向哑铃图映射到 `y`
- `start` / `end` 字段：两个端点的数值（number），使用相同单位；字符串数字先 `Number()` 转换
- 不要用绝对值替换原始端点，也不要强制按大小交换两端，否则会丢失增减方向
- 若端点要使用统一 `color` 图例，可额外转换为每行一个端点的长表供 `point` 使用；`link` 仍消费宽表

## 基础实现（G2 v5）

G2 没有独立的 `dumbbell` mark。哑铃图由 `type: 'view'` 组合一个 `link` 和两个 `point`：`link` 的 `x`、`y` 都接收 `[起点字段, 终点字段]`，同一类别的 `y` 字段需重复两次。

```ts
/**
 * 基础哑铃图
 * 场景：部门两年度员工满意度对比，最简起步
 * 要点：link 连接每条记录的两个端点，两个 point 分别映射历史值和当前值
 */
import { Chart } from '@antv/g2';

const data = [
  { department: '研发', previousScore: 72, currentScore: 85 },
  { department: '产品', previousScore: 78, currentScore: 83 },
  { department: '设计', previousScore: 81, currentScore: 79 },
  { department: '市场', previousScore: 68, currentScore: 76 },
  { department: '销售', previousScore: 74, currentScore: 70 },
  { department: '客服', previousScore: 82, currentScore: 88 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  scale: {
    y: { type: 'point', padding: 0.5 },
  },
  axis: {
    x: { title: '员工满意度（分）' },
    y: { title: '部门' },
  },
  children: [
    {
      type: 'link',
      encode: {
        x: ['previousScore', 'currentScore'],
        y: ['department', 'department'],
      },
      style: { stroke: '#D9D9D9', lineWidth: 3 },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'previousScore', y: 'department' },
      style: { r: 6, fill: '#8CA8C8', stroke: '#FFFFFF', lineWidth: 1 },
    },
    {
      type: 'point',
      encode: { x: 'currentScore', y: 'department' },
      style: { r: 6, fill: '#2F6BFF', stroke: '#FFFFFF', lineWidth: 1 },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 端点图例 + 差值标签 | `point` 改用长表并映射 `encode.color`；派生中点和差值字段，叠加 `text` | [comparison.ts](../examples/dumbbell/comparison.ts) |
| 按差距排序 | 渲染前计算差值并排序，用 `scale.y.domain` 固定类别顺序 | [comparison.ts](../examples/dumbbell/comparison.ts) |

长表只负责端点着色，连接线仍从父级宽表读取两个端点：

```ts-snippet
const endpointData = chartData.flatMap((d) => [
  { department: d.department, period: '2025 年', score: d.previousScore },
  { department: d.department, period: '2026 年', score: d.currentScore },
]);

const pointMark = {
  type: 'point',
  data: endpointData,
  encode: { x: 'score', y: 'department', color: 'period' },
};
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 连线颜色与粗细 | `link.style: { stroke: '#D9D9D9', lineWidth: 3 }` | 连接线用 `stroke`，不是 `fill` |
| 虚线连接 | `link.style: { lineDash: [6, 4] }` | 数组为实线/间隔长度 |
| 端点大小与颜色 | `point.style: { r: 6, fill: '#2F6BFF' }` | 两个独立 `point` 可分别固定颜色 |
| 统一端点图例 | `point.encode.color: 'period'` + `scale.color.range` | 需要长表；在父级 `view` 配置图例位置 |
| 类别间距 | `scale: { y: { type: 'point', padding: 0.5 } }` | `point` 比例尺让连线与端点共享同一类别位置 |
| 固定数值范围 | `scale: { x: { domain: [0, 100] } }` | 满意度、完成率等需要跨图比较时固定值域 |
| 差值标签 | `type: 'text'` + `encode: { x: 'midpointScore', y: 'department', text: 'changeLabel' }` | 用 `style.dy` 将文字移离连接线 |
| 坐标轴标题 | `axis: { x: { title: '员工满意度（分）' } }` | 在父级 `view` 统一配置 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'dumbbell'` 或 `new Dumbbell()` | 用 `type: 'view'`，在 `children` 中组合 `link` 与 `point` |
| `import { Dumbbell } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `link.encode: { x: 'previousScore', x1: 'currentScore' }` | `link.encode.x: ['previousScore', 'currentScore']`；`link` 不使用 `x1` |
| `link.encode.y: 'department'` | `link.encode.y: ['department', 'department']`，起点和终点各绑定一次 |
| 用 `line` 连接每条宽表记录的两个字段 | 每条记录一条独立线段用 `link`；`line` 适合连续趋势 |
| 把每行一个端点的长表直接交给 `link` | `link` 使用每行含两个数值字段的宽表；长表可单独交给 `point` |
| 用 `style.color` 设置连线或端点颜色 | 连线用 `style.stroke`，实心端点用 `style.fill` |
| 两个固定 `fill` 的 `point` 却期待自动出现统一图例 | 改为单个 `point` + 长表 + `encode.color: 'period'` |
| 多次调用 `chart.options()` 分别添加连线和点 | 只调用一次，将所有 mark 放进同一个 `view.children` |
| `xField` / `yField` / `seriesField`（G2Plot v2） | 使用 `encode: { x, y, color }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/dumbbell/basic.ts) | 部门两年度员工满意度对比，最简起步 | `link` + 双 `point`，`encode.x/y` 绑定两个端点 |
| [comparison.ts](../examples/dumbbell/comparison.ts) | 按满意度变化排序，显示端点图例与差值 | 长表 `point` + `encode.color`、`text`、`scale.y.domain` |
