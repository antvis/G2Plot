---
title: Events
order: 6
---

### Event Types

In G2Plot (inherited G2 events), we divide events into several event types:

#### 1. Basic Events

> It mainly contains basic events of DOM.

- **mouse event**
  - mousedown
  - mousemove
  - mouseup
  - mouseover
  - mouseout
  - mouseenter
  - mouseleave
- **touch event (for mobile)**
  - touchstart
  - touchmove
  - touchend
  - touchcancel
- **drag event**
  - dragenter
  - dragover
  - dragleave
  - drop
- **contextmenu event**
- **dblclick event**

#### 2. Composite Events

In `Basic Events`, as long as these events are triggered in the canvas, they will be executed, but in most scenarios, we need to accurately locate the click of an element, such as:

- When the column of the column plot is clicked
- When a certain item of the legend is hovered
- When the axis label is dbclicked
- and so on...

In this case, we can use the composite event of G2. The composite event rule of G2 is: `component name: basic event name`, namely:

```sign
${componentName}:${eventName}
```

For example, corresponding to the above scenarios, the event name is:

- element:click
- legend-item:mouseover
- axis-label:dbclick
- and so on...

> Among the built-in components of G2Plot(G2), the classification of componentName is very detailed, which can be roughly explained with the following figure.

<!-- 截图来自于 https://riddle.alibaba-inc.com/riddles/e899cd72 -->

![event](https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ZFbySLuhjPsAAAAAAAAAAAAAARQnAQ)

It can be roughly divided into:

- plot
- axis
  - axis-line
  - axis-label
- legend
  - legend-item
- label
- slider
- element
  - interval
  - line
  - area
  - point
  - polygon
  - schema
  - path
  - ...

Then combine these component names and basic event names into a permutation and composite, that is, G2Plot(G2) built-in events.

### Event Listener

`markdown:docs/common/events.en.md`