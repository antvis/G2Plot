> 目前只适用于：折线图、面积图、双轴图。

| 配置项          | 类型           | 功能描述           |
| --------------- | -------------- | ------------------ |
| start           | _number_       | 默认起始位置       |
| end             | _number_       | 默认结束位置       |
| height          | _number_       | 缩略轴高度         |
| trendCfg        | _TrendCfg_     | 背景趋势的配置     |
| backgroundStyle | _object_       | 背景配置，参考[绘图属性](/zh/docs/api/graphic-style)           |
| foregroundStyle | _object_       | 前景配置，参考[绘图属性](/zh/docs/api/graphic-style)          |
| handlerStyle    | _HandlerStyle_ | handler 配置       |
| textStyle       | _object_       | 文本配置，参考[绘图属性](/zh/docs/api/graphic-style)          |
| minLimit        | _number_       | 允许滑动位置下限   |
| maxLimit        | _number_       | 允许滑动位置上限   |
| formatter       | _Function_     | 滑块文本格式化函数 |

__*TrendCfg*__ 类型如下：

| 配置项          | 类型       | 功能描述       |
| --------------- | ---------- | -------------- |
| data            | _number[]_ | 统计文本的样式 |
| smooth          | _boolean_  | 是否平滑       |
| isArea          | _boolean_  | 是否面积图     |
| backgroundStyle | _object_   | 背景样式配置，参考[绘图属性](/zh/docs/api/graphic-style)   |
| lineStyle       | _object_   | line 样式配置，参考[绘图属性](/zh/docs/api/graphic-style)  |
| areaStyle       | _object_   | area 样式配置，参考[绘图属性](/zh/docs/api/graphic-style)  |

__*HandlerStyle*__ 类型如下：

| 配置项 | 类型     | 功能描述       |
| ------ | -------- | -------------- |
| width  | _number_ | 缩略轴手柄宽度 |
| height | _number_ | 缩略轴手柄高度 |
| fill          | _string_ | 缩略轴手柄填充色                   |
| highLightFill | _string_ | 缩略轴手柄填充高亮色（hover 状态） |
| stroke        | _string_ | 缩略轴手柄描边色                   |
| opacity       | _number_ | 缩略轴手柄填充透明度               |
| radius        | _number_ | 缩略轴手柄背景圆角                 |
| cursor        | _string_ | 缩略轴手柄鼠标样式 （hover 状态）  |
