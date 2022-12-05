#### brush

<description>**optional** _BrushCfg_</description>

刷选交互配置。

**配置项**

_BrushCfg_ 类型定义如下：

| 属性    | 类型      | 描述                                                                                          |
| ------- | --------- | --------------------------------------------------------------------------------------------- |
| enabled | _boolean_ | 是否开启 brush 刷选交互，默认为：'false'                                                      |
| type    | _string_  | brush 类型，可选项：'rect' \| 'x-rect' \| 'y-rect' \| 'cirlce' \| 'path'（不规则矩形）. 默认: 'rect'         |
| action  | _string_  | brush 操作，可选项：'filter' \| 'highlight'（对应 '筛选过滤' 和 '高亮强调'）. 默认: 'filter'. |
| mask    | _MaskCfg_ | 刷选交互的蒙层 mask UI 配置                                                                   |
| button    | _ButtonCfg_ | 刷选交互的重置按钮配置，只在 action 为 filter 的时候，生效                                                                   |

_MaskCfg_ 类型定义如下：

| 属性  | 类型         | 描述      |
| ----- | ------------ | --------- |
| style | _ShapeAttrs_ | mask 样式 |

_ButtonCfg_ 类型定义如下：

```ts
export type ButtonCfg = {
  /**
   * 文本与按钮边缘的间距
   */
  padding?: number | number[];
  /**
   * 按钮文本
   */
  text?: string;
  /**
   * 自定义文本样式
   */
  textStyle?: {
    default?: ShapeAttrs;
  };
  /**
   * 自定义按钮样式
   */
  buttonStyle?: {
    default?: ShapeAttrs;
    active?: ShapeAttrs;
  };
};
```

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

<Playground path="dynamic-plots/brush/demo/advanced-brush1.ts" rid="brush-filter-event"></playground>

2. `brush-highlight`, 事件列表：

| 事件名称                                             | 描述                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.BEFORE_HIGHLIGHT` | 事件触发元素区间范围 (“element-range”) 发生“高亮”之前的钩子     |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.AFTER_HIGHLIGHT`  | 事件触发元素区间范围 (“element-range”) 发生“高亮”之后的钩子     |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.BEFORE_CLEAR`     | 事件触发元素区间范围 (“element-range”) 发生高亮“重置”之前的钩子 |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.AFTER_CLEAR`      | 事件触发元素区间范围 (“element-range”) 发生高亮“重置”之后的钩子 |

示例:

<Playground path="dynamic-plots/brush/demo/advanced-brush2.ts" rid="brush-highlight-event"></playground>
