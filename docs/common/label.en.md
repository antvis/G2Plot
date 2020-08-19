<!--label样式-->

| 属性名       | 类型     | 介绍                     |
| ------------ | -------- | ------------------------ |
| style        | object   | 坐标轴文本的样式         |
| offset       | number   | label 的偏移量           |
| rotate       | number   | 文本旋转角度             |
| formatter    | Function | 格式化函数               |
| autoRotate   | string   | 是否自动旋转，默认 true  |
| autoHide     | number   | 是否自动隐藏，默认 false |
| autoEllipsis | number   | 是否自动省略，默认 false |

示例代码：

```js
label: {
  style: {
    fill: 'red',
    opacity: 0.6,
    fontSize: 24
  },
  rotate: true
}
```
