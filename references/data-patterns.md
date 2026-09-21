# 数据模式

## 长表（首选）

每行一条观测记录，分类信息在字段里展开。G2 v5 所有图表默认消费长表：

```ts-snippet
const data = [
  { month: 'Jan', series: '销售额', value: 120 },
  { month: 'Jan', series: '利润', value: 40 },
  { month: 'Feb', series: '销售额', value: 200 },
  { month: 'Feb', series: '利润', value: 90 },
];
```

## 宽表 → 长表

宽表（每个系列一列）不能直接用于多系列图表，先转换：

```ts-snippet
// 宽表：[{ month, sales, profit }]
// 长表：[{ month, series, value }]
const longData = data.flatMap((d) => [
  { month: d.month, series: '销售额', value: d.sales },
  { month: d.month, series: '利润', value: d.profit },
]);
```

## 时间字段

- x 轴保持字符串（`'2026-01'`）或毫秒时间戳，G2 自动推断类型
- 需要自定义展示格式时用 `axis: { x: { labelFormatter } }`，不要预先转成展示字符串
- `labelFormatter` 刻度值格式化，可以传入一个函数或者是 d3-format 支持的字符串

## 数值必须是 number

服务端常返回字符串数字（`'120'`），会导致 y 轴刻度异常。映射前先转换：

```ts-snippet
const data = raw.map((d) => ({ ...d, value: Number(d.value) }));
```

## 缺失数据

- 折线断点：该点 `value` 传 `null`（不要传 `0` 或 `undefined`）
- 补零场景（如柱状图）：显式补 `0` 并在注释中说明业务含义
