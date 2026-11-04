# Word Cloud 词云图

> 组件用途：用字号大小概览文本关键词的相对权重，快速发现高频词和热门话题。

## 何时使用

- 词频概览：搜索词、评论关键词、标签、新闻热词的频次或热度
- 文本探索：快速识别一组文本中的主要话题，配合分类字段观察主题分布
- 定性浏览：关注哪些词更突出，而非精确读取数值或比较细小差异

## 何时不用

- 精确比较类别数值或排名 → 用 bar 条形图或 column 柱状图
- 展示占比与构成 → 用 pie 饼图
- 分析关键词随时间的变化 → 用 line 折线图
- 原始长文本尚未分词和聚合 → 先完成文本预处理，不要直接传给词云

## 数据要求

- 长表数据，每行一个已聚合的关键词，见 [数据模式](../references/data-patterns.md)
- `text` 字段：非空词语字符串，通过 `encode.text` 映射；相同词语应先合并
- `value` 字段：正数权重（number），通过 `encode.value` 映射；字符串数字先 `Number()` 转换
- `color` 字段（可选）：词语分类或权重，通过 `encode.color` 映射
- 原始评论、文章需先分词、去停用词并统计权重；权重跨度过大时可先做对数压缩，避免小词难以辨认

## 基础实现（G2 v5）

词云使用 `type: 'wordCloud'`，`encode.text/value` 指定文字与权重；`layout.fontSize` 将权重线性映射到字号范围。

```ts
/**
 * 基础词云图
 * 场景：概览电商站内搜索关键词的热度，突出高频搜索词
 * 要点：text/value 分别映射词语与数值权重，layout.fontSize 控制字号范围
 */
import { Chart } from '@antv/g2';

const data = [
  { keyword: '无线耳机', searchCount: 1280 },
  { keyword: '机械键盘', searchCount: 960 },
  { keyword: '人体工学椅', searchCount: 820 },
  { keyword: '降噪耳机', searchCount: 760 },
  { keyword: '显示器', searchCount: 680 },
  { keyword: '平板电脑', searchCount: 590 },
  { keyword: '智能手表', searchCount: 520 },
  { keyword: '移动电源', searchCount: 430 },
  { keyword: '蓝牙音箱', searchCount: 360 },
  { keyword: '笔记本电脑支架', searchCount: 280 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'wordCloud',
  data,
  encode: {
    text: 'keyword',
    value: 'searchCount',
    color: 'keyword',
  },
  layout: {
    fontSize: [16, 64],
    padding: 2,
    rotate: 0,
  },
  legend: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分类配色 | `encode.color` 映射分类字段，`scale.color.range` 指定色板 | [category-colors.ts](../examples/word-cloud/category-colors.ts) |
| 横竖混排 | `layout.rotate` 回调按权重返回角度 | [rotated.ts](../examples/word-cloud/rotated.ts) |
| 矩形螺旋 | `layout.spiral: 'rectangular'` | [rotated.ts](../examples/word-cloud/rotated.ts) |

横竖混排核心差异（示例让高热度词水平、其余词垂直）：

```ts-snippet
layout: {
  rotate: (word) => (word.heat >= 70 ? 0 : 90),
  spiral: 'rectangular',
},
```

## 样式自定义

常用视觉定制项，完整示例见 [category-colors.ts](../examples/word-cloud/category-colors.ts) 与 [rotated.ts](../examples/word-cloud/rotated.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 字号范围 | `layout: { fontSize: [12, 60] }` | 按 `encode.value` 的最小、最大权重线性映射 |
| 固定字号 | `layout: { fontSize: 24 }` | 所有词使用相同字号，不体现权重差异 |
| 分类配色 | `encode: { color: 'aspect' }` + `scale.color.range` | 同类词语同色，保留图例便于识别分类 |
| 连续色阶 | `encode.color` 映射数值 + `scale.color.type: 'sequential'` | 用颜色深浅辅助表达热度 |
| 词语间距 | `layout: { padding: 4 }` | 单位为 px；过大可能导致部分词放不下 |
| 全部水平 | `layout: { rotate: 0 }` | 避免默认随机角度，提升可读性 |
| 字体 | `layout: { font: 'Verdana, sans-serif' }` | 布局测量与文字渲染使用同一字体 |
| 螺旋方式 | `layout: { spiral: 'archimedean' }` | 可选 `'archimedean'` / `'rectangular'` |
| 图例位置 | `legend: { color: { position: 'top' } }` | 分类配色时适用；单词云可 `legend: false` |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'wordcloud'` | 类型名大小写为 `type: 'wordCloud'` |
| `new WordCloud('container', {...})`（G2Plot v2） | `new Chart({ container })` + `chart.options({ type: 'wordCloud', ... })` |
| `wordField: 'keyword'`、`weightField: 'count'` | `encode: { text: 'keyword', value: 'count' }` |
| `encode: { size: 'count' }` 控制词大小 | 权重用 `encode.value`，字号范围用 `layout.fontSize` |
| `encode: { fontSize: { field: 'count', range: [12, 60] } }` | `encode.value: 'count'` + `layout: { fontSize: [12, 60] }` |
| `layout: { fontSize: 'count' }` | `fontSize` 接收固定数值、`[最小值, 最大值]` 或回调，不接收字段名 |
| 在 `encode.rotate` 中配置旋转 | 旋转是布局参数，使用 `layout.rotate` |
| 直接传入逐条评论或重复关键词 | 先分词、聚合并去重，每行保留一个关键词及其数值权重 |
| 容器高度为 0，或容器过小时仍使用过大字号 | 用 CSS 为自适应容器设置有效高度；适当缩小字号范围或减少词语，避免词语被布局丢弃 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/word-cloud/basic.ts) | 搜索关键词热度，最简起步 | `encode: { text, value, color }` + `layout.fontSize` |
| [category-colors.ts](../examples/word-cloud/category-colors.ts) | 评论关键词按产品体验维度分类 | `encode.color` + `scale.color.range` + 顶部图例 |
| [rotated.ts](../examples/word-cloud/rotated.ts) | 话题热度横竖混排 | `layout.rotate` 回调 + `spiral: 'rectangular'` |
