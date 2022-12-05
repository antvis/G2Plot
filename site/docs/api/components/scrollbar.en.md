---
title: Scrollbar
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

<embed src="@/docs/styles/component.md"></embed>

#### Properties - _ScrollbarCfg_

<embed src="@/docs/common/scrollbar.en.md"></embed>

#### Theme setting

You can also config the style of scollbar by theme.

```ts
theme: {
  components: {
    scrollbar: {
      // default style
      default: {
        style: {
          trackColor: 'rgba(0,0,0,0)',
          thumbColor: 'rgba(0,0,0,0.15)',
        },
      },
      // config the style of thumb when hover
      hover: {
        style: {
          thumbColor: 'rgba(0,0,0,0.2)',
        },
      },
    },
  },
}
```