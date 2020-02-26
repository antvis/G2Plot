---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#title)。

### description

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#description)。

### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

### forceFit

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#padding)。

### theme

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#theme)。

### data: collection

**required**

数据源为对象集合，例如：`[{ segment: '分类一'，value: 20 }, { segment: '分类二'，value: 20 }]`。

### dateField: string

**required**

日历图中对应日期数据的字段。

### valueField: string

**required**

日历图中对应每个格子中值的字段。

### colors: string | string[]

**required**

日历图中对应 valueField 值映射的颜色数组或者字符串，例如：'#BAE7FF-#1890FF-#0050B3' 或者 ['#BAE7FF', '#1890FF', '#0050B3']。

### months: string[]

**optional**

对应月份名称的数组，默认为 ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']。

### weeks: boolean

**optional**

对应星期名称的数组，从周日开始，默认为：['S', 'M', 'T', 'W', 'T', 'F', 'S']。

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。
