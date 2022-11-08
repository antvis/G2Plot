---
title: 小提琴图
order: 31
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.zh.md"></embed>

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

<embed src="@/docs/common/meta.zh.md"></embed>

小提琴图内置箱线图配置。箱线图的统计数据分别为：

- high: 数据中的最大值，作为箱线图的最高点；
- low: 数据中的最小值，作为箱线图的最低点；
- q3: 上四分位，即 25% 的数据大于该数，作为箱线图中箱子的高点；
- q1: 下四分位，即 25% 的数据小于该数，作为箱线图中箱子的低点；
- median: 数据的中位数，在箱线图中用圆点表示。

可以通过 `meta` 来设置字段的元信息

<Playground path="more-plots/violin/demo/tooltip.ts" rid="tooltip-meta"></playground>

### 图形样式

#### box

<description>**optional** _boolean | BoxOption_</description>

是否展示内部箱线图。默认展示，可对箱线图进行配置，配置类型为：_BoxOption_。设置为 'false' 关闭箱线图。

```ts
type BoxOption = {
  // 箱线图的状态样式设置，详细参考: state
  state: State;
}
```

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

<embed src="@/docs/common/shape-style.zh.md"></embed>

<embed src="@/docs/common/color.zh.md"></embed>

#### state

<description>**可选** _object_</description>

<embed src="@/docs/common/state-style.zh.md"></embed>

### 图表组件

<embed src="@/docs/common/common-component.zh.md"></embed>

### 图表事件

<embed src="@/docs/common/events.zh.md"></embed>

### 图表方法

<embed src="@/docs/common/chart-methods.zh.md"></embed>

### 图表主题

<embed src="@/docs/common/theme.zh.md"></embed>
