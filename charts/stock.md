# Stock K 线图

> 组件用途：用蜡烛实体 + 影线同时表达一个交易周期的开盘、最高、最低、收盘四个价格，观察多空力量对比与趋势。

## 何时使用

- 金融时序：股票、指数、加密货币、期货的日 / 周 / 分钟 K 线
- 每个时间点有四个价格（开高低收），单点信息量比折线更大
- 需要同时看涨跌方向（实体颜色）、实体幅度（开收差）与影线长度（最高最低）
- 看盘场景需要叠加均线、成交量或指标副图

## 何时不用

- 只关心收盘价走势 → 用 line 折线图，四价在趋势视图里是噪音
- 只有区间上下界、没有开收概念（如温度区间、置信区间）→ 用区间类图表
- 类别之间数值大小对比（如各板块当日涨跌幅排名）→ 用 bar / column
- 单个交易日内的分时价格曲线 → 用 line / area

## 数据要求

- 长表数据，每行一个交易周期（一天 / 一周 / 一分钟），见 [数据模式](../references/data-patterns.md)
- `date` 字段：交易日字符串（`'2026-09-01'`）或时间戳；**不要**预先格式化成展示文案（如 `'9月1日'`），格式交给坐标轴
- `open` / `close` / `high` / `low` 字段：数值（number），四个都不能缺
- 必须满足 `high >= Math.max(open, close)`、`low <= Math.min(open, close)`，否则影线会穿出实体
- `volume` 字段（可选）：数值，成交量副图使用
- 均线等指标在数据层算好（预处理或 `data.transform`），mark transform 不做窗口聚合
- 复权口径（前复权 / 后复权 / 不复权）在取数时统一，混用会导致均线与 K 线错位

## 基础实现（G2 v5）

G2 v5 **没有** `stock` / `candlestick` mark。K 线由同一个 view 里的两个 `link` mark 组合而成：影线连 `low → high`，实体连 `open → close`（用较粗线宽模拟蜡烛实体），颜色回调按涨跌取色。

```ts
import { Chart } from '@antv/g2';

type StockPoint = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
};

const data: StockPoint[] = [
  { date: '09-01', open: 24.2, close: 24.85, high: 25.1, low: 24.05, volume: 128000 },
  { date: '09-02', open: 24.9, close: 24.55, high: 25.2, low: 24.4, volume: 96000 },
  { date: '09-03', open: 24.5, close: 23.8, high: 24.6, low: 23.7, volume: 152000 },
  { date: '09-04', open: 23.85, close: 24.3, high: 24.45, low: 23.6, volume: 87000 },
  { date: '09-05', open: 24.35, close: 25.1, high: 25.35, low: 24.25, volume: 174000 },
  { date: '09-08', open: 25.2, close: 24.95, high: 25.4, low: 24.8, volume: 113000 },
  { date: '09-09', open: 24.9, close: 25.6, high: 25.75, low: 24.85, volume: 201000 },
  { date: '09-10', open: 25.7, close: 25.35, high: 25.9, low: 25.15, volume: 98000 },
  { date: '09-11', open: 25.3, close: 26.1, high: 26.3, low: 25.25, volume: 186000 },
  { date: '09-12', open: 26.15, close: 26.45, high: 26.8, low: 25.95, volume: 142000 },
];

// 收盘 ≥ 开盘为涨（红），否则为跌（绿）；美股习惯可交换两个色值
const RISE_COLOR = '#EF5350';
const FALL_COLOR = '#26A69A';
const trendColor = (d: StockPoint) => (d.close >= d.open ? RISE_COLOR : FALL_COLOR);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      // 影线：最低价到最高价，细线
      type: 'link',
      encode: { x: 'date', y: 'low', y1: 'high' },
      style: { stroke: trendColor, lineWidth: 1 },
      tooltip: false,
    },
    {
      // 实体：开盘价到收盘价，粗线
      type: 'link',
      encode: { x: 'date', y: 'open', y1: 'close' },
      style: { stroke: trendColor, lineWidth: 10 },
      axis: {
        x: { title: '交易日期' },
        y: { title: '价格（元）' },
      },
      tooltip: {
        title: 'date',
        items: [
          { field: 'open', name: '开盘', valueFormatter: (v: number) => `${v.toFixed(2)} 元` },
          { field: 'close', name: '收盘', valueFormatter: (v: number) => `${v.toFixed(2)} 元` },
          { field: 'high', name: '最高', valueFormatter: (v: number) => `${v.toFixed(2)} 元` },
          { field: 'low', name: '最低', valueFormatter: (v: number) => `${v.toFixed(2)} 元` },
        ],
      },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 均线叠加 | 数据层算 MA，同一 view 追加 `line` children | [ma-line.ts](../examples/stock/ma-line.ts) |
| 成交量副图 | `type: 'spaceFlex'` + `direction: 'col'` + `ratio: [3, 1]`，上下两个 view 各自独立 y 轴 | [volume.ts](../examples/stock/volume.ts) |
| 涨跌配色 | 改 `RISE_COLOR` / `FALL_COLOR` 两个常量（A 股红涨绿跌，美股相反） | [basic.ts](../examples/stock/basic.ts) |

均线核心差异（窗口不足的头部留 `null`，line 默认在 `null` 处断开）：

```ts-snippet
const movingAverage = (values: number[], window: number) =>
  values.map((_, i) => {
    if (i < window - 1) return null;
    const slice = values.slice(i - window + 1, i + 1);
    return slice.reduce((sum, v) => sum + v, 0) / window;
  });

const data = klineData.map((d, i) => ({ ...d, ma5: ma5[i], ma10: ma10[i] }));

// 同一 view 内追加：
{ type: 'line', encode: { x: 'date', y: 'ma5' }, style: { stroke: '#F6BD16', lineWidth: 1.5 } }
```

成交量副图核心差异（两块视图上下排布，x 轴只保留底部一份）：

```ts-snippet
chart.options({
  type: 'spaceFlex',
  data,
  direction: 'col',
  ratio: [3, 1],
  children: [
    { type: 'view', axis: { x: false }, children: [/* 影线 + 实体 */] },
    { type: 'view', children: [{ type: 'interval', encode: { x: 'date', y: 'volume' } }] },
  ],
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 涨跌配色 | `style: { stroke: (d) => (d.close >= d.open ? '#EF5350' : '#26A69A') }` | 回调逐根取色，实体与影线各写一次 |
| 实体宽度 | `style: { lineWidth: 10 }` | 像素值，不随容器缩放；数据点少时可加粗 |
| 影线宽度 | `style: { lineWidth: 1 }` | 保持细线，过粗会盖住实体 |
| 均线样式 | `style: { stroke: '#F6BD16', lineWidth: 1.5, lineDash: [4, 4] }` | 多根均线用不同色 + 虚实区分 |
| y 轴刻度格式 | `axis: { y: { labelFormatter: (v) => v.toFixed(2) } }` | 价格常见两位小数 |
| 坐标轴标题 | `axis: { x: { title: '交易日期' } }` | y 轴同理 |
| tooltip 四价 | `tooltip: { title: 'date', items: [{ field: 'open', name: '开盘' }] }` | 影线 mark 设 `tooltip: false`，避免重复弹两条 |
| 暗色主题 | `theme: 'classicDark'` | 大屏 / 看盘软件场景 |
| 图表标题 | `title: { title: '示例个股 日 K', subtitle: '前复权' }` | `title` 必须是对象 |

标题与暗色主题示例：

```ts-snippet
chart.options({
  type: 'view',
  data,
  theme: 'classicDark',
  title: { title: '示例个股 日 K', subtitle: '前复权 · 单位：元', align: 'left' },
  children: [/* ... */],
});
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'stock'` / `type: 'candlestick'`（mark 不存在，白屏） | `type: 'view'` + 两个 `type: 'link'` children |
| `new Stock('container', { xField, yField })`（G2Plot v2） | `new Chart({ container })` + `chart.options(spec)` |
| `yField: ['open', 'close', 'high', 'low']`（v2 数组写法） | 影线 `encode: { y: 'low', y1: 'high' }`，实体 `encode: { y: 'open', y1: 'close' }` |
| `encode: { y: ['open', 'close'] }`（y 只接单个字段） | 区间两端用 `y` + `y1` 两个通道 |
| 用 `type: 'boxplot'` 画 K 线 | boxplot 表达统计四分位（`y/y1/y2/y3/y4` + band x），语义不符 |
| 两个 mark 分两次调 `chart.options()` | 一次 `chart.options({ type: 'view', children: [...] })`，后一次会整体覆盖 |
| `seriesField` / `colorField` 区分涨跌 | K 线没有系列概念，颜色用 `style.stroke` 回调 |
| 用 `line` 画四价 | 一条线只能落一个值，必须实体 + 影线两根线 |
| 均线用 mark `transform` 做滑动平均 | 窗口聚合在数据层完成，mark transform 只有 stack/dodge 等 |
| 停牌日用 `0` 补齐价格 | 停牌应整行剔除或价格传 `null`，`0` 会把 y 轴压扁 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/stock/basic.ts) | 单只股票日 K，最简起步 | `view` + `link`(low→high) + `link`(open→close) + `style.stroke` 涨跌回调 |
| [ma-line.ts](../examples/stock/ma-line.ts) | K 线叠加 MA5 / MA10 均线 | 数据层 `movingAverage` + 两条 `line` children + `lineDash` |
| [volume.ts](../examples/stock/volume.ts) | K 线 + 成交量副图 | `spaceFlex` + `direction: 'col'` + `ratio: [3, 1]` |
