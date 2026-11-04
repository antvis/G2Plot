# Calendar 日历图

> 组件用途：把一年或一月的逐日数据铺成日历网格，用颜色编码数值，快速看出周期性与空白期。

## 何时使用

- 逐日指标的时间序列：代码提交、每日营收、每日活跃用户、每日打卡
- 需要看出**星期规律**与**连续断层**（长期空白、周末低谷）
- 周期跨度固定为一月或一年，且每天一个格子
- 读者需要一眼定位「哪天异常」

## 何时不用

- 连续趋势与拐点分析 → `line` 折线图更准
- 时间跨度超过一年 → 分年拆多张日历，否则格子过小
- 数据粒度不是「天」（小时/分钟） → `heatmap` 或 `line`
- 只需月度汇总 → `column` 柱状图

## 数据要求

- 长表数据，每行一天，见 [数据模式](../references/data-patterns.md)
- `date` 字段：日期字符串（`YYYY-MM-DD`），用于 tooltip 标题
- `weekIndex` 字段：该天在全年/全月中的第几周（number），映射到 `x`
- `weekday` 字段：星期名（`Mon`~`Sun`），映射到 `y`
- `value` 字段：当日数值（number），映射到 `color`
- 建议在数据里预先把日期换算成 `weekIndex`/`weekday`，**用 UTC 计算**避免时区导致错位

## 基础实现（G2 v5）

日历图 = `type: 'cell'` + `x`/`y` 均为 `band` 比例尺 + `color` 用 `sequential` 顺序色阶。

```ts
import { Chart } from '@antv/g2';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const yearStart = Date.UTC(2025, 0, 1);
const firstWeekdayOffset = (new Date(yearStart).getUTCDay() + 6) % 7;

const data = Array.from({ length: 365 }, (_, dayOffset) => {
  const date = new Date(yearStart + dayOffset * millisecondsPerDay);
  const weekdayIndex = (date.getUTCDay() + 6) % 7;

  return {
    date: date.toISOString().slice(0, 10),
    weekIndex: Math.floor((firstWeekdayOffset + dayOffset) / 7),
    weekday: weekdays[weekdayIndex],
    commitCount: dayOffset % 15,
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
});

chart.render();
```

## 常见变体

### 1. 月历 + 日号标签

`x` 映射星期、`y` 映射月内周序号，在 `labels` 里把 `dayOfMonth` 写进格子；深色格子需要切白色文字保证可读。

见 [`examples/calendar/month.ts`](../examples/calendar/month.ts)。

### 2. 年中截面（只画半年）

数据只生成 180 天，`weekIndex` 自然收缩到 26 列，格子变宽、可读性提升。

### 3. 自定义色阶

`scale.color.palette` 换成业务色（红→黄→绿表示健康度），并显式指定 `domain` 固定色阶范围，避免不同年份之间不可比。

## 样式自定义

| 配置 | 作用 |
|---|---|
| `style.inset` | 格子间距，2~3 视觉最干净 |
| `style.radius` | 格子圆角，2 像素接近 GitHub 风格 |
| `scale.color.domain` | 固定色阶上下界，跨图可比 |
| `axis.x.tickCount` | 周轴刻度密度，一年图建议 12 个月刻度 |
| `labels.text` | 格内文字（月历放日号，年历通常不放） |

## 易错点（v4 → v5）

- **v4 的 `type: 'calendar'` 不存在**：v5 用通用 `cell` 自己算周列/星期行，直接写 `calendar` 会报未知 mark
- **用本地时区算日期**：`new Date(y, m, d)` 在东八区会整体偏移一天，必须用 `Date.UTC` + `getUTCDay`
- **星期索引从周日开始**：业务上「周一起始」时要做 `(getUTCDay() + 6) % 7` 转换，否则整行错位
- **`y` 不指定 domain**：不写 `scale.y.domain = weekdays` 时，缺数据的日子会让星期顺序被字母序打乱
- **闰年天数写死 365**：2024/2028 要 366，年末最后一天会被丢掉
- **色阶不固定 domain**：不同数据各算各的 min/max，两张图颜色不可比

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/calendar/basic.ts) | GitHub 风格年度提交热力图 | `cell` + UTC 周索引 + `sequential` Greens 色阶 |
| [month.ts](../examples/calendar/month.ts) | 月历展示每日营收，格内带日号 | 星期列/周行 + `labels.text: dayOfMonth` + 深色格白字 |
