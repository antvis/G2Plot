---
title: ConversionTag
order: 8
---

Applicable to base bar charts and base bar charts, the Conversion Rate component allows the user to focus on the rate of change in the data.

#### _ConversionTagCfg_

`markdown:docs/common/conversion-tag.en.md`

#### Events and interactions

<playground path='general/events/demo/conversion-tag-with-link.ts' rid='conversion-tag-events'></playground>

转化标签的图形组成包含 `conversion-tag-arrow` 和 `conversion-tag-text`。同一个图表的转化标签组件都放置于一个 group 下，也就是 `conversion-tag-group`，我们可以通过监听 `conversion-tag-group` 事件来进行一些定制交互。

转化标签携带的原始数据信息包含：上一个图形元素（element）和下一个图形元素（nextElement），可通过下列方式获取：

```ts
plot.on('conversion-tag-group:mouseenter', (evt) => {
  const { element, nextElement } = evt.target?.get('origin');
  // custom by yourself. details of element API, see: https://g2.antv.vision/en/docs/api/general/element
});
```

Example：

<playground path='general/events/demo/conversion-tag-with-link.ts' rid='conversion-tag-events'></playground>
