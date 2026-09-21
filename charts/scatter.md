# Scatter 散点图

> 组件用途：展示两个数值变量的相关性与分布；扩展为气泡图可表达第三维。

## 何时使用

- 双变量相关性：广告花费 vs 销售额、身高 vs 体重、温度 vs 能耗
- 分组分布对比：不同性别/品类在双变量空间中的分布差异
- 三维数据：气泡图（x、y + 气泡大小表示第三维，如人口、GMV）

## 何时不用

- 单变量分布 → 用 histogram 直方图（本库暂未收录）
- 类别对比 → 用 column 柱状图
- 时间趋势 → 用 line 折线图
- 点极多且重叠严重 → 用 heatmap 密度热力图

## 数据要求

- 长表数据，每行一个观测点，见 [数据模式](../references/data-patterns.md)
- `x` / `y` 字段：均为数值（number）
- `color` 字段（分组时）：类别字符串
- `size` 字段（气泡图时）：数值，第三维度量

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { spend: 1200, sales: 3200 },
  { spend: 1800, sales: 4100 },
  { spend: 1500, sales: 3600 },
  { spend: 2200, sales: 5200 },
  { spend: 2600, sales: 5800 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'spend', y: 'sales' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分组散点 | `encode` 增加 `color: 'group'` | [grouped.ts](../examples/scatter/grouped.ts) |
| 气泡图 | `encode` 增加 `size` + `scale.size` 用 sqrt 比例尺 | [bubble.ts](../examples/scatter/bubble.ts) |
| 拟合趋势线 | `view` children 叠加 line，最小二乘法手动拟合两个端点 | [trend-line.ts](../examples/scatter/trend-line.ts) |
| 指数回归线 | line 的 `data.transform` 用 `{ type: 'custom', callback }` 生成曲线采样点 | [exponential-regression.ts](../examples/scatter/exponential-regression.ts) |

气泡图核心差异：

```ts-snippet
chart.options({
  type: 'point',
  data,
  encode: { x: 'income', y: 'life', size: 'population', color: 'country' },
  scale: { size: { type: 'sqrt', range: [6, 36] } }, // sqrt 让面积与数值成正比
  legend: { size: false }, // size 图例意义不大，建议隐藏
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 点透明度 | `style: { fillOpacity: 0.7 }` | 缓解点重叠 |
| 点大小（固定） | `encode: { size: 4 }` | 非气泡图时统一大小 |
| 点描边 | `style: { stroke: '#fff', lineWidth: 1 }` | 气泡图常用，分隔相邻气泡 |
| 调色板 | `scale: { color: { range: [...] } }` | 分组着色 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'scatter'` | G2 v5 用 `type: 'point'` |
| 气泡图 size 用线性比例尺 | `scale: { size: { type: 'sqrt' } }`，让面积（而非半径）与数值成正比 |
| `new Scatter('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'point'` |
| `pointStyle: {...}` / `size: 4`（v2 顶层配置） | `style: {...}` / `encode: { size: 4 }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/scatter/basic.ts) | 双变量相关性，最简起步 | `type: 'point'`、`encode: { x, y }` |
| [grouped.ts](../examples/scatter/grouped.ts) | 分组分布对比 | `encode.color` + `style.fillOpacity` |
| [bubble.ts](../examples/scatter/bubble.ts) | 三维数据（国家：收入/寿命/人口） | `encode.size` + `scale.size: { type: 'sqrt' }` |
| [trend-line.ts](../examples/scatter/trend-line.ts) | 线性相关 + 回归趋势线 | `view` children + 最小二乘法拟合端点 |
| [exponential-regression.ts](../examples/scatter/exponential-regression.ts) | 指数增长 + 回归曲线 | `data.transform` 的 `custom` callback 生成采样点 |
