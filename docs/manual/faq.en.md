---
title: FAQ
order: 8
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

### How to share a Y axis in DaulAxes plot

You can use `scale.sync` and hide one of the y-axis.

```ts
// 适用于 DualAxes plot
{
  yFields: ['y1', 'y2'],
  meta: {
    y1: { sync: 'y2' },
    y2: { sync: true },
  },
  yAxis: {
    y2: false
  }
}
```

### MultiView Plot of multiple-views is rename to Mix from v2.3.20

More details to see [API](/en/docs/api/mix)  of Mix Plot