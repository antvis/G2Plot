__*ShapeAttrs*__ 类型的请参考[绘图属性](/zh/docs/api/graphic-style)

| 配置项           | 类型                             | 功能描述           |
| --------------- | ----------------                | ------------------ |
| type            | _'horizontal' \| 'vertical'_    | 滚动条类型      |
| width           | _number_                        | 宽度，在 vertical 下生效       |
| height          | _number_                        | 高度，在 horizontal 下生效         |
| padding         | _number \| number[]_            | padding       |
| categorySize    | _number_                        | 对应水平滚动条，为 x 轴每个分类字段的宽度；对于垂直滚动条，为 x 轴每个分类字段的高度 |
| style         | _ScrollbarStyle_                       | 滚动条默认样式的设置       |
| animate         | _boolean_                       | 滚动的时候是否开启动画，默认跟随 view 中 animate 配置        |

__*ScrollbarStyle*__ 类型如下：

| 配置项           | 类型              | 功能描述            |
| --------------- | ---------------- | ------------------ |
| trackColor        | _string_    | 滚动条滑道填充色      |
| thumbColor        | _number_    | 滚动条滑块填充色      |
| lineCap           | _string_    | 决定滚动条末端绘制形状，同 Canvas lineCap 属性。     |