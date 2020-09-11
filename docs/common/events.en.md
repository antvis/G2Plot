在 Chart 和 View 上通过 on 绑定事件、off 移除绑定事件。

```ts
// 绑定事件
chart.on('eventName', callback);
// 移除事件
chart.off('eventName', callback);
```

#### eventName

组成方式：element + ':' + events 。

element 指要绑定的元素类型，例如 `element`、`legend-item`、`axis-label`、`mask`、`plot`、`legend-item-name`、`reset-button` 等。

events 对应 DOM 常见事件，例如 `click`、`mousedown`、`mouseup`、`dblclick`、`mouseenter`、`mouseout`、`mouseover`、`mousemove`、`mouseleave`、`contextmenu` 等，同时支持几个移动端事件：`touchstart`、`touchmove`、`touchend`

```ts
// plot添加点击事件,整个图表区域
chart.on('plot:click', (...args) => {
  console.log(...args);
});

// element 添加点击事件， element 代指 label|point 等
chart.on('element:click', (...args) => {
  console.log(...args);
});

// 图例添加点击事件
chart.on('legend-item:click', (...args) => {
  console.log(...args);
});

// 图例名称添加点击事件
chart.on('legend-item-name:click', (...args) => {
  console.log(...args);
});

// label 添加点击事件
chart.on('label:click', (...args) => {
  console.log(...args);
});

// mask 添加点击事件
chart.on('mask:click', (...args) => {
  console.log(...args);
});

// axis-label 添加点击事件
chart.on('axis-label:click', (...args) => {
  console.log(...args);
});
```
