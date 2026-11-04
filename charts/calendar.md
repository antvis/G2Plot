# Calendar 日历图

> 组件用途：按年历或月历网格展示每日数值，用颜色强弱定位活跃日期、周期规律与异常空白。

## 何时使用

- 年度活跃与贡献：代码提交、内容发布、运动打卡、学习时长
- 月历经营分析：每日营收、订单量、告警数，保留星期与周次上下文
- 关注工作日/周末差异、连续活跃或连续缺失，而不是精确趋势斜率
- 数据能按日期聚合为“一天一个数值”

## 何时不用

- 只看连续时间趋势或精确比较相邻点 → 用 line 折线图
- 星期 × 小时等任意双类别密度 → 用 heatmap 热力图
- 无序类别间数值对比 → 用 column 柱状图
- 展示日程起止时间、任务跨度或事件详情 → 用甘特图或日程组件，而非日历热力图

## 数据要求

- 长表数据，每行一天，见 [数据模式](../references/data-patterns.md)
- `date` 字段：完整日期字符串（`'2026-04-01'`），用于 tooltip 和日期计算
- 每日数值字段：`number`，如 `commitCount` / `revenue`；字符串数字先 `Number()` 转换
- 年历布局字段：`weekIndex`（全年周索引，映射 x）与 `weekday`（星期，映射 y）
- 月历布局字段：`weekday`（映射 x）与 `weekIndex`（月内周索引，映射 y）；显示日号时增加 `dayOfMonth`
- 同一天有多条明细时先按日期聚合，保证一个日期只对应一个格子
- 需要展示完整日期范围时，在渲染前补齐日期序列；只有“无活动”确实等于 0 时才补零，设备离线等未知状态不要当作 0

日期计算建议统一使用 UTC：`Date.UTC()` 创建时间，`getUTCDay()` 计算星期，避免 UTC 日期字符串与本地时区 getter 混用造成前后错一天。周一为一周起点时，星期索引为 `(getUTCDay() + 6) % 7`。

## 基础实现（G2 v5）

G2 v5 没有独立的 `calendar` mark。年历 = `type: 'cell'` + 预处理出的周索引/星期字段 + `sequential` 顺序色阶。

```ts
import { Chart } from '@antv/g2';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const yearStart = Date.UTC(2025, 0, 1);
const firstWeekdayOffset = (new Date(yearStart).getUTCDay() + 6) % 7;

const data = Array.from({ length: 365 }, (_, dayOffset) => {
  const date = new Date(yearStart + dayOffset * millisecondsPerDay);
  const weekdayIndex = (date.getUTCDay() + 6) % 7;
  const isWeekend = weekdayIndex >= 5;

  return {
    date: date.toISOString().slice(0, 10),
    weekIndex: Math.floor((firstWeekdayOffset + dayOffset) / 7),
    weekday: weekdays[weekdayIndex],
    commitCount: isWeekend
      ? dayOffset % 3
      : (dayOffset * 7 + weekdayIndex) % 15,
  };
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  encode: { x: 'weekIndex', y: 'weekday', color: 'commitCount' },
  scale: {
    x: { type: 'band' },
    y: { type: 'band', domain: weekdays },
    color: { type: 'sequential', palette: 'Greens', domain: [0, 14] },
  },
  style: { inset: 2, radius: 2 },
  axis: { x: { title: null, tickCount: 12 }, y: { title: null } },
  tooltip: {
    title: 'date',
    items: [
      {
        field: 'commitCount',
        name: '代码提交',
        valueFormatter: (value) => `${value} 次`,
      },
    ],
  },
});

chart.render();
```

关键计算：若年首不是周一，`firstWeekdayOffset` 表示第一周的前置天数；全年第 `dayOffset` 天的周索引为 `Math.floor((firstWeekdayOffset + dayOffset) / 7)`。闰年应生成 366 天，不要固定写死 365。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 月历排布 | x 映射 `weekday`，y 映射月内 `weekIndex`；隐藏周序号轴 | [month.ts](../examples/calendar/month.ts) |
| 日号标签 + 深浅文字适配 | `labels` 显示 `dayOfMonth`，`style.fill` 按数值切换文字颜色 | [month.ts](../examples/calendar/month.ts) |
| 自定义连续色阶 | `scale.color.range` 传颜色数组，跨周期比较时固定 `domain` | [month.ts](../examples/calendar/month.ts) |

月历核心差异（每周一行、每周七天作为列）：

```ts-snippet
encode: { x: 'weekday', y: 'weekIndex', color: 'revenue' },
scale: {
  x: { type: 'band', domain: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  y: { type: 'band' },
},
axis: { x: { title: null }, y: false },
labels: [{ text: 'dayOfMonth' }],
```

年历格子很密时优先用 tooltip 读数；日号或数值标签更适合月历，避免 365 个标签互相遮挡。

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 内置顺序色阶 | `scale: { color: { type: 'sequential', palette: 'Greens' } }` | 也可用 `Blues` / `YlOrRd` |
| 自定义连续颜色 | `scale: { color: { type: 'sequential', range: ['#f0f0f0', '#40a9ff', '#0958d9'] } }` | 数组从低值到高值排列 |
| 固定颜色定义域 | `scale: { color: { domain: [0, 50] } }` | 多张日历共用同一标准时必须固定，避免各自自动缩放 |
| 格子间距 | `style: { inset: 2 }` | px，0 为无缝 |
| 格子圆角 | `style: { radius: 2 }` | 常配合 `inset` 使用 |
| 星期顺序 | `scale: { y: { type: 'band', domain: weekdays } }` | 年历示例；月历将同样配置放在 x |
| 图例位置 | `legend: { color: { position: 'bottom' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭周序号轴 | `axis: { y: false }` | 适用于 y 为月内周索引的月历 |
| 图表标题 | `title: { title: '每日营收', subtitle: '单位：元' }` | `title` 必须是对象，不能直接写字符串 |

自定义色阶与标签文字适配，完整示例见 [month.ts](../examples/calendar/month.ts)：

```ts-snippet
scale: {
  color: {
    type: 'sequential',
    range: ['#f5f9ff', '#c6dbef', '#6baed6', '#2171b5', '#08306b'],
    domain: [0, 2400],
  },
},
labels: [
  {
    text: 'dayOfMonth',
    style: {
      fill: (d) => (d.revenue >= 1900 ? '#fff' : '#333'),
    },
  },
],
```

tooltip 使用完整日期作为标题，并为每日指标补充业务名称和单位：

```ts-snippet
tooltip: {
  title: 'date',
  items: [
    {
      field: 'revenue',
      name: '营收',
      valueFormatter: (value) => `${Number(value).toLocaleString()} 元`,
    },
  ],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'calendar'` | G2 v5 用 `type: 'cell'`，日历布局由周索引与星期字段实现 |
| `new Calendar('container', {...})` | `import { Chart } from '@antv/g2'` + `new Chart({ container })` |
| 直接 `encode: { x: 'date', y: 'commitCount' }` 当年历 | 先派生 `weekIndex` / `weekday`，再映射 x / y / color |
| 用 `type: 'heatmap'` 画日历格子 | 离散日历格子用 `cell`；`heatmap` 是连续高斯渐变密度图 |
| x/y 使用 `point` 比例尺 | 使用 `band`；`point` 的 bandwidth 为 0，cell 会不可见 |
| 直接把 `getDay()` 的 0~6 当周一到周日 | JavaScript 原生返回值以周日为 0；周一起点用 `(getUTCDay() + 6) % 7` |
| `new Date('YYYY-MM-DD')` 搭配本地 `getDay()` / `getDate()` | 统一用 `Date.UTC` + UTC getter，或使用全程同时区的日期库 |
| 所有缺失日期都补 0 | 无活动可显式补 0；离线/未采集是未知，应与真实零值区分 |
| 一天多条原始明细直接绘制 | 先按日期聚合，避免同一 x/y 组合出现重叠格子 |
| `scale: { color: { palette: ['#eee', '#0a0'] } }` | `palette` 只接受调色板名；颜色数组用 `range` |
| 两年数据各自自动计算颜色 domain 后直接比较 | 各图设置相同 `scale.color.domain` 与色阶 |
| 在密集年历上显示全部数值标签 | 年历用 tooltip；日号/数值标签主要用于月历或筛选后的格子 |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/calendar/basic.ts) | 全年代码提交活跃度，GitHub 风格年历 | `type: 'cell'`、周列 × 星期行、`palette: 'Greens'`、UTC 周索引 |
| [month.ts](../examples/calendar/month.ts) | 月历每日营收，显示日号与精确提示 | 星期列 × 周行、`labels`、`scale.color.range/domain`、标签深浅文字适配 |
