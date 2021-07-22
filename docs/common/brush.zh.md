#### brush

<description>**optional** _BrushCfg_</description>

刷选交互配置。

##### 配置项

_BrushCfg_ 类型定义如下：

| 属性    | 类型      | 描述                                                                                          |
| ------- | --------- | --------------------------------------------------------------------------------------------- |
| enabled | _boolean_ | 是否开启 brush 刷选交互，默认为：'false'                                                      |
| type    | _string_  | brush 类型: '矩形', 'x 方向' 和 'y 方向'. 默认: 'rect', 目前不支持 polygon 不规则矩形         |
| action  | _string_  | brush 操作，可选项：'filter' \| 'highlight'（对应 '筛选过滤' 和 '高亮强调'）. 默认: 'filter'. |
| mask    | _MaskCfg_ | 刷选交互的蒙层 mask UI 配置                                                                   |

_MaskCfg_ 类型定义如下：

| 属性  | 类型         | 描述      |
| ----- | ------------ | --------- |
| style | _ShapeAttrs_ | mask 样式 |

##### 事件

brush 交互相关事件监听, 示例:

```ts
// 监听 brush filter 事件
plot.on(G2.VIEW_LIFE_CIRCLE.BEFORE_RENDER, (evt) => {
  if (evt.data?.source === G2.BRUSH_FILTER_EVENTS.FILTER) {
    // 可以对 plot.chart 进行访问和操作
    console.log('before brush filter');
  }

  if (evt.data?.source === G2.BRUSH_FILTER_EVENTS.RESET) {
    console.log('before brush filter reset');
  }
});

plot.on(G2.VIEW_LIFE_CIRCLE.AFTER_RENDER, (evt) => {
  if (evt.data?.source === G2.BRUSH_FILTER_EVENTS.FILTER) {
    // 可以对 plot.chart 进行访问和操作
    console.log('after brush filter');
  }

  if (evt.data?.source === G2.BRUSH_FILTER_EVENTS.RESET) {
    console.log('after brush filter reset');
  }
});
```
