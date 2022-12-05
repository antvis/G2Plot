---
title: API
---

#### 使用方式

配置图例有两种方式：

第一种，传入 `boolean` 设置是否显示图例。

```ts
legend: false; // 关闭图例
```

第二种，传入 _LegendCfg_ 对图例进行整体配置。

```ts
legend: {
  layout: 'horizontal',
  position: 'right'
}
```

#### 配置属性

<embed src="@/docs/common/legend-cfg.zh.md"></embed>
