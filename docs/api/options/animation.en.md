---
title: Animation
order: 2
---


#### Usage

<b>图形动画配置有两种方式：</b>

第一种，传入 `false` 设置关闭动画。

```ts
animation: false; // close animation
```

第二种，传入 _AnimateOption_ 对进行动画参数配置。

```ts
animation: {
  // Configuration of the first animation
  appear: {
    animation: 'wave-in', // Effects of the first animation
    duration: 5000, // Duration of the first animation
  },
}
```

#### Configuration（_AnimateOption_）

<embed src="@/docs/common/animate-option.zh.md"></embed>

#### Easing Effects

Easing method used to control apparent motion in animation. Varied easing effects can be found at [d3-ease](https://github.com/d3/d3-ease)

<playground path="dynamic-plots/animation/demo/easing-effects.ts" rid="easing-effect"></playground>

