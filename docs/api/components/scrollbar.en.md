---
title: Scrollbar
order: 7
---

`markdown:docs/styles/component.md`

#### Configurations (_ScrollbarCfg_)

`markdown:docs/common/scrollbar.en.md`

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