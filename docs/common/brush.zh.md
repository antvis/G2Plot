#### brush

<description>**optional** _BrushCfg_</description>

刷选交互配置。

**配置项**

_BrushCfg_ 类型定义如下：

| 属性    | 类型      | 描述                                                                                          |
| ------- | --------- | --------------------------------------------------------------------------------------------- |
| enabled | _boolean_ | 是否开启 brush 刷选交互，默认为：'false'                                                      |
| type    | _string_  | brush 类型: '矩形', 'x 方向' 和 'y 方向'. 默认: 'rect', 目前不支持 polygon 不规则矩形         |
| action  | _string_  | brush 操作，可选项：'filter' \| 'highlight'（对应 '筛选过滤' 和 '高亮强调'）. 默认: 'filter'. |
| mask    | _MaskCfg_ | 刷选交互的蒙层 mask UI 配置                                                                   |

_MaskCfg_ 类型定义如下：

| 属性  | 类型         | 描述      |
| ----- | ------------ | --------- |
| style | _ShapeAttrs_ | mask 样式 |

**事件**

brush 交互相关事件:

1. `brush-filter`, 事件列表：

| 事件名称                               | 描述                                              |
| -------------------------------------- | ------------------------------------------------- |
| `G2.BRUSH_FILTER_EVENTS.BEFORE_FILTER` | Brush 事件触发 “filter” 发生之前的钩子            |
| `G2.BRUSH_FILTER_EVENTS.AFTER_FILTER`  | Brush 事件触发 “filter” 发生之后的钩子            |
| `G2.BRUSH_FILTER_EVENTS.BEFORE_RESET`  | Brush 事件触发筛选(filter) “reset” 发生之前的钩子 |
| `G2.BRUSH_FILTER_EVENTS.AFTER_RESET`   | Brush 事件触发筛选(filter) “reset” 发生之后的钩子 |

示例:

<playground path="dynamic-plots/brush/demo/advanced-brush1.ts" rid="brush-filter-event"></playground>

2. `brush-highlight`, 事件列表：

| 事件名称                                             | 描述                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.BEFORE_HIGHLIGHT` | 事件触发元素区间范围 (“element-range”) 发生“高亮”之前的钩子     |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.AFTER_HIGHLIGHT`  | 事件触发元素区间范围 (“element-range”) 发生“高亮”之后的钩子     |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.BEFORE_CLEAR`     | 事件触发元素区间范围 (“element-range”) 发生高亮“重置”之前的钩子 |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.AFTER_CLEAR`      | 事件触发元素区间范围 (“element-range”) 发生高亮“重置”之后的钩子 |

示例:

<playground path="dynamic-plots/brush/demo/advanced-brush2.ts" rid="brush-highlight-event"></playground>
