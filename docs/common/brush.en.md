#### brush

<description>**optional** _BrushCfg_</description>

Configuration of brush interaction.

Types of _DrillDownCfg_ are as follows:

| Properties | Type            | Description                      |
| ------- | --------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| enabled | _boolean_ | 是否开启 brush 刷选交互，默认为：'false' |
| type    | _string_ | brush type, options: '矩形', 'x' and 'y'. Default: 'rect', 'polygon' is not yet supported. |
| action  | _string_  | brush action, options: 'filter' \| 'highlight'. Default: 'filter', only works when type is 'rect' |
| mask    | _MaskCfg_ | Configuration of mask.         |

Types of _MaskCfg_ are as follows:

| Properties | Type            | Description                      |
| ----- | ------------ | --------- |
| style | _ShapeAttrs_ | mask 样式 |
