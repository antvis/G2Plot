---
title: 数据标签 - Label
order: 4
---

`markdown:docs/styles/component.md`

🏷️ 在图表中，标签是对当前的一组数据进行的内容标注。包括数据点、拉线、文本数值等元素，根据不同的图表类型选择使用。

🎨 前往墨者学院 [AntV 设计 | 标签 Label](https://www.yuque.com/mo-college/vis-design/roy3am) 查看**设计指引**

#### 配置属性 - _LabelCfg_

`markdown:docs/common/label.zh.md`

#### 标签布局

通过 `label.layout` 可以设置标签布局，来进行标签显示策略的处理。

示例：

```ts
{
  label: {
    layout: [
      // 适用于柱状图的标签遮挡处理，会对遮挡的标签进行隐藏
      { type: 'interval-hide-overlap' }
    ]
  }
}
```

<span style="color:red;">详细文档梳理中</span>
