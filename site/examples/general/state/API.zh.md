---
title: API
---

## 状态量设置

### 设置状态样式

- 目前支持 4 种状态样式的设置：`default`, `active`, `selected`, `inactive`，详细可见 [G2 state](https://g2.antv.vision/zh/docs/api/general/geometry#geomstate) 文档

使用示例:

```ts
{
  state: {
    selected: {
      animate: { duration: 100, easing: 'easeLinear' },
      style: {
        lineWidth: 2,
        stroke: '#000',
      },
    },
  }
}
```

### 设置状态量

- 设置 Element 的状态。目前开放三种状态：`active`, `selected`, `inactive`

- 参数：

| 属性名      | 类型                               | 描述                                        |
| ----------- | ---------------------------------- | ------------------------------------------- |
| stateName   | _string_                           | 状态名（`active`, `selected`, `inactive`）  |
| callback    | _(data: Data or Datum) => boolean_ | 回调返回参数，决定是否开启 stateStatus 状态 |
| stateStatus | _boolean_                          | 是否开启状态,默认 true（可选）              |

使用示例:

```ts
// 激活 “分类一” 的切片
piePlot.setState('active', (data) => date.type === '分类一');
```

### 获取状态

- 获取当前 Element 上所有的状态对象 _StateObject[]_，返回对象结构：

```typescript
type StateObject = {
  data: Data | Datum;
  state: string;
  geometry: Geometry;
  element: Element;
};
```

使用示例:

```ts
// 激活 “分类一” 的切片
piePlot.getStates();
```
