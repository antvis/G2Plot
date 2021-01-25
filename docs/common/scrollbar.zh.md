`ShapeAttrs` 类型的请参考[绘图属性](/zh/docs/api/graphic-style)

| 配置项           | 类型                             | 功能描述           |
| --------------- | ----------------                | ------------------ |
| type            | _'horizontal' \| 'vertical'_    | 滚动条类型      |
| width           | _number_                        | 宽度，在 vertical 下生效       |
| height          | _number_                        | 高度，在 horizontal 下生效         |
| padding         | _number \| number[]_            | padding       |
| categorySize    | _number_                        | 对应水平滚动条，为 x 轴每个分类字段的宽度；对于垂直滚动条，为 x 轴每个分类字段的高度 |
| animate         | _boolean_                       | 滚动的时候是否开启动画，默认跟随 view 中 animate 配置        |
