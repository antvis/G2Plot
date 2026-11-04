# Mini Area 迷你面积图

> 组件用途：在表格单元格、KPI 卡片等狭小空间内，用不带坐标轴的小面积图表达单系列趋势走向与量级。

## 何时使用

- 表格行内趋势列：客户、商品、指标每行配一条近 7~30 天的走势缩略图
- KPI 卡片副图：大数字旁边放一条趋势图，强调上涨/下跌方向
- 一屏并排多个同类趋势：6 个渠道、8 家门店的迷你趋势矩阵
- 无需精确读数，只关心形状、拐点与相对高低

## 何时不用

- 需要读出具体数值、对比刻度 → 用 area 面积图（保留坐标轴）
- 精确趋势对比、需要图例区分系列 → 用 line 折线图
- 多系列对比 → 迷你图放不下图例，多色无法辨识，改用 line（`color` 分组）
- 离散类别数值对比 → 用 column 柱状图
- 数据点少于 5 个 → 面积形状没有信息量，直接展示数字与变化率

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串或有序类别；迷你图不显示刻度，但顺序仍需正确
- `y` 字段：数值（number）；字符串数字先 `Number()` 转换
- 单系列，**不要**用 `color` 分组：迷你图没有图例，多色无法辨识
- 建议 7~30 个点：少于 5 个点形状无意义，多于 60 个点在几十像素高度内不可辨识，先按周/月聚合

## 基础实现（G2 v5）

迷你面积图 = 标准 `area` mark + 关闭坐标轴与图例 + 容器给小高度。

```ts
import { Chart } from '@antv/g2';

const data = [
  { date: '09-28', orders: 320 },
  { date: '09-29', orders: 286 },
  { date: '09-30', orders: 412 },
  { date: '10-01', orders: 508 },
  { date: '10-02', orders: 465 },
  { date: '10-03', orders: 530 },
  { date: '10-04', orders: 488 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'date', y: 'orders' },
  // 迷你图不显示坐标轴与图例，把空间全部留给趋势形状
  axis: false,
  legend: false,
  style: { fill: '#5B8FF9', fillOpacity: 0.3 },
});

chart.render();
```

容器高度决定图表高度（`autoFit` 只负责跟随容器），表格/卡片中给容器约 40~80px：

```css
.mini-area {
  height: 56px;
}
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 渐变填充 + 平滑曲线 | `style.fill` 写渐变字符串 + `encode.shape: 'smooth'` | [gradient.ts](../examples/mini-area/gradient.ts) |
| 面积 + 顶部折线 + 末点标记 | `type: 'view'`，children 叠加 area / line / point | [area-line-marker.ts](../examples/mini-area/area-line-marker.ts) |

末点标记核心差异（point 子 mark 用单元素数据，只画最新一点）：

```ts-snippet
const latest = data[data.length - 1];

chart.options({
  type: 'view',
  data,
  axis: { x: false, y: false },
  children: [
    { type: 'area', encode: { x: 'date', y: 'activeUsers' } },
    { type: 'line', encode: { x: 'date', y: 'activeUsers' } },
    { type: 'point', data: [latest], encode: { x: 'date', y: 'activeUsers' } },
  ],
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 填充色与透明度 | `style: { fill: '#5B8FF9', fillOpacity: 0.3 }` | 单色轻填充，透明度 0.2~0.4 |
| 渐变填充 | `style: { fill: 'linear-gradient(180deg, #FF6B35 0%, rgba(255,107,53,0.08) 100%)' }` | 垂直渐变用 `180deg`，见 [gradient.ts](../examples/mini-area/gradient.ts) |
| 平滑曲线 | `encode: { shape: 'smooth' }` | 弱化单点波动，卡片缩略图常用 |
| 顶部边线 | `type: 'view'` 叠加 area + line | area 直接 `stroke` 会包裹整个区域 |
| 关闭坐标轴 | `axis: false` 或 `axis: { x: false, y: false }` | 迷你图必配 |
| 关闭图例 | `legend: false` | 单系列无需图例 |
| 关闭 tooltip | `tooltip: false` | 纯装饰场景 |
| 末点标记 | point 子 mark + 单元素 `data` | 突出最新值，见 [area-line-marker.ts](../examples/mini-area/area-line-marker.ts) |
| 容器尺寸 | CSS 给容器 40~80px 高度 + `autoFit: true` | 不要写死 `width` / `height` |

坐标轴标题、图例、主题等通用定制见 [area.md](./area.md) 与 [line.md 样式自定义](./line.md#样式自定义)。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `new MiniArea('container', { xField, yField })`（G2Plot v2） | `new Chart({ container })` + `type: 'area'` |
| `import { MiniArea } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| 保留默认坐标轴与图例，文字挤满 60px 高度 | `axis: false` + `legend: false` |
| 在 area 上写 `style: { stroke, lineWidth }` 想只画顶部边线 | 描边会包裹整个区域；用 `type: 'view'` 叠加 area + line |
| 固定 `width` / `height`，或手动设置 spec `padding` | `autoFit: true` + 容器 CSS 尺寸，保持默认 padding |
| `encode: { color: 'series' }` 做多系列迷你图 | 迷你图只做单系列；多系列对比用 line（`color` 分组） |
| 渐变写 `linear-gradient(90deg, ...)` | 垂直从上到下用 `180deg` |
| 60+ 个点直接塞进迷你图 | 先按周/月聚合到 7~30 个点 |
| `smooth: true`（v2 配置） | `encode: { shape: 'smooth' }` |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/mini-area/basic.ts) | 表格行内 / KPI 卡片趋势缩略图，最简起步 | `type: 'area'`、`axis: false`、`legend: false`、`style.fillOpacity` |
| [gradient.ts](../examples/mini-area/gradient.ts) | 品牌色渐变卡片缩略图 | `style.fill` 渐变、`encode.shape: 'smooth'`、`tooltip.items.valueFormatter` |
| [area-line-marker.ts](../examples/mini-area/area-line-marker.ts) | 强调最新值的趋势缩略图 | `type: 'view'` + area/line/point children，point 单元素 `data` |
