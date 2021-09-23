---
title: Progress plot
order: 20
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### percent

<description>**required** _number_</description>

设置百分比数值 [0-1]，表示进度条图的进度情况。

### Plot Style

#### barWidthRatio

<description>**optional** _number_ _default:_ `0.5`</description>

进度条宽度占比 [0-1]。

#### progressStyle

<description>**optional** _StyleAttr | Function_</description>

进度条样式配置。

`markdown:docs/common/shape-style.en.md`

使用回调方法获得样式配置

```ts
({ percent, type }) => {
  if (type === 'current') {
    return {
      // 进度条百分比部分样式
    };
  }
  return {
    // 进度条背景部分样式
  };
};
```

`markdown:docs/common/color.en.md`

### Plot Component

`markdown:docs/common/component-progress.en.md`
