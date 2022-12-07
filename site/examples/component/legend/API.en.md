---
title: API
---

#### Usage

There are two ways to configure legends

Method 1, pass in 'Boolean' to set whether to display a legend.

```ts
legend: false; // close legend
```

Method 2, pass in _LegendCfg_ to configure the legend as a whole.

```ts
legend: {
  layout: 'horizontal',
  position: 'right'
}
```

#### Properties

<embed src="@/docs/common/legend-cfg.en.md"></embed>
