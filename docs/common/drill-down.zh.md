#### drilldown

<description>**optional** _DrillDownCfg_</description>

下钻交互配置。

_DrillDownCfg_ 类型定义如下：

| 属性       | 类型            | 描述                     |
| ---------- | --------------- | ------------------------ |
| enabled | _boolean_ | 是否开启下钻交互，默认为：'false' |
| breadCrumb | _BreadCrumbCfg_ | 下钻交互的面包屑 UI 配置 |

_BreadCrumbCfg_ 类型定义如下：

| 属性        | 类型         | 描述                                       |
| ----------- | ------------ | ------------------------------------------ |
| position    | _string_     | 位置。可选项：'top-left' | 'bottom-left' |
| rootText    | _string_     | 根节点的文案，默认：'Root'（中文：'初始'） |
| dividerText | _string_     | 分割线，默认：'/'                          |
| textStyle   | _ShapeAttrs_ | 字体样式                                   |
| activeTextStyle | _ShapeAttrs_ | 激活字体样式                               |
