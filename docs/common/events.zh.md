在 Plot 上通过 `on` 绑定事件、`off` 移除绑定事件。

```sign
// 绑定事件
plot.on('eventName', callback);
// 绑定事件，只触发一次
plot.once('eventName', callback);
// 移除事件
plot.off('eventName', callback);
```

组合方式: `${componentName}:${eventName}`

```ts
// plot 添加点击事件,整个图表区域
plot.on('plot:click', (...args) => {
  console.log(...args);
});

// element 添加点击事件， element 代表图形元素，关于图形元素，请查看：https://g2.antv.vision/zh/docs/manual/concepts/element
plot.on('element:click', (...args) => {
  console.log(...args);
});

// 图例添加点击事件
plot.on('legend-item:click', (...args) => {
  console.log(...args);
});

// 图例名称添加点击事件
plot.on('legend-item-name:click', (...args) => {
  console.log(...args);
});

// 给 tooltip 添加点击事件
plot.on('tooltip:show', (...args) => {
  console.log(...args);
});

plot.on('tooltip:hide', (...args) => {
  console.log(...args);
});

plot.on('tooltip:change', (...args) => {
  console.log(...args);
});

// label 添加点击事件
plot.on('label:click', (...args) => {
  console.log(...args);
});

// mask 添加点击事件
plot.on('mask:click', (...args) => {
  console.log(...args);
});

// axis-label 添加点击事件
plot.on('axis-label:click', (...args) => {
  console.log(...args);
});

// 给 annotation 添加点击事件
plot.on('annotation:click', (...args) => {
  console.log(...args);
});
```
