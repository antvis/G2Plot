---
title: Meta
order: 1
---

通过 `meta` 可以全局化配置图表数据元信息，以字段为单位进行配置。在 `meta` 上的配置将同时影响所有组件的文本信息。

## 配置方式

传入以字段名为 key，_MetaOption_ 为 value 的配置，同时设置多个字段的元信息。

```sign
{
  meta: {
    [field: string]: MetaOption
  }
}
```

Example:

```ts
{
  meta: {
    sale: {
      min: 0,
      max: 100,
    },
  }
}
```

## 细分配置项

_MetaOption_ 配置如下：

### MetaOption.type

<description> _string_ **optional**</description>

声明度量类型：

| 度量类型 | 描述                                                                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 分类度量 | - cat: 分类度量 <br /> - timeCat: 时间分类度量                                                                                                                                                                      |
| 连续度量 | - linear: 线性度量 <br /> - time：连续的时间度量 <br /> - log: log 度量 <br /> - pow: pow 度量 <br /> - quantize：分段度量，用户可以指定不均匀的分段 <br /> - quantile: 等分度量，根据数据的分布自动计算分段 <br /> |
| 常量度量 | - identity: 常量度量                                                                                                                                          
### MetaOption.alias

<description> _string_ **optional**</description>

数据字段的显示别名，scale 内部不感知，外部注入。

### MetaOption.values

<description> _any[]_ **optional**</description>

输入域、定义域。

### MetaOption.formatter

<description> _(value: any, index?: number) => any_ **optional**</description>

tick 格式化函数，影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。

### MetaOption.range

<description> _[number, number]_ **optional** _default:_ `[0, 1]`</description>

输出域、值域，表示在绘图范围内可用于绘制的范围。

### MetaOption.sync

<description> _boolean | string_ **optional**</description>

```ts
{
  meta: {
    {
      x: { sync: true },
      y: { sync: true },
      x1: { sync: 'x1' },
      x2: { sync: 'x1' },
    }
  }
}
```

同步 scale。sync: `boolean` 即为 sync: \[key\]，如上例中 `x: { sync: true }` 等同于 `x: { sync: 'x' }`，`y: { sync: true }` 等同于 `y: { sync: 'y' }`，所以，通过以上配置，会分别对 x 和 y 两个字段，x1 和 x2 两个字段进行同步度量操作。

### MetaOption.min

<description> _any_ **optional**</description>

定义域的最小值，d3 为 domain，ggplot2 为 limits，分类型下无效。

### MetaOption.max

<description> _any_ **optional**</description>

定义域的最大值，分类型下无效。

### MetaOption.minLimit

<description> _any_ **optional**</description>

严格模式下的定义域最小值，设置后会强制 ticks 从最小值开始。

### MetaOption.maxLimit

<description> _any_ **optional**</description>

严格模式下的定义域最大值，设置后会强制 ticks 以最大值结束。

### MetaOption.base

<description> _number_ **optional**</description>

log 有效，底数。

### MetaOption.exponent

<description> _number_ **optional**</description>

pow 有效，指数。

### MetaOption.nice

<description> _boolean_ **optional**</description>

自动调整 min、max 。

### MetaOption.ticks

<description> _any[]_ **optional**</description>

用于指定 tick，优先级最高。

### MetaOption.tickInterval

<description> _number_ **optional**</description>

tick 间隔，只对分类型和时间型适用，优先级高于 tickCount。

### MetaOption.minTickInterval

<description> _number_ **optional**</description>

tick 最小间隔，只对 linear 适用。

### MetaOption.tickCount

<description> _number_ **optional** _default:_ `5`</description>

tick 个数。

### MetaOption.maxTickCount

<description> _number_ **optional** _default:_ `10`</description>

ticks 最大值。

### MetaOption.tickMethod

<description> _string | TickMethod_ **optional**</description>

计算 ticks 的算法。

### MetaOption.showLast

<description> _boolean_ **optional**</description>

只对 type: 'time' 的 scale 生效，强制显示最后的日期 tick。

### MetaOption.mask

<description> _string_ **optional**</description>

时间度量 time, timeCat 时有效。底层使用 [fecha](https://github.com/taylorhakes/fecha#formatting-tokens) 进行日期的格式，所以对于 mask 的字符串可以直接参考其写法。
