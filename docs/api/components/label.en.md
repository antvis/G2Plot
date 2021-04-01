---
title: Label
order: 4
---

`markdown:docs/styles/component.md`

🏷️  Label is a content annotation of the current set of data. It includes symbol, label line, text of values and so on, which can be selected according to different chart types.

🎨  Go to [AntV Design | 标签 Label](https://www.yuque.com/mo-college/vis-design/roy3am) of 墨者学院 to learn more about **Design guide**.

#### Properties - _LabelCfg_

`markdown:docs/common/label.en.md`

#### LabelLayout

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
