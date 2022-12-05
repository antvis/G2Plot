| 细分配置 | 类型     | 功能描述   |
| -------- | -------- | ---------- |
| color    | _string \| string[]  \| Function_ | 数据点颜色，也可以支持回调的方式设置，回调参数为 `color: (datum: object) => string`  |
| shape    | _string \| Function_ | 数据点形状，也可以支持回调的方式设置，回调参数为 `shape: (datum: object) => string` |
| size     | _number \| Function_ | 数据点大小，也可以支持回调的方式设置，回调参数为 `size: (datum: object) => number` |
| style    | _object \| Function_ | 数据点样式，也可以支持回调的方式设置，回调参数为 `style: (datum: object) => object` |
| state    | _object_ | 数据点状态样式，设置对应状态的样式。详细参考 [_state_](#state) |
