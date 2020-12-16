<!--label样式-->

| 属性名       | 类型                                                       | 介绍                                                                                       |
| ------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| type         | string                                                     | 当用户使用了自定义的 label 类型，需要声明具体的 type 类型，否则会使用默认的 label 类型渲染（饼图 label 支持 `inner|outer|spider`）|
| offset       | number                                                     | label 的偏移量                                                                             |
| offsetX      | number                                                     | label 相对于数据点在 X 方向的偏移距离                                                      |
| offsetY      | number                                                     | label 相对于数据点在 Y 方向的偏移距离                                                      |
| content      | string \| IGroup \| IShape \| GeometryLabelContentCallback | 展示的文本内容，如果不声明则按照参与映射的第一字段的值进行显示                             |
| style        | object                                                     | label 文本图形属性样式                                                                     |
| autoRotate   | string                                                     | 是否自动旋转，默认 true                                                                    |
| rotate       | number                                                     | 文本旋转角度                                                                               |
| labelLine    | null \| boolean \|object                                   | 用于设置文本连接线的样式属性，null 表示不展示。                                            |
| labelEmit    | boolean                                                    | 只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭  |
| layout       | 'overlap' \| 'fixedOverlap' \| 'limitInShape'              | 文本布局类型，支持多种布局函数组合使用。                                                   |
| position     | 'top' \| 'bottom' \| 'middle' \| 'left' \| 'right'         | 指定当前 label 与当前图形的相对位置                                                        |
| animate      | boolean \| AnimateOption                                   | 动画配置。                                                                                 |
| formatter    | Function                                                   | 格式化函数                                                                                 |
| autoHide     | boolean                                                    | 是否自动隐藏，默认 false                                                                   |
                                                                |

示例代码：

```ts
{
  label: {
    style: {
      fill: 'red',
      opacity: 0.6,
      fontSize: 24
    },
    rotate: true
  }
}
```
