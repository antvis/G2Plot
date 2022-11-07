---
title: 进度条图
order: 20
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### percent

<description>**required** _number_</description>

设置百分比数值 [0-1]，表示进度条图的进度情况。

### 图形样式

#### barWidthRatio

<description>**optional** _number_ _default:_ `0.5`</description>

进度条宽度占比 [0-1]。

#### progressStyle

<description>**optional** _StyleAttr | Function_</description>

进度条样式配置。

<embed src="@/docs/common/shape-style.zh.md"></embed>

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

<embed src="@/docs/common/color.zh.md"></embed>

### 图表组件

<embed src="@/docs/common/component-progress.zh.md"></embed>
