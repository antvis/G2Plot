# Liquid 水波图

> 组件用途：用波浪液位和中心数值展示单个指标的完成率、进度或资源使用率。

## 何时使用

- 单个 KPI 的完成进度：季度目标完成率、任务完成率、活动达成率
- 有明确上限的资源使用情况：存储、容量、配额使用率
- 更重视进度状态和视觉提示，而不是多个数值之间的精确比较

## 何时不用

- 指标随时间变化 → 用 line 折线图，水波图不表达时间顺序
- 多个类别占总体的构成 → 用 pie 饼图；多个独立比率的精确比较 → 用 bar 或 column
- 没有合理分母的原始数值，或可能超过 100% 的数值 → 先核对指标定义，不要强行画成水波图
- 需要同时展示大量指标 → 用表格或柱状图，避免堆叠大量水波图造成比较困难

## 数据要求

- `data` 使用**单个数值**，不是长表数组，也不需要 `encode`
- 数值范围为 **0～1**：72% 应传 `0.72`，不能传 `72` 或 `'72%'`
- 百分比数据先除以 100，例如 `const rate = percent / 100`
- `0` 和 `1` 是有效边界，分别表示 0% 和 100%
- 传入前检查空值、`NaN` 和无穷值；越界值应按业务规则拒绝或显式裁剪，不要依赖绘图库兜底
- 一个水波图表达一个比例；多类别数据不要直接传入数组

## 基础实现（G2 v5）

```ts
/**
 * 基础水波图
 * 场景：展示单个 KPI 的完成率，如季度目标完成进度
 * 要点：type: 'liquid' + 单个 0～1 数值；outline* 控制外框，waveLength 控制波长
 */
import { Chart } from '@antv/g2';

const completionRate = 0.72;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: completionRate,
  style: {
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 圆形水波图 | 默认 `shape: 'circle'`，展示单个完成率 | [basic.ts](../examples/liquid/basic.ts) |
| 矩形水波图 | `style.shape: 'rect'`，适合容器或容量类指标 | [custom-style.ts](../examples/liquid/custom-style.ts) |
| 品牌配色与背景 | `style.fill` / `fillOpacity` / `backgroundFill` | [custom-style.ts](../examples/liquid/custom-style.ts) |
| 自定义中心文字 | `style.textText` 配合 `textFontSize` / `textFill` | [custom-style.ts](../examples/liquid/custom-style.ts) |

`style.shape` 支持 `'circle'`、`'rect'`、`'diamond'`、`'triangle'` 和 `'pin'`。更改外形只改变轮廓，数据仍是一个 0～1 的比例。

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 水波颜色 | `style: { fill: '#5AD8A6', fillOpacity: 0.85 }` | `fillOpacity` 控制水波透明度 |
| 背景颜色 | `style: { backgroundFill: '#E8F5E9' }` | 使用 `background` 前缀，不额外绘制 DOM 圆形 |
| 外框 | `style: { outlineBorder: 4, outlineDistance: 8 }` | 分别控制边框宽度和边框间距 |
| 波浪 | `style: { waveLength: 96, waveCount: 2 }` | 分别控制波长和波数 |
| 轮廓 | `style: { shape: 'rect' }` | 默认是 `'circle'` |
| 中心文字内容 | `style: { textText: '68.0%' }` | 根据原始比例生成字符串，覆盖默认文字 |
| 中心文字样式 | `style: { textFontSize: 28, textFontWeight: 'bold', textFill: '#237804' }` | 文字配置使用 `text` 前缀 |
| 关闭多余组件 | `axis: false, legend: false, tooltip: false` | 单值进度图通常不需要这些组件 |

中心文字使用扁平的 `text*` 键。`textText` 是文字内容，不是接收原始比例的格式化函数；需要保留小数时，用同一个比例值预先拼接字符串，确保数值和液位一致。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `data: 72` 表示 72% | 传 `data: 0.72`；0～100 的百分比先除以 100 |
| `data: [{ status: '完成', value: 0.72 }]` 并配置 `encode` | liquid 使用单个数值，不传长表数组，也不需要 `encode` |
| 用水波图展示 12 个月完成率趋势 | 改用 line；水波图只展示当前单个比例 |
| 用多个水波图精确比较多个类别 | 改用 bar 或 column；类别构成用 pie |
| `style: { text: { style: { fontSize: 28 } } }` | 使用 `style.textFontSize`、`style.textFill` 等扁平前缀键 |
| 在 `textText` 回调里把参数当成原始比例 | 从原始比例直接生成 `textText` 字符串，避免重复缩放或读错参数 |
| `new Liquid('container', { percent: 0.72 })`（G2Plot v2） | `new Chart({ container, autoFit: true })` + `chart.options({ type: 'liquid', data: 0.72 })` |
| 固定 `width` / `height` 或手动调整 `padding` | 使用 `autoFit: true`，让图表适应容器 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/liquid/basic.ts) | 单个 KPI 的季度目标完成进度 | `type: 'liquid'`、单个 0～1 数值、`outline*`、`waveLength` |
| [custom-style.ts](../examples/liquid/custom-style.ts) | 存储资源使用率，匹配品牌配色与文字精度 | `shape: 'rect'`、`fill` / `backgroundFill` / `outline*` / `wave*`、`text*` |

自定义样式水波图完整代码：

```ts
/**
 * 自定义样式水波图
 * 场景：展示存储资源使用率，并匹配报表的品牌配色与文字精度
 * 要点：shape / fill / backgroundFill / outline* / wave* 定制外观；text* 定制中心文字
 */
import { Chart } from '@antv/g2';

const storageUsage = 0.68;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: storageUsage,
  style: {
    shape: 'rect',
    fill: '#5AD8A6',
    fillOpacity: 0.85,
    backgroundFill: '#E8F5E9',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 96,
    textText: `${(storageUsage * 100).toFixed(1)}%`,
    textFontSize: 28,
    textFontWeight: 'bold',
    textFill: '#237804',
  },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
```
