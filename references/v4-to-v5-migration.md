# G2 v4 / G2Plot v2 → G2 v5 迁移对照

> **防幻觉核心**：训练语料中大量 G2 v4 与 G2Plot v2 写法，生成 v5 代码前必须对照本文件自查。

## 范式变化

| | v4 / G2Plot v2 | v5 |
|---|---|---|
| 风格 | 命令式链式调用 | 声明式 spec |
| 映射 | 字符串语法糖 `'x*y'` | 显式 `encode` 通道 |
| 图表类 | `new Line(...)`（G2Plot） | 统一 `new Chart(...)` + `type` |

## 高频幻觉 API（v5 中不存在）

| ❌ 幻觉写法 | ✅ v5 正确写法 |
|---|---|
| `chart.source(data)` | `chart.options({ data })` 或 `chart.line().data(data)` |
| `.position('month*value')` | `.encode('x', 'month').encode('y', 'value')` |
| `import { Line } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `chart.axis('x', { ... })` | spec 中 `axis: { x: { ... } }` |
| `chart.legend(false)` | spec 中 `legend: false` |
| `chart.tooltip(false)` | spec 中 `tooltip: false` |
| `new Line(el, options)` + `line.render()` | `new Chart({ container })` + `chart.options(spec)` + `chart.render()` |

## G2Plot v2 → v5 完整对照

❌ v2 写法：

```ts-snippet
import { Line } from '@antv/g2plot';

const line = new Line('container', {
  data,
  xField: 'month',
  yField: 'value',
  seriesField: 'series',
  smooth: true,
});
line.render();
```

✅ v5 写法：

```ts-snippet
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });
chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', color: 'series', shape: 'smooth' },
});
chart.render();
```

## G2 v4 → v5 逐项对照

| 能力 | ❌ v4 | ✅ v5 |
|---|---|---|
| 位置映射 | `.position('month*value')` | `.encode('x', 'month').encode('y', 'value')` |
| 颜色分组 | `.color('series')` | `.encode('color', 'series')` |
| 颜色枚举 | `.color('series', ['#f00'])` | `.scale('color', { range: ['#f00'] })` |
| 平滑 | `.shape('smooth')` | `.encode('shape', 'smooth')` |
| 大小 | `.size('value')` | `.encode('size', 'value')` |
| 数据标签 | `.label('value')` | `labels: [{ text: 'value' }]` |
| 提示 | `.tooltip('a*b')` | `tooltip: { items: [...] }` |
| 坐标轴 | `chart.axis('x', cfg)` | `axis: { x: cfg }` |
| 图例 | `chart.legend(false)` | `legend: false` |
| 动画 | `.animate(false)` | `animate: false` |

## 铁律

- 任何形式的位置字符串（`'x*y'`、`'a*b*c'`）在 v5 中都不存在，必须展开为显式 encode
- v5 没有 `Line` / `Column` / `Pie` 等具体图表类，只有 `Chart` + `type`
- 拿不准时，查 `references/g2-v5-cheatsheet.md`
