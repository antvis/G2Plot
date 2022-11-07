---
title: 图形动画
order: 2
---

#### 使用方式

<b>图形动画配置有两种方式：</b>

第一种，传入 `false` 设置关闭动画。

```ts
animation: false; // 关闭动画
```

第二种，传入 _AnimateOption_ 对进行动画参数配置。


```ts
animation: {
  // 配置图表第一次加载时的入场动画
  appear: {
    animation: 'wave-in', // 动画效果
    duration: 5000,  // 动画执行时间
  },
}
```

#### 配置项（_AnimateOption_）

<embed src="@/docs/common/animate-option.zh.md"></embed>

#### 缓动效果 (_Easing Effects_)

`easing` 用来控制动画中的缓动效果，更多的缓动效果可以参见 [d3-ease](https://github.com/d3/d3-ease)。

<playground path="dynamic-plots/animation/demo/easing-effects.ts" rid="easing-effect"></playground>


