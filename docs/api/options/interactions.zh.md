---
title: 图表交互
order: 7
---

交互（Interaction）是 G2 中的重要 API，通过这个方法可以加载 G2 内置的交互，或者基于交互语法形式自定义的 Interaction 交互。G2 4.0 在交互方面做了非常大的调整，所有的交互代码都是插入式的，通过交互语法进行组织。使用交互的方式也非常简单，仅需要设置交互的名称即可。

在 G2Plot 中，透传了 G2 的交互语法，同时也内置了一些与具体 plot 绑定的交互。
### 使用方式

`markdown:docs/common/interactions.zh.md`
### 交互
#### 内置交互

更多内置交互列表，见[G2 | 交互](https://g2.antv.vision/zh/docs/api/general/interaction#%E6%89%80%E6%9C%89%E7%9A%84%E4%BA%A4%E4%BA%92%E5%88%97%E8%A1%A8)

| **交互名称** | **预览** | **备注** |
| --- | --- | --- |
| element-active | ![image](https://gw.alipayobjects.com/zos/antfincdn/UfhBYHY%26Ju/element-active.gif#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=&originHeight=428&originWidth=660&status=done&style=none&width=660)| |
| element-selected | ![image](https://gw.alipayobjects.com/zos/antfincdn/Uws9%24PzRaR/element-selected.gif#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=566) | 可以同时选中多个 element |
| element-single-selected  | ![image](https://gw.alipayobjects.com/zos/antfincdn/p5jPi6yN5b/element-single-selected.gif#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=&originHeight=428&originWidth=660&status=done&style=none&width=660) |  |
| element-highlight | ![image](https://gw.alipayobjects.com/zos/antfincdn/Ii0m6b7GV5/element-highlight.gif#align=left&display=inline&height=428&margin=%5Bobject%20Object%5D&name=&originHeight=428&originWidth=660&status=done&style=none&width=660) |  |
| element-highlight-by-color | ![image](https://gw.alipayobjects.com/zos/antfincdn/TexNaYF8xf/element-highlight-by-color.gif#align=left&display=inline&height=400&margin=%5Bobject%20Object%5D&name=&originHeight=400&originWidth=558&status=done&style=none&width=558)|  |
| element-highlight-by-x | ![image](https://gw.alipayobjects.com/zos/antfincdn/w5PH%26bkRui/element-highlight-by-x.gif#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=566) | 相同横轴字段进行同时高亮。对于柱状图(column) ，横轴字段是 xField，对于条形图(bar) ，横轴字段是 yField。 |
| legend-highlight| ![image](https://gw.alipayobjects.com/zos/antfincdn/6cUSu7yn08/legend-highlight.gif#align=left&display=inline&height=300&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=404) | 图例项高亮，对应的图表元素也高亮|
| axis-label-highlight| ![image](https://gw.alipayobjects.com/zos/antfincdn/48JwSOccLo/axis-label-highlight.gif#align=left&display=inline&height=420&margin=%5Bobject%20Object%5D&name=&originHeight=420&originWidth=566&status=done&style=none&width=566)|  |


#### 内置 Action

action 的详细说明，见 [G2 | 交互反馈](https://g2.antv.vision/zh/docs/api/general/interaction#%E4%BA%A4%E4%BA%92%E5%8F%8D%E9%A6%88-action-%E5%88%97%E8%A1%A8)

| **Action 名称** | **说明** | **作用于** |
| --- | --- | --- |
| element-link-by-color | 用于连接相同颜色的图表元素，一般用于层叠柱状图 | Element |
| element-highlight | 用于设置和取消图表元素的 highlight，支持多个元素一起 highlight  | Element |
| element-single-highlight | 用于设置和取消图表元素的 highlight ，只允许单个元素 highlight。高亮的时候会取消当前激活元素之外的元素的高亮态 | Element |
| element-filter| 图表元素的过滤，支持来自图例（分类和连续）、坐标轴文本的触发 | Element | 

#### 组装交互
##### 图表连接 (相同颜色的图表元素)

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

### 更多

更多关于交互的使用说明，见 [G2 文档](https://g2.antv.vision/zh/docs/api/general/interaction)
