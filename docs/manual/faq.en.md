---
title: FAQ
order: 7
---

## FAQ

Here are the frequently asked questions about G2Plot that you should look up before you ask in the community or create a new issue.

### How do I set the horizontal axis to start at 0

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NAvlTZ66qzMAAAAAAAAAAAAAARQnAQ" alt="faq">

Horizontal axis is configurable, which can be configured in meta. The optional range is 0~1.

```ts
meta: {
  [xField]: {
    range: [0, 1]
  }
}
```
