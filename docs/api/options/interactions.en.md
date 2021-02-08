---
title: Interactions
order: 7
---

Interaction is an important API in G2, and it is a way to load G2's built-in interactions or custom Interaction interactions based on the Interaction syntax form. G2 4.0 has made a big change in terms of interaction. All interaction code is intrusive and is organized through interaction syntax. The way to use the interaction is also very simple, you just need to set the name of the interaction.

In G2Plot, G2's interaction syntax is passed through, as well as some built-in interactions with specific plot bindings.

### Usage

`markdown:docs/common/interactions.en.md`

### Interactions

#### Built-in interactions

更多内置交互列表，见[G2 | 交互](https://g2.antv.vision/zh/docs/api/general/interaction#%E6%89%80%E6%9C%89%E7%9A%84%E4%BA%A4%E4%BA%92%E5%88%97%E8%A1%A8)

| **Interaction name** | **Preivew** | **Comments**|
| --- | --- | --- |
| element-active | ![image](https://gw.alipayobjects.com/zos/antfincdn/UfhBYHY%26Ju/element-active.gif#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=&originHeight=428&originWidth=660&status=done&style=none&width=660)| |
| element-selected | ![image](https://gw.alipayobjects.com/zos/antfincdn/Uws9%24PzRaR/element-selected.gif#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=566) | 可以同时选中多个 element |
| element-single-selected  | ![image](https://gw.alipayobjects.com/zos/antfincdn/p5jPi6yN5b/element-single-selected.gif#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=&originHeight=428&originWidth=660&status=done&style=none&width=660) |  |
| element-highlight | ![image](https://gw.alipayobjects.com/zos/antfincdn/Ii0m6b7GV5/element-highlight.gif#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=&originHeight=428&originWidth=660&status=done&style=none&width=660) |  |
| element-highlight-by-color | ![image](https://gw.alipayobjects.com/zos/antfincdn/TexNaYF8xf/element-highlight-by-color.gif#align=left&display=inline&height=400&margin=%5Bobject%20Object%5D&name=&originHeight=400&originWidth=558&status=done&style=none&width=558)|  |
| element-highlight-by-x | ![image](https://gw.alipayobjects.com/zos/antfincdn/w5PH%26bkRui/element-highlight-by-x.gif#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=566) | 相同横轴字段进行同时高亮。对于柱状图(column) ，横轴字段是 xField，对于条形图(bar) ，横轴字段是 yField。 |
| legend-highlight| ![image](https://gw.alipayobjects.com/zos/antfincdn/6cUSu7yn08/legend-highlight.gif#align=left&display=inline&height=300&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=404) | 图例项高亮，对应的图表元素也高亮|
| axis-label-highlight| ![image](https://gw.alipayobjects.com/zos/antfincdn/48JwSOccLo/axis-label-highlight.gif#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=566)|  |


#### Built-in Action

more details about action, got to see [G2 | interaction feedback](https://g2.antv.vision/zh/docs/api/general/interaction#%E4%BA%A4%E4%BA%92%E5%8F%8D%E9%A6%88-action-%E5%88%97%E8%A1%A8)

| **Action bane** | **Description** | **Apply to** |
| --- | --- | --- |
| element-link-by-color | 用于连接相同颜色的图表元素，一般用于层叠柱状图 | Element |
| element-highlight | 用于设置和取消图表元素的 highlight，支持多个元素一起 highlight  | Element |
| element-single-highlight | 用于设置和取消图表元素的 highlight ，只允许单个元素 highlight。高亮的时候会取消当前激活元素之外的元素的高亮态 | Element |
| element-filter| 图表元素的过滤，支持来自图例（分类和连续）、坐标轴文本的触发 | Element | 

#### Assembel interacions

##### element-link (chart elements of the same colors)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KqE9SpqUKpcAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=248&margin=%5Bobject%20Object%5D" width="339" alt="association" />

使用方式:
```typescript
G2.registerInteraction('element-link', {
  start: [
    {trigger: 'interval:mouseenter', action: 'element-link-by-color:link'}
  ],
  end: [
    {trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink'}
  ]
});

// options
{
  // interactions: [{ type: 'element-link' }],
  // 搭配高亮
  interactions: [{ type: 'element-link' }, { type: 'element-highlight-by-color' }],
}
```

### More

more usages about interactions, go to see [G2 | interactions](https://g2.antv.vision/en/docs/api/general/interaction)
