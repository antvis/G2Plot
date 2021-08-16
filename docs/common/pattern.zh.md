#### pattern ✨

<description>**optional** _object | Function_</description>

设置图形的贴图样式。

- 配置项：由`type`和`cfg`组成，`type`目前包括三种类型：`dot`、`line`、`square`，`cfg`为可选项。
- 特点：`pattern`会覆盖当前图形设置的`style`样式(如 pieStyle、columnStyle 等)。
- 使用方式：可通过 配置项(PatternOption) 或传入 CanvasPattern 对象 的方式给图表的所有图形设置统一的贴图样式，还提供了 callback 的方式给对应的图形设置样式。此外，提供了 getCanvasPattern 方法传入 PatternOption 配置来创建 pattern，以修改 Legend、Tooltip Marker 样式[Demo](/zh/examples/plugin/pattern#legend-marker-with-pattern)

pattern 的类型定义如下：

```plain
PatternAttr =
  | CanvasPattern
  | PatternOption
  | ((datum: Datum, color: string /** inherit color */) => PatternOption | CanvasPattern);
```

具体用法：

```ts
// 给图形设置统一贴图
{
   pattern: {
    type: 'dot',
    cfg: {
      size: 4,
      padding: 4,
      rotation: 0,
      fill: '#FFF',
      isStagger: true,
    },
  },
}
// 给图形分别设置贴图
{
  pattern: ({type}, color) =>{
    if(type ==='分类一') {
      return { 
        type: 'dot',
        cfg: {
          backgroundColor: color, // 继承主题颜色
        }
      }
    } else if(type ==='分类二') {
      return {
         type: 'square',
         cfg: {
           backgroundColor: 'pink', // 自定义颜色
         }
       }
    } else if(type ==='分类三') {
      return { 
        type: 'line' 
      }
    }
  },
}
```
<!--各个 pattern 的配置项-->

pattern 共有的 cfg 配置项

| 属性名        | 类型            | 介绍                |
| ------------- | --------------- | ---------------- |
| backgroundColor   | _string_         | 贴图的背景色            |
| fill     | _string_         | 贴图元素的填充色      |
| fillOpacity   |   _number_ | 贴图元素填充的透明度 |
| stroke   | _string_         | 贴图元素的描边色          |
| strokeOpacity       | _number_         | 贴图元素的描边透明度色    |
| lineWidth   | _number_         | 贴图元素的描边粗细        |
| opacity | _number_         | 贴图整体的透明度              |
| rotation    | _number_         | 贴图整体的旋转角度             |

dotPattern 额外的 cfg 配置项

| 属性名        | 类型            | 介绍                |
| ------------- | --------------- | ---------------- |
| size          | _number_         | 圆点的大小，默认为`4`  |
| padding          | _number_         | 圆点之间的间隔，默认为`2` |
| isStagger        | _boolean_         | 圆点之间是否交错，默认为`true`    |

linePattern 额外的 cfg 配置项

| 属性名        | 类型            | 介绍                |
| ------------- | --------------- | ---------------- |
| spacing          | _number_         | 两条线之间的距离，默认为`4`  |

squarePattern 额外的 cfg 配置项

| 属性名        | 类型            | 介绍                |
| ------------- | --------------- | ---------------- |
| size          | _number_         | 矩形的大小，默认为`5`  |
| padding          | _number_         | 矩形之间的间隔，默认为`0` |
| isStagger        | _boolean_         | 矩形之间是否交错，默认为`true`    |