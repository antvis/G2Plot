---
title: API
---

## 配置属性

### 图表容器

`markdown:common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：

```ts
[
  { ts_code: '000001.SH', trade_date: '2020-03-13', close: 2887.4265, open: 2804.2322, high: 2910.8812, low: 2799.9841, vol: 366450436, amount: 393019665.2 },
  { ts_code: '000001.SH', trade_date: '2020-03-12', close: 2923.4856, open: 2936.0163, high: 2944.4651, low: 2906.2838, vol: 307778457, amount: 328209202.4 },
  { ts_code: '000001.SH', trade_date: '2020-03-11', close: 2968.5174, open: 3001.7616, high: 3010.0286, low: 2968.5174, vol: 352470970, amount: 378766619 },
  { ts_code: '000001.SH', trade_date: '2020-03-10', close: 2996.7618, open: 2918.9347, high: 3000.2963, low: 2904.7989, vol: 393296648, amount: 425017184.8 },
  { ts_code: '000001.SH', trade_date: '2020-03-09', close: 2943.2907, open: 2987.1805, high: 2989.2051, low: 2940.7138, vol: 414560736, amount: 438143854.6 },
  { ts_code: '000001.SH', trade_date: '2020-03-06', close: 3034.5113, open: 3039.9395, high: 3052.4439, low: 3029.4632, vol: 362061533, amount: 377388542.7 },
  { ts_code: '000001.SH', trade_date: '2020-03-05', close: 3071.6771, open: 3036.1545, high: 3074.2571, low: 3022.9262, vol: 445425806, amount: 482770471.4 },
  { ts_code: '000001.SH', trade_date: '2020-03-04', close: 3011.6657, open: 2981.806, high: 3012.0035, low: 2974.3583, vol: 353338278, amount: 389893917.5 },
  { ts_code: '000001.SH', trade_date: '2020-03-03', close: 2992.8968, open: 3006.8888, high: 3026.842, low: 2976.623, vol: 410108047, amount: 447053681.5 },
  { ts_code: '000001.SH', trade_date: '2020-03-02', close: 2970.9312, open: 2899.31, high: 2982.5068, low: 2899.31, vol: 367333369, amount: 397244201.2 },
  { ts_code: '000001.SH', trade_date: '2020-02-28', close: 2880.3038, open: 2924.6407, high: 2948.1261, low: 2878.5443, vol: 401216914, amount: 432657775 },
  { ts_code: '000001.SH', trade_date: '2020-02-27', close: 2991.3288, open: 2992.4919, high: 3009.4575, low: 2980.4774, vol: 350523658, amount: 395955641.5 },
  { ts_code: '000001.SH', trade_date: '2020-02-26', close: 2987.9287, open: 2978.4195, high: 3028.7788, low: 2974.9423, vol: 469049552, amount: 495341447.3 },
  { ts_code: '000001.SH', trade_date: '2020-02-25', close: 3013.0501, open: 2982.0696, high: 3016.9458, low: 2943.7168, vol: 441622762, amount: 513128644.6 },
  { ts_code: '000001.SH', trade_date: '2020-02-24', close: 3031.2333, open: 3027.8925, high: 3042.1821, low: 3007.3557, vol: 370430044, amount: 451601363.1 },
]
```

#### xField 📌

**必选**, _string_

功能描述：  图形标记在 y 方向位置映射所对应的数据字段名，一般对应一个日期或者日期时间格式的字段(交易日)。

目前`xField`会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：
   
   - 时间戳，如 1436237115500；
   - 时间字符串： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

默认配置： 无


### yField 📌

**必选**, _array string_

功能描述： 该项为二维数组, 对应的是`[开盘价,收盘价,最高价,最低价]`字段的数组 

默认配置： 无

例如: `[open, close, high, low]`



`markdown:common/meta.zh.md`

### 图形样式

`markdown:common/color.zh.md`

### tooltip

`markdown:common/tooltip.zh.md`

### axis

xAxis、yAxis 配置相同。

`markdown:common/axis.zh.md`

### legend

`markdown:common/legend.zh.md`

### theme

`markdown:common/theme.zh.md`

### 事件

`markdown:common/events.zh.md`

#### 图表方法

`markdown:common/chart-methods.zh.md`
