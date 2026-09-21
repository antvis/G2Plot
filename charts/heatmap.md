# Heatmap 热力图

> 组件用途：用颜色深浅展示两个类别维度交叉处的数值密度。

## 何时使用

- 双类别交叉密度：星期 × 时段的访问量、地区 × 月份的达标率
- 相关性矩阵：多指标两两相关系数（-1 ~ 1，用发散色阶）
- 数据是规则矩阵（每行 = 一个 x/y 类别组合 + 数值）

## 何时不用

- 连续二维空间的点密度（经纬度、散点云）→ 用 `type: 'heatmap'` 渐变热力（本组件聚焦矩阵型 `cell`）。注意：`heatmap` mark **必须配 `encode.color`**（强度值，0~1 或配 `scale.color.domain`），缺 `color` 通道会白屏；`encode.size` 控制热晕半径。自定义颜色数组用 `scale: { color: { range: ['#d0e8ff', '#0050b3'] } }`（`palette` 只接受调色板名字符串，传数组会报错/白屏）
- 单类别对比 → 用 column 柱状图
- 时间趋势 → 用 line 折线图

## 数据要求

- 长表数据，每行一个格子，见 [数据模式](../references/data-patterns.md)
- `x` / `y` 字段：类别字符串（两个维度）
- `color` 字段：数值（number），映射颜色深浅

## 基础实现（G2 v5）

矩阵热力图 = `type: 'cell'` + `encode.color` 映射数值 + `scale.color` 用顺序色阶。

```ts
import { Chart } from '@antv/g2';

const data = [
  { week: 'Mon', hour: '上午', pv: 10 },
  { week: 'Mon', hour: '中午', pv: 80 },
  { week: 'Mon', hour: '晚上', pv: 60 },
  { week: 'Tue', hour: '上午', pv: 15 },
  { week: 'Tue', hour: '中午', pv: 95 },
  { week: 'Tue', hour: '晚上', pv: 70 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  encode: { x: 'week', y: 'hour', color: 'pv' },
  scale: { color: { type: 'sequential', palette: 'YlOrRd' } },
  style: { inset: 1 },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 带数值标签 | `labels` text 回调自定义内容（默认居中），深色格子用白字 | [with-label.ts](../examples/heatmap/with-label.ts) |
| 相关性矩阵 | 发散色阶 `palette: 'RdBu'` + `domain: [-1, 1]` | [correlation.ts](../examples/heatmap/correlation.ts) |
| 渐变热力（点云密度） | `type: 'heatmap'` + `encode.color`（0~1）+ `encode.size`；颜色数组用 `range` | [gradient.ts](../examples/heatmap/gradient.ts) |

相关性矩阵核心差异（正负相关用发散色阶，0 居中）：

```ts-snippet
scale: {
  color: { type: 'sequential', palette: 'RdBu', domain: [-1, 1] },
},
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 色阶 | `scale: { color: { palette: 'YlOrRd' } }` | 顺序色阶：`Blues` / `Greens` / `YlOrRd`；发散：`RdBu` |
| 格子间距 | `style: { inset: 2 }` | px，0 为无缝 |
| 格子圆角 | `style: { radius: 2 }` | |
| 数值标签 | `labels: [{ text: (d) =>`${d.value}%`}]` | cell 标签默认居中；text 回调自定义内容，深格子用 `fill` 回调切白字 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 矩阵热力用 `type: 'heatmap'` | 矩阵格子用 `type: 'cell'`；`heatmap` 是高斯渐变密度图 |
| color 用分类色 | 数值密度用 `scale.color.type: 'sequential'` 顺序色阶 |
| 相关性矩阵不固定 domain | 发散场景显式 `domain: [-1, 1]`，保证 0 居中 |
| `type: 'heatmap'` 不配 `encode.color` | 渐变热力必须配 `color` 通道（强度值 0~1 或配 `scale.color.domain`），缺 `color` 会白屏 |
| `scale: { color: { palette: [...数组] } }` | `palette` 只接受调色板名字符串（如 `'YlOrRd'`）；自定义颜色数组用 `range: [...]`，数组传给 `palette` 会 TS 报错且白屏 |
| `new Heatmap('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'cell'` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/heatmap/basic.ts) | 星期 × 时段访问密度，最简起步 | `type: 'cell'` + `palette: 'YlOrRd'` |
| [with-label.ts](../examples/heatmap/with-label.ts) | 色阶 + 精确读数 | `labels` text 回调 + 深浅文字适配 |
| [correlation.ts](../examples/heatmap/correlation.ts) | 指标相关性矩阵 | `palette: 'RdBu'` + `domain: [-1, 1]` |
| [gradient.ts](../examples/heatmap/gradient.ts) | 经纬度点云密度（渐变热力） | `type: 'heatmap'` + `encode.color/size` + `scale.color.range` |
