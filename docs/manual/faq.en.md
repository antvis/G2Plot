---
title: FAQ
order: 8
---

## FAQ

Here are the frequently asked questions about G2Plot that you should look up before you ask in the community or create a new issue.

### Browser compatibility

> Due to the condition limit, the lower version limit is only for reference, which does not mean that the lower version cannot be supported. The test was completed in CDN mode. [online Demo](https://lxfu1.github.io/browser-compatibility-of-antv).

|            | Chrome | Edge | Firefox | IE  | Opera | Safari | UC  | 360 speed | 360 safe browser |
| ---------- | :----: | :--: | :-----: | :-: | :---: | :----: | :-: | :-------: | :--------------: |
| **G2Plot** |   40   |  12  |   85    |  9  |  40   |   14   | 6.2 |    12     |       7.3        |

How to add `polyfill` into your project.

- CDN

The following JS is introduced in the HEAD.

```ts
<script src="https://unpkg.com/@babel/polyfill@latest"></script> // optional
<script src="https://unpkg.com/@antv/g2plot@latest"></script>

var line = new G2Plot.Line({
  // ...
});
```

- NPM

Use NPM mode, if there is a compatibility problem please use combination of Babel and `@Babel/polyfill`, reference G2 [.babelrc](https://github.com/antvis/G2/blob/master/.babelrc) and [webpack.config](https://github.com/antvis/G2/blob/master/webpack.config.js), More questions are welcome to join the DingTalk Group.

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

More details to see [API](/en/docs/api/advanced-plots/mix)  of Mix Plot.

### Liquid cannot be with transparently or picture background

Currently the abilities to support `distance` and custom `shape` options disable transparently or picture background technically.

### SeriesField is not supported in Sunburst Plot anymore

In the version bigger than 2.3.20, you can use `hierarchyConfig.field` to replace `seriesField` config. More details to see [API]((/zh/docs/api/plots/sunburst)) of Sunburst Plot.