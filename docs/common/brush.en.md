#### brush

<description>**optional** _BrushCfg_</description>

Configuration of brush interaction.

**Properties**

Types of _BrushCfg_ are as follows:

| Properties | Type        | Description                                                                                      |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------ |
| enabled    | _boolean_   | 是否开启 brush 刷选交互，默认为：'false'                                                         |
| type       | _string_    | brush 类型，可选项：'rect' \| 'x-rect' \| 'y-rect' \| 'cirlce' \| 'path' (polygon). 默认: 'rect' |
| action     | _string_    | brush action, options: 'filter' \| 'highlight'. Default: 'filter'                                |
| mask       | _MaskCfg_   | Configuration of mask.                                                                           |
| button     | _ButtonCfg_ | Configuration of rRset Button，works when action is equal to 'filter'                            |

Types of _MaskCfg_ are as follows:

| Properties | Type         | Description |
| ---------- | ------------ | ----------- |
| style      | _ShapeAttrs_ | mask 样式   |

Types of _ButtonCfg_ are as follows:

```ts
export type ButtonCfg = {
  /**
   * padding of button
   */
  padding?: number | number[];
  /**
   * text of button
   */
  text?: string;
  /**
   * custom style of text
   */
  textStyle?: {
    default?: ShapeAttrs;
  };
  /**
   * custom style of button
   */
  buttonStyle?: {
    default?: ShapeAttrs;
    active?: ShapeAttrs;
  };
};
```

**Events**

1. List of vents of `brush-filter` interaction,

| Event Name                             | Description                                              |
| -------------------------------------- | -------------------------------------------------------- |
| `G2.BRUSH_FILTER_EVENTS.BEFORE_FILTER` | Hook before brush event to trigger `filter` append       |
| `G2.BRUSH_FILTER_EVENTS.AFTER_FILTER`  | Hook after brush event to trigger `filter` append        |
| `G2.BRUSH_FILTER_EVENTS.BEFORE_RESET`  | Hook before brush event to trigger filter `reset` append |
| `G2.BRUSH_FILTER_EVENTS.AFTER_RESET`   | Hook after brush event to trigger filter `reset` append  |

example:

<Playground path="dynamic-plots/brush/demo/advanced-brush1.ts" rid="brush-filter-event"></playground>

2. List of vents of `brush-highlight` interaction,

| Event Name                                           | Description                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.BEFORE_HIGHLIGHT` | Hook before event to trigger element-range `highlight` append       |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.AFTER_HIGHLIGHT`  | Hook after event to trigger element-range `highlight` append        |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.BEFORE_CLEAR`     | Hook before event to trigger element-range-highlight `reset` append |
| `G2.ELEMENT_RANGE_HIGHLIGHT_EVENTS.AFTER_CLEAR`      | Hook after event to trigger element-range-highlight `reset` append  |

example:

<Playground path="dynamic-plots/brush/demo/advanced-brush2.ts" rid="brush-highlight-event"></playground>
