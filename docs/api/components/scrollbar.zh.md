---
title: 滚动条 - Scrollbar
order: 3
contributors:
  [
    {
      author: '新茗',
      github: 'visiky',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/KAeYPA3TV0/avatar.jpeg',
    },
  ]
---

`markdown:docs/styles/component.md`

#### 配置属性 - _ScrollbarCfg_

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