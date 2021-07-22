#### brush

<description>**optional** _BrushCfg_</description>

Configuration of brush interaction.

##### Properties

Types of _DrillDownCfg_ are as follows:

| Properties | Type      | Description                                                                                |
| ---------- | --------- | ------------------------------------------------------------------------------------------ |
| enabled    | _boolean_ | 是否开启 brush 刷选交互，默认为：'false'                                                   |
| type       | _string_  | brush type, options: '矩形', 'x' and 'y'. Default: 'rect', 'polygon' is not yet supported. |
| action     | _string_  | brush action, options: 'filter' \| 'highlight'. Default: 'filter'                          |
| mask       | _MaskCfg_ | Configuration of mask.                                                                     |

Types of _MaskCfg_ are as follows:

| Properties | Type         | Description |
| ---------- | ------------ | ----------- |
| style      | _ShapeAttrs_ | mask 样式   |

##### Events

Events of brush interaction, example:

```ts
// addEventListener of brush filter
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
