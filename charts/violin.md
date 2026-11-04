# Violin 小提琴图

> 组件用途：用核密度轮廓对比多组连续数值的分布形态，并叠加箱线统计摘要。

## 何时使用

- 多组分布对比：不同地区的配送时长、不同实验组的测试得分、不同产品的响应时间
- 关注分布形态：偏态、尾部、集中区间，以及箱线图难以呈现的多峰特征
- 每组有足够的连续数值明细，既想看密度轮廓，又想保留中位数、四分位数等统计信息

## 何时不用

- 每组样本很少（尤其少于 20 条）或取值几乎相同 → 用 boxplot 箱线图或 point 散点图，KDE 容易产生误导或退化
- 只需中位数、四分位数和离群值，不关心分布形状 → 用 boxplot 箱线图
- 类别间的均值或总量对比 → 用 column 柱状图
- 连续时间趋势 → 用 line 折线图
- 需要精确读取各区间的频数 → 用直方图，不要用平滑后的密度轮廓代替精确计数

## 数据要求

- 长表数据，每行一个原始观测值，见 [数据模式](../references/data-patterns.md)；不要预先计算密度或五数摘要
- `x` 字段：分组类别字符串，如 `supportTeam`
- `y` 字段：连续数值（number），如 `responseMinutes`；字符串数字先 `Number()` 转换
- 每组建议至少 20～30 个有效观测，并保留真实取值差异；单点或零方差分组会使 KDE 退化
- `kde.groupBy` 必须包含所有分组字段；只有类别一个分组维度时写 `groupBy: ['supportTeam']`
- density 子图的 `encode.y` / `encode.size` 使用 KDE 输出字段（默认 `'y'` / `'size'`，或 `as` 自定义字段）；boxplot 子图的 `encode.y` 仍使用原始数值字段

## 基础实现（G2 v5）

小提琴图 = `type: 'view'` + density/KDE 密度轮廓 + `shape: 'violin'` 的 boxplot 统计层。G2 v5 没有独立的 `type: 'violin'`。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础小提琴图
 * 场景：对比多个客服团队的响应时间分布，同时查看中位数与四分位数
 * 要点：density + KDE 绘制密度轮廓，叠加 shape 为 violin 的 boxplot 显示统计摘要
 */
const responseTimesByTeam = {
  售前咨询: [3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24],
  售后支持: [6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 14, 15, 16, 17, 18, 20, 22, 25, 28, 32, 38],
  技术支持: [8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 42, 46, 52],
};

const data = Object.entries(responseTimesByTeam).flatMap(
  ([supportTeam, responseTimes]) =>
    responseTimes.map((responseMinutes) => ({ supportTeam, responseMinutes })),
);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  axis: {
    x: { title: '支持团队' },
    y: { title: '响应时间（分钟）' },
  },
  legend: false,
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'responseMinutes',
            groupBy: ['supportTeam'],
            size: 30,
            as: ['densityValue', 'densitySize'],
          },
        ],
      },
      encode: {
        x: 'supportTeam',
        y: 'densityValue',
        size: 'densitySize',
        series: 'supportTeam',
        color: 'supportTeam',
      },
      style: { fillOpacity: 0.65 },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'supportTeam',
        y: 'responseMinutes',
        series: 'supportTeam',
        color: 'supportTeam',
        shape: 'violin',
      },
      style: { opacity: 0.5, strokeOpacity: 0.8, point: false },
    },
  ],
});

chart.render();
```

父级 `data` 提供原始明细；density 子图在自己的 `data.transform` 中执行 KDE，boxplot 子图继续读取原始数据。`as` 将 KDE 输出命名为 `densityValue` 和 `densitySize`，避免与原始 `responseMinutes` 混淆。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 极坐标小提琴图 | 在 view 上增加 `coordinate: { type: 'polar' }`，两个子图不变 | [polar.ts](../examples/violin/polar.ts) |
| 显示离群点 | boxplot 子图将 `style.point` 设为样式对象，见下方 snippet | 基于 [basic.ts](../examples/violin/basic.ts) 修改 |

极坐标核心差异：

```ts-snippet
chart.options({
  type: 'view',
  data,
  coordinate: { type: 'polar' },
  children: [
    // density + KDE 子图与基础实现相同
    // shape: 'violin' 的 boxplot 子图与基础实现相同
  ],
});
```

显示离群点时，不要使用 `point: false`：

```ts-snippet
{
  type: 'boxplot',
  encode: {
    x: 'supportTeam',
    y: 'responseMinutes',
    series: 'supportTeam',
    color: 'supportTeam',
    shape: 'violin',
  },
  style: {
    opacity: 0.7,
    point: { fill: '#F5222D', size: 3 },
  },
}
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 分类配色 | view 上设置 `scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] } }` | 两个子图使用相同的 `encode.color`，共享分类色 |
| 密度填充透明度 | density 子图 `style: { fillOpacity: 0.45 }` | 降低填充不透明度，避免遮挡统计层 |
| 统计层透明度 | boxplot 子图 `style: { opacity: 0.7, strokeOpacity: 0.9 }` | 分别控制整体与描边不透明度 |
| 离群点 | boxplot 子图 `style: { point: { fill: '#F5222D', size: 3 } }` | `point: false` 隐藏离群点 |
| KDE 采样精度 | `kde` 增加 `size: 50` | 输出采样点数量；越大轮廓越精细，与 `encode.size` 不是同一配置 |
| KDE 平滑程度 | `kde` 增加 `width: 3` | 增大影响范围使曲线更平滑，过大可能抹平多峰特征 |
| KDE 数值范围 | `kde` 增加 `min: 0, max: 60` | 有明确业务上下界时固定估计范围，确保 `min < max` |
| 坐标轴标题 | view 上设置 `axis: { y: { title: '响应时间（分钟）' } }` | x 轴同理 |
| 图例位置 | `legend: { color: { position: 'top' } }` | 颜色与 x 轴重复时可用 `legend: false` |
| 密度提示 | density 子图 `tooltip: false` | 避免密度采样点与 boxplot 统计信息重复提示 |

自定义 KDE 输出字段时，`as` 与 encode 必须一一对应：

```ts-snippet
data: {
  transform: [
    {
      type: 'kde',
      field: 'responseMinutes',
      groupBy: ['supportTeam'],
      as: ['densityValue', 'densitySize'],
    },
  ],
},
encode: {
  x: 'supportTeam',
  y: 'densityValue',
  size: 'densitySize',
  series: 'supportTeam',
  color: 'supportTeam',
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'violin'` 或 `new Violin('container', {...})` | G2 v5 用 `type: 'view'` 组合 density 与 boxplot；入口统一为 `new Chart({ container })` |
| 只写 boxplot 的 `shape: 'violin'` | 还必须叠加 density + KDE，否则缺少真正的密度轮廓 |
| 把 `kde` 放在 mark 级 `transform` | KDE 是数据变换，必须放在 density 子图的 `data.transform` |
| 在 view 父级 `data.transform` 中对全部数据执行 KDE | 只在 density 子图执行 KDE；boxplot 必须继续消费原始明细 |
| density 的 `encode.y` 仍写原始 `responseMinutes` | 使用 KDE 输出字段：默认 `y: 'y', size: 'size'`，或严格匹配 `as` 自定义字段 |
| density 缺少 `encode.size` 或 `encode.series` | 两者都需配置；`size` 映射密度大小，`series` 保持分组轮廓独立 |
| 组合视图中 density 子图只写 `transform`，不写 `data` | 必须写成子图 `data: { transform: [...] }`，才能继承父级原始数据并应用 KDE |
| `kde.field` 与 `groupBy` 不匹配数据字段 | `field` 是原始数值字段，`groupBy` 包含类别及所有系列分组字段 |
| 每组只有单点或所有值相同，仍强行绘制 | 增加有效样本或改用 boxplot/point；有业务边界时可设 `min` / `max`，但不能代替样本量 |
| `chart.source(data)`、`.position('x*y')`（v4） | `chart.options({ data, encode: { x, y } })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/violin/basic.ts) | 多团队响应时间分布 + 中位数与四分位数 | `view` + density/`data.transform.kde` + boxplot `shape: 'violin'`；自定义 KDE `as` 输出 |
| [polar.ts](../examples/violin/polar.ts) | 环形布局对比各门店配送时长分布 | view `coordinate: { type: 'polar' }` + density/boxplot children |
