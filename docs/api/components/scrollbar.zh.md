---
title: 滚动条
order: 7
---

`markdown:docs/styles/component.md`

#### 配置项 (_ScrollbarCfg_)

`markdown:docs/common/scrollbar.zh.md`

#### 主题设置

还可以通过主题来设置滚动条的样式。

```ts
theme: {
  components: {
    scrollbar: {
      // 默认样式
      default: {
        style: {
          trackColor: 'rgba(0,0,0,0)',
          thumbColor: 'rgba(0,0,0,0.15)',
        },
      },
      // hover 时，可以设置滑块样式
      hover: {
        style: {
          thumbColor: 'rgba(0,0,0,0.2)',
        },
      },
    },
  },
}
```