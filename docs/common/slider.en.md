object 类型的请参考[绘图属性](../../docs/manual/graphic-style)

| 配置项          | 类型     | 功能描述           |
| --------------- | -------- | ------------------ |
| start           | number   | 默认起始位置       |
| end             | number   | 默认结束位置       |
| height          | number   | 缩略轴高度         |
| trendCfg        | trendCfg | 背景趋势的配置     |
| backgroundStyle | object   | 背景配置           |
| foregroundStyle | object   | 背景配置           |
| handlerStyle    | object   | handle 配置        |
| textStyle       | object   | 文本配置           |
| minLimit        | number   | 允许滑动位置下限   |
| maxLimit        | number   | 允许滑动位置上限   |
| formatter       | Function | 滑块文本格式化函数 |

trendCfg

| 配置项          | 类型     | 功能描述       |
| --------------- | -------- | -------------- |
| data            | number[] | 统计文本的样式 |
| smooth          | boolean  | 是否平滑       |
| isArea          | boolean  | 是否面积图     |
| backgroundStyle | object   | 背景样式配置   |
| lineStyle       | object   | line 样式配置  |
| areaStyle       | object   | area 样式配置  |
