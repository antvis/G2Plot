---
title: API
---

#### 使用方式

配置数据标签有两种方式：

第一种，传入 `boolean` 设置是否显示数据标签。

```ts
label: false; // 关闭数据标签
```

第二种，传入 _LabelCfg_ 对数据标签进行整体配置。

```ts
label: {
  layout: 'horizontal',
  position: 'right'
}
```

#### 配置属性

<embed src="@/docs/common/label.zh.md"></embed>
