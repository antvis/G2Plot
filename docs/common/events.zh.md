在 Chart 和 View 上通过 on 绑定事件、off 移除绑定事件。

```ts
// 绑定事件
chart.on('eName', callback);
// 移除事件
chart.off('eName', callback);
```

#### eName

组成方式：element + ':' + es 。

element 指要绑定的元素类型，例如 `element`、`legend-item`、`axis-label`、`mask`、`plot`、`legend-item-name`、`reset-button` 等。

es 对应 DOM 常见事件，例如 `click`、`mousedown`、`mouseup`、`dblclick`、`mouseenter`、`mouseout`、`mouseover`、`mousemove`、`mouseleave`、`contextmenu` 等，同时支持几个移动端事件：`touchstart`、`touchmove`、`touchend`

```ts
// plot添加点击事件,整个图表区域
chart.on('plot:click', (e) => {
  console.log(e);
});

// element 添加点击事件， element 代指 label|point 等
chart.on('element:click', (e) => {
  console.log(e);
});

// 图例添加点击事件
chart.on('legend-item:click', (e) => {
  console.log(e);
});

// 图例名称添加点击事件
chart.on('legend-item-name:click', (e) => {
  console.log(e);
});

// label 添加点击事件
chart.on('label:click', (e) => {
  console.log(e);
});

// mask 添加点击事件
chart.on('mask:click', (e) => {
  console.log(e);
});

// axis-label 添加点击事件
chart.on('axis-label:click', (e) => {
  console.log(e);
});

// 给 annotation 添加点击事件
chart.on('annotation:click', (e) => {
  console.log(e);
});

// 给 slider 添加点击事件
chart.on('slider:valuechanged', (e) => {
  console.log(e);
});
```
