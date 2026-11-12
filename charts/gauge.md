# Gauge 仪表盘

> 组件用途：用一条弧（或整圈环）展示**单个指标**相对目标的完成度，如达成率、健康度、评分。

## 何时使用

- 单指标完成度：季度目标完成率、预算执行率、任务进度
- 健康度 / 评分：服务可用性、NPS、信用分，配合阈值分档快速判断好坏
- 报表头部 KPI 卡片：一屏只强调「一个数 + 目标」
- 数值天然有满分上限（0~100、0~5 分），弧长比例有实际含义

## 何时不用

- 多类别数值对比（各产品线、各地区）→ 用 [column](../charts/column.md) 柱状图
- 类别多、名称长或需要精确排序 → 用 [bar](../charts/bar.md) 条形图，弧长比长度更难比较
- 随时间变化的趋势 → 用 [line](../charts/line.md) 折线图
- 占比构成（几块加起来 100%）→ 用 [pie](../charts/pie.md) 饼图
- 需要同时看 5 个以上指标 → 用指标卡 / 条形图；多个仪表盘并排最多 3 个左右
- 指标没有上限（销售额、访问量）→ 仪表盘需要一个「满分」，强行设定会误导，改用带目标的柱状图

## 数据要求

- gauge 是**单指标图**，不吃长表：数据是**一个对象**，且必须嵌套在 `value` 下
- `target`：当前值（number），**必填**
- `total`：满分 / 目标值（number），**必填**，与 `target` 同量纲
- `name`：指标名（string），可选，用于中心文字或 tooltip 语义
- `thresholds`：分档阈值数组（number[]，递增、最后一段等于 `total`），可选
- 百分比场景：`target` 用 0~100 的数值时 `total` 写 `100`；只有 `total: 1` 时 `target` 才用 0~1 小数

```ts-snippet
data: {
  value: {
    target: 72,        // 当前值
    total: 100,        // 满分/目标
    name: '完成率',
    thresholds: [60, 80, 100], // 可选，三档
  },
}
```

## 基础实现（G2 v5）

`type: 'gauge'` 是 G2 内置的组合 mark：内部自动生成「弧 + 指针 + 中心文字」三个 mark。它默认仍会渲染径向刻度与色块图例，信息冗余，常规做法是 `axis: false` + `legend: false` 一起关掉。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础仪表盘（单指标）
 * 场景：展示单个 KPI 的完成度，如季度目标完成率
 * 要点：type: 'gauge'；data 必须包一层 { value: { target, total, name } }；
 *       target 是当前值、total 是满分/目标值；默认带指针、轴心与中心文字
 */
const data = {
  metric: '季度销售目标完成率',
  completionRate: 72,
  target: 100,
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      name: data.metric,
      target: data.completionRate,
      total: data.target,
    },
  },
  style: {
    // 中心文字：默认只显示 target 数值，这里改成百分比
    textContent: (target: number, total: number) =>
      `${((target / total) * 100).toFixed(0)}%`,
    textFontSize: 28,
  },
  // 仪表盘只表达一个数，关掉 y 轴刻度与图例
  axis: false,
  legend: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 阈值分档配色 | `thresholds` + `scale.color.range`（色数 = 段数） | [custom-style.ts](../examples/gauge/custom-style.ts) |
| 渐变配色 | 已完成部分的颜色使用 CSS `linear-gradient` | [gradient.ts](../examples/gauge/gradient.ts) |
| 米轨式分段 | 等距 `thresholds` + `arcInset` 控制段数与间隙 | [segmented.ts](../examples/gauge/segmented.ts) |
| 环形进度 | 起止角差 2π（`-π/2 → 3π/2`）+ 隐藏指针轴心 | [progress-ring.ts](../examples/gauge/progress-ring.ts) |
| 多指标并排 | `type: 'spaceFlex'`，中心文字通过闭包显示各指标名 | [multi-indicator.ts](../examples/gauge/multi-indicator.ts) |
| 自定义指示器与 tooltip | `pointerShape` 返回 G 图形 + `interaction.tooltip.render` | [custom-indicator.ts](../examples/gauge/custom-indicator.ts) |

阈值分档核心差异（整条弧按区间染色，指针定位当前值）：

```ts-snippet
data: { value: { target: 96.2, total: 100, thresholds: [90, 95, 100] } },
scale: { color: { range: ['#F4664A', '#FAAD14', '#30BF78'] } },
```

渐变配色核心差异（第一个颜色对应已完成部分，第二个对应剩余部分）：

```ts-snippet
scale: {
  color: {
    range: [
      'linear-gradient(90deg, #5B8FF9 0%, #9254DE 100%)',
      '#EEF1F6',
    ],
  },
},
```

米轨式核心差异（10 个等距阈值对应 10 色；`arcInset` 的单位为角度）：

```ts-snippet
data: {
  value: {
    target: 72,
    total: 100,
    thresholds: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
},
style: { arcInset: 1.5 },
```

环形进度核心差异（画满整圈，隐藏指针与轴心）：

```ts-snippet
coordinate: {
  type: 'radial',
  innerRadius: 0.8,
  outerRadius: 1,
  startAngle: -Math.PI / 2,
  endAngle: (Math.PI * 3) / 2,
},
style: { pointerShape: false, pinShape: false },
```

多指标并排核心差异（一个 gauge 只能画一个指标；不要只显示百分比，必须用闭包补上 `item.metric`）：

```ts-snippet
chart.options({
  type: 'spaceFlex',
  children: data.map((item) => ({
    type: 'gauge',
    data: {
      value: { target: item.completionRate, total: item.target, name: item.metric },
    },
    style: {
      textContent: (target, total) =>
        `${((target / total) * 100).toFixed(0)}%\n${item.metric}`,
    },
  })),
});
```

自定义指示器与 tooltip 核心差异（完整几何计算见案例）：

```ts-snippet
style: { pointerShape: diamondPointer }, // 回调返回 new Path(...)

tooltip: {
  title: () => data.metric,
  items: [() => ({ name: '当前完成率', value: `${data.completionRate}%` })],
},
interaction: {
  tooltip: {
    render: (event, { title, items }) => `<div>${title}: ${items[0].value}</div>`,
  },
},
```

## 样式自定义

以下写法均经 `@antv/g2` ^5 类型校验，完整示例见 [custom-style.ts](../examples/gauge/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 弧厚 | `coordinate: { type: 'radial', innerRadius: 0.72, outerRadius: 0.92 }` | 内外半径（0~1，相对绘图区），控制环粗细 |
| 起止角度 | `coordinate.startAngle` / `endAngle` | 默认 `-11/10π → 1/10π`；整圈用 `-π/2 → 3π/2` |
| 弧配色 | `scale: { color: { range: ['#30BF78', '#D0D0D0'] } }` | 无 `thresholds`：两色 = 已完成 / 剩余；有 `thresholds`：N 色 = N 段 |
| 分段描边 | `style: { arcStroke: '#fff', arcLineWidth: 2 }` | 让分档边界更清晰 |
| 指针 | `style: { pointerStroke: '#1d1d1d', pointerLineWidth: 3 }` | `pointerShape: false` 隐藏指针 |
| 轴心 | `style: { pinR: 8, pinFill: '#1d1d1d' }` | `pinShape: false` 隐藏轴心（环形进度用） |
| 中心文字内容 | `style: { textContent: (target, total) => string }` | 签名固定两个参数，需要额外字段用闭包 |
| 中心文字样式 | `style: { textFontSize: 28, textFill: '#1d1d1d', textX: '50%', textY: '74%' }` | 支持 `\n` 换行 |
| 关闭刻度与图例 | `axis: false`、`legend: false` | gauge 默认仍会渲染径向刻度与色块图例，建议显式关闭；需要刻度时用 `axis: { y: { tickCount: 5 } }` 保留少量 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `data: { target: 72, total: 100 }`（平铺对象） | `data: { value: { target: 72, total: 100 } }`；运行时只把 `data.value` 交给 gauge，平铺对象会取到 `undefined` |
| `data: [{ metric: '完成率', value: 72 }]`（长表） | gauge 是单指标图，数据是对象不是数组；多指标用 `spaceFlex` 组合多个 gauge |
| `data: 0.72`（直接传百分比数值） | 数值同样会被当作 `data.value` 读取而取不到，必须写 `data: { value: { target: 0.72, total: 1 } }` |
| `style: { textContent: (target, total, datum) => ... }` | 只有两个参数，第三个始终 `undefined`；额外字段用闭包捕获 |
| `thresholds: [90, 95, 100]` 只给 2 个颜色 | 颜色数量必须等于 `thresholds.length`（3 段 3 色） |
| 有 `thresholds` 时仍期待「已完成/剩余」两段 | 分档模式整条弧按区间着色，当前值由指针表达，不再是进度两段 |
| `target: 0.72, total: 100`（量纲不一致） | `target` 与 `total` 同量纲：0~100 配 `total: 100`，0~1 配 `total: 1` |
| 用 `type: 'ring'` / `type: 'progress'` 做环形进度 | 无这两个类型；`type: 'gauge'` + 整圈 radial 坐标 |
| `type: 'liquid'` 当环形进度用 | `liquid` 是水波球（0~1 液位），不是环形进度 |
| `style: { pointer: false }` 隐藏指针 | `style: { pointerShape: false }`；轴心用 `pinShape: false` |
| 只写 `legend: false` 却仍看到色块图例 | gauge 组合出的 mark 已设 `legend: false`，但顶层 view 仍会画图例与径向刻度；在 `chart.options` 顶层加 `axis: false` + `legend: false` |
| `new Gauge('container', { percent })`（G2Plot v2） | `new Chart({ container })` + `chart.options({ type: 'gauge', data: { value } })` |
| 手动写死 `width` / `height` | `new Chart({ container, autoFit: true })`，gauge 会自适应容器 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/gauge/basic.ts) | 单指标完成度，最简起步 | `type: 'gauge'` + `data.value` + `textContent` |
| [custom-style.ts](../examples/gauge/custom-style.ts) | 分档预警 + 弧/指针/文字定制 | `thresholds` + `scale.color.range` + `coordinate.innerRadius/outerRadius` + `pointerXxx` / `pinXxx` / `textXxx` |
| [gradient.ts](../examples/gauge/gradient.ts) | 已完成弧使用蓝紫渐变 | `scale.color.range` + CSS `linear-gradient` |
| [segmented.ts](../examples/gauge/segmented.ts) | 10 段米轨式负载仪表盘 | 等距 `thresholds` + 10 色 `scale.color.range` + `arcInset` |
| [progress-ring.ts](../examples/gauge/progress-ring.ts) | 环形进度，隐藏指针 | 整圈 radial 坐标（`-π/2 → 3π/2`）+ `pointerShape: false` / `pinShape: false` |
| [multi-indicator.ts](../examples/gauge/multi-indicator.ts) | CPU、内存、磁盘并排且显示各自名称 | `type: 'spaceFlex'` + `textContent` 闭包拼接 `item.metric` |
| [custom-indicator.ts](../examples/gauge/custom-indicator.ts) | 菱形指针与深色自定义 tooltip | `pointerShape` 返回 `Path` + `tooltip.items` + `interaction.tooltip.render` |
