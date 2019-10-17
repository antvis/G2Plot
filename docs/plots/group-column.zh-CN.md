# Grouped-Column 分组柱状图

## 图表故事

分组柱状图是柱状图的扩展形式，适合于在同一个轴上展示不同维度下相同分类的数据。相比于堆叠柱状图，分组柱状图更适合进行不同维度下同一分类的横向数值的比较，但缺点是无法直观的看到各维度总和的对比。

分组柱状图和堆叠柱状图是一对“矛盾”，一方的缺点恰恰是另一方的优点，可以根据具体场景选择使用。

## 数据类型

分组柱状图适合的数据类型为两个**分类字段**(分类字段、分组字段)和一个**连续字段**(数值)。在下面这个例子中，`type`为分类数据字段，`quarter`为分组数据字段，`value`为离散数据字段。

```
const data = [
  {type:'a',quarter:'Q1',value: 100},
  {type:'a',quarter:'Q2',value: 70},
  {type:'a',quarter:'Q3',value: 20},
  {type:'b',quarter:'Q1',value: 10},
  {type:'b',quarter:'Q2',value: 50},
  {type:'b',quarter:'Q3',value: 40},
  {type:'c',quarter:'Q1',value: 30},
  {type:'c',quarter:'Q2',value: 50},
  {type:'c',quarter:'Q3',value: 20},
 ];
```

图表绘制时，每一个分类对应一组柱子，映射到 x 轴，而分组字段决定一组柱子的分布情况，而连续字段决定柱子的高度，映射到 y 轴。

## 图表用法

- **Dont's**

  - 分类数目过多，这将使数据变得难以比较
  - y 轴不以 0 值为起点，将有可能导致柱状图显示错误的比例关系

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

### groupField: string

**reqiured**

数据集中的分组字段名，通过该字段的值，柱子将会被分为多个组，通过颜色进行区分。

---

### 通用图表配置

#### title

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### description

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### width

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### height

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### forceFit

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### padding

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### theme

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

---

### 与基础柱状图相同的配置

#### data: collection

**required** 见[基础柱状图配置](./column.zh-CN.md)

#### xField: string

**reqiured** 见[基础柱状图配置](./column.zh-CN.md)

#### yField: string

**reqiured** 见[基础柱状图配置](./column.zh-CN.md)

#### color: string | string[] | function

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### columnSize: number

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### columnStyle: object | function

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### label

**optional** 见[基础柱状图配置](./column.zh-CN.md)

#### events

**optional**

- 图形事件 见[基础柱状图配置](./column.zh-CN.md)

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
