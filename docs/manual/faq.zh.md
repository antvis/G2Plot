---
title: FAQ
order: 7
---

## FAQ

以下整理了一些 G2Plot 社区常见的问题和官方答复，提问或新增 issue 前先看看。

### 怎么设置横轴从 0 开始

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NAvlTZ66qzMAAAAAAAAAAAAAARQnAQ" alt="faq">

横轴的范范是可配置的，在 meta 里面配置即可，range 可选范围是 0~1。

```ts
meta: {
  [xField]: {
    range: [0, 1]
  }
}
```
