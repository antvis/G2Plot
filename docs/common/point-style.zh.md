| 细分配置 | 类型     | 功能描述   |
| -------- | -------- | ---------- |
| color    | _string \| string[]  \| Function_ | 数据点颜色，也可以支持回调的方式设置，回调参数为 `color: (x, y, series) => string` |
| shape    | _string \| Function_ | 数据点形状，也可以支持回调的方式设置，回调参数为 `shape: (x, y, series) => string` |
| size     | _number \| Function_ | 数据点大小，也可以支持回调的方式设置，回调参数为 `size: (x, y, series) => number` |
| style    | _object \| Function_ | 数据点样式，也可以支持回调的方式设置，回调参数为 `style: (x, y, series) => object` |
| state    | _object_ | 数据点状态样式，设置对应状态的样式。详细参考 [_state_](#state)` |
