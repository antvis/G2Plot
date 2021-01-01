---
title: 通用 API
order: 0
redirect_from:
  - /zh/docs/api
---


G2Plot 的核心技术架构非常简单，所有的 Plot 图表都继承于一个基类，基类为所有的图表提供的了通用的 API 方法，而每个具体的可视化图表仅仅处理自己不同的配置项。所以 API 部分，所有图表基本都是一样，除了部分图表（比如：仪表盘、水波图）在 changeData API 上有细微的区别。


### 1. 创建图表实例

所有图表的创建，都是一样的，从 G2Plot 中引入对应的 Plot class，然后创建实例，构造函数有两个参数：

```ts
import { Line } from '@antv/g2plot';

const line = new Line(container', options);
// 1. `container`： 图表渲染的 DOM 容器 id 或者 HTMLElement 实例
// 2. `options`： 图表配置数据，不同的图表功能请参考[各图表配置项](../api/plots/line)
```

创建好的图表实例，都具有两个公开属性：

 - container: HTMLElement： 图表渲染的 DOM 容器。
 - options: PlotOptions： 图表当前的所有全量配置项 options，是有用户传入，以及图表内置的默认配置项合并之后结果。

对于 API，分别罗列图表实例的所有 API 方法。如果按照功能分类，主要可以分成为：生命周期函数、事件、状态量 等 API

### 2. render

```sign
plot.render();
```

通过图表构造方法创建实例之后，调用这个方法，可以将图表渲染到指定的 DOM 容器中。

### 3. update

```sign
plot.update(options: Partial<PlotOptions>);
```

通过这个方法，可以增量的更新图表配置，方法会自动将传入的增量配置合并到当前的配置项中，并自动掉调用 `render` 方法，无需手动调用。

### 4. changeData

```sign
plot.changeData(data: object[] | number);
```

通过这个方法，可以修改图表的数据，并自动重新渲染，大部分图表的数据都是二维数组，而部分图表可能数据结构不一样，比如：

 - 仪表盘、水波图 等指标类的，直接传入更新的 percent 数值
 - 双轴图等复合类图表，直接传入自己的 data 数据结构

 <playground path="dynamic-plots/basic/demo/dynamic-spline.ts" rid="rect"></playground>

### 5. changeSize

```sign
plot.changeSize(width: number, height: number);
```

通过这个方法，手动指定图表的大小。当前如果图表配置 `autoFit` = true 的时候，图表大小会自动跟随容器的大小，只需要使用 css 约定外层 DOM 容器大小，图表即可自动 跟随 resize；如果 `autoFit` = false，那么可以使用 `changeSize` 这个方法，自定义图表的宽高大小。

### 6. destroy

```sign
plot.destroy();
```

完全销毁整个画布，回收所有资源，仅仅保留传入的 DOM container 容器。一般在组件销毁的时候调用，图表销毁之后，不可再次使用。

### 7. on

```sign
plot.on(event: string, callback: Function);
```

多次监听某一个图表事件，并触发一个回调函数。事件机制是直接透传 G2 的事件能力，具体所有事件列表以及回调函数参数可以见 [G2 事件机制](https://g2.antv.vision/zh/docs/api/general/event)。

### 8. once

```sign
plot.once(event: string, callback: Function);
```

监听一次某一个图表事件，并触发一个回调函数，在触发一次之后，自动解除这个事件的监听。

### 9. off

```sign
plot.off(event?: string, callback?: Function);
```

解除事件的监听，可以针对某一个监听函数去解绑；也可以一次解除所有的事件；当然也可以什么参数都不传，解绑所有事件监听。

### 10. setState

```sign
plot.setState(state?: 'active' | 'inactive' | 'selected', condition?: Function, status: boolean = true);
```

状态量是 G2 提供的机制，G2 中设定一个元素具备有三种状态：

 - 'active'
 - 'inactive'
 - 'selected'

通过这个 API 可以根据 condition 条件来过滤元素，并设置这些元素的当前状态。

### 11. getStates

```sign
plot.getStates();
```

获取当前图表所有的状态量信息。