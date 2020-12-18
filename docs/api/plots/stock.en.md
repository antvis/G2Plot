---
title: Stock
order: 18
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：

```ts
[
  {
    ts_code: '000001.SH',
    trade_date: '2020-03-13',
    close: 2887.4265,
    open: 2804.2322,
    high: 2910.8812,
    low: 2799.9841,
    vol: 366450436,
    amount: 393019665.2,
  },
  {
    ts_code: '000001.SH',
    trade_date: '2020-03-12',
    close: 2923.4856,
    open: 2936.0163,
    high: 2944.4651,
    low: 2906.2838,
    vol: 307778457,
    amount: 328209202.4,
  },
];
```

#### xField 

<description>**required** _string_</description>

图形标记在 y 方向位置映射所对应的数据字段名，一般对应一个日期或者日期时间格式的字段(交易日)。

目前`xField`会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：

- 时间戳，如 1436237115500；
- 时间字符串： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

#### yField 

<description>**required** _array string_</description>

该项为二维数组, 对应的是`[开盘价,收盘价,最高价,最低价]`字段的数组。

例如: `['open', 'close', 'high', 'low']`

`markdown:docs/common/meta.en.md`

### Geometry Style

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

### Plot Theme

`markdown:docs/common/theme.en.md`
