object 类型的请参考[绘图属性](/zh/docs/api/shape/shape-attrs)

| 配置项          | 类型     | 功能描述           |
| --------------- | -------- | ------------------ |
| start           | _number_    | 默认起始位置       |
| end             | _number_    | 默认结束位置       |
| height          | _number_    | 缩略轴高度         |
| trendCfg        | _trendCfg_ | 背景趋势的配置     |
| backgroundStyle | _object_    | 背景配置           |
| foregroundStyle | _object_    | 背景配置           |
| handlerStyle    | _object_    | handle 配置        |
| textStyle       | _object_    | 文本配置           |
| minLimit        | _number_    | 允许滑动位置下限   |
| maxLimit        | _number_    | 允许滑动位置上限   |
| formatter       | _Function_ | 滑块文本格式化函数 |

trendCfg

| 配置项          | 类型     | 功能描述       |
| --------------- | -------- | -------------- |
| data            | _number[]_ | 统计文本的样式 |
| smooth          | _boolean_   | 是否平滑       |
| isArea          | _boolean_   | 是否面积图     |
| backgroundStyle | _object_    | 背景样式配置   |
| lineStyle       | _object_    | line 样式配置  |
| areaStyle       | _object_    | area 样式配置  |
