---
title: 小提琴图
order: 31
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### seriesField

<description>**optional** _string_</description>

分组拆分字段，默认是分组情况，颜色作为视觉通道。

#### kde

<description>**optional** _object_</description>

计算小提琴轮廓线（核密度估计）的核函数算法配置。目前只支持三角核函数。

```ts
type KdeOptions = {
  /** 三角波类型 */
  type: 'triangular';
  /** 最小值，默认为数据中的最小值减去一个固定的阈值。 */
  min?: number;
  /** 最大值，默认为数据中的最大值加上一个固定的阈值。 */
  max?: number;
  /** 采样数量，越大轮廓线越接近真实概率分布函数，默认32。 */
  sampleSize?: number;
  /** 核函数的带宽。带宽越大产生的曲线越平滑（越模糊），带宽越小产生的曲线越陡峭。默认3。 */
  width?: number;
};
```

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### shape

<description>**optional** _'smooth'|'hollow'|'hollow-smooth'_</description>

小提琴形状。
* 默认: 非平滑、实心
* smooth: 平滑
* hollow: 空心
* hollow-smooth: 平滑、空心

#### violinStyle

<description>**optional** _StyleAttr | Function_</description>

小提琴轮廓样式配置。

`markdown:docs/common/shape-style.zh.md`

### box

<description>**optional** _false | object_</description>

内部箱线图配置。设置为 `false` 时不渲染箱线图。

```ts
type BoxOptions = false | {
  /** 箱线图的文案映射 */
  textMap?: {
    /** 最大值文案 */
    max: string;
    /** 最小值文案 */
    min: string;
    /** 下四分位数文案 */
    q1: string;
    /** 上四分位数文案 */
    q3: string;
    /** 中位数文案 */
    median: string;
  };
};
```

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
