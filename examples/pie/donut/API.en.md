---
title: API
---

# 配置属性

## 图表容器

- 见 [通用配置](TODO)

## 基础配置

- 见 [饼图配置](TODO)

## 特殊配置

### innerRadius ✨

**可选**, _number_

功能描述： 环图的内半径，原点为画布中心，若不配置内半径，则直接为饼图

### statistic ✨

**可选**, _object_

功能描述： 中心统计指标卡。当 `innerRadius` 配置不为 0 时，生效

用法示例：

```js
{
  statistic: {
    title: {
      formatter: () => 'Total',
    },
  },
  // 同时 可添加 中心统计文本 交互
  interactions: [{ type: 'pie-statistic-active' }]
}
```

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| title  | _boolean_, _object_ | 指标卡标题  |
| &nbsp;&nbsp;&nbsp; formatter | _function_ | 通过回调的方式，设置指标卡标题  |
| &nbsp;&nbsp;&nbsp; style | _object_ | 指标卡标题样式  |
| content | _boolean_, _object_ | 指标卡内容 |
| &nbsp;&nbsp;&nbsp; formatter | _function_ | 通过回调的方式，设置指标卡内容  |
| &nbsp;&nbsp;&nbsp; style | _object_ | 指标卡内容样式  |