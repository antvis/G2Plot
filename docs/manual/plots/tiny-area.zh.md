---
title: 迷你面积图
order: 0
---

## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _number[]_

功能描述： 设置图表数据源

默认配置： 无

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

**可选**, _boolean_

功能描述： 是否平滑

默认配置： `false`

#### areaStyle

**可选**, _StyleAttr | Function_

功能描述： 面积图形样式

默认配置： 无

`markdown:docs/common/shape-style.zh.md`

#### line

**可选**, _lineStyle_

功能描述： 面积中折线的样式

默认配置： 无

| 细分配置项名称 | 类型                                     | 功能描述 |
| -------------- | ---------------------------------------- | -------- |
| color          | _string \| string[] \| Function_         | 颜色映射 |
| style          | _ShapeStyle \| Function_                 | 样式映射 |
| size           | _number \| [number, number] \| Function_ | 折线宽度 |

#### point

**可选**, _pointStyle_

功能描述： 面积图数据点图形样式

默认配置： 无

`markdown:docs/common/point-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component-tiny.zh.md`
