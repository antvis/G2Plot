---
title: Common API
order: 0
redirect_from:
  - /en/docs/api
---

The core technology architecture of G2Plot is very simple. All plots are inherited from a base class. The base class provides a common API method for all plots, and each specific visualization plot only processes its own configuration items. So all plots basically share the common API, except for some plots (such as Gauge and Liquid) that have subtle differences in the changedata API.

### 1. create a plot instance

The creation of all plots is the same. First, import the corresponding plot class from G2Plot. Then create a plot instance. The constructor has two parameters.

```ts
import { Line } from '@antv/g2plot';

const line = new Line(container', options);
// 1. `container`: The DOM container ID or HtmlElement instance rendered by plot
// 2. `options`: Plot configuration options
```

The created plot instance has two public properties:

- container: HTMLElement
- options: PlotOptions

For the API, list all the API methods of the diagram instance separately. If classified by function, it can be divided into: life cycle function, event, status and so on.

### 2. render

```sign
plot.render();
```

After creating an instance through the plot constructor, this method can be called to render the plot to the specified DOM container.

### 3. update

```sign
plot.update(options: Partial<PlotOptions>);
```

With this method, the plot configuration can be updated incrementally. The method will automatically merge the incremental configuration into the current configuration item, and automatically call the 'render' method without manually calling it.

### 4. changeData

```sign
plot.changeData(data: object[] | number);
```

Through this method, you can modify the data of the plot and re-render the plot automatically. Most of the plot data is a two-dimensional array, and some plots may have different data structures, such as:

- Gauge、Liquid, which accept the updated percent value
- Dual Axes, which has its own data structure

<playground path="dynamic-plots/basic/demo/dynamic-spline.ts" rid="rect"></playground>

### 5. changeSize

```sign
plot.changeSize(width: number, height: number);
```

With this method, you can manually specify the size of the plot. If the plot is configured with `autofit` = true, the plot size will automatically adapt the size of the container. You only need to use CSS to specify the size of the outer DOM container, and the plot can automatically resize. If `autofit` = false, you can use the method `changeSize` to customize the width and height of the plot.

### 6. destroy

```sign
plot.destroy();
```

Destroy the entire canvas completely, recycle all resources, and keep only the DOM container. It is usually called when the component is destroyed. After the plot is destroyed, it cannot be used again.

### 7. on

```sign
plot.on(event: string, callback: Function);
```

Keep listening to a plot event and trigger a callback function. The event mechanism is transimitted transparently through G2 events. See [G2 event mechanism](https://g2.antv.vision/zh/docs/api/general/event) for all event lists and callback function parameters.

### 8. once

```sign
plot.once(event: string, callback: Function);
```

Listen to a plot event once and trigger a callback function. After triggering, it is automatically deactivated.

### 9. off

```sign
plot.off(event?: string, callback?: Function);
```

To disable event listening, you can unbind a listening function, or you can disable all events at once. You can also unbind all events with passing no parameters.

### 10. setState

```sign
plot.setState(state?: 'active' | 'inactive' | 'selected', condition?: Function, status: boolean = true);
```

The status is a mechanism provided by G2. An element in G2 has three states:

- 'active'
- 'inactive'
- 'selected'

Through this API, you can filter elements based on `condition` and set the current state of these elements.

### 11. getStates

```sign
plot.getStates();
```

Get all status information of the current plot.

### 12. addAnnotation

```sign
plot.addAnnotation(annotations: Annotation[]) => void;
```

批量为当前图表增加图表标注。通过 id 匹配，如果匹配成功，则更新，匹配不成功则增加。

 <!-- <playground path="dynamic-plots/basic/demo/dynamic-spline.ts" rid="addAnnotation"></playground> -->

### 13. removeAnnotation

```sign
plot.removeAnnotation(annotations: { id: string }[]) => void;
```

批量为当前图表删除图表标注。通过 id 匹配，如果匹配成功，则删除。