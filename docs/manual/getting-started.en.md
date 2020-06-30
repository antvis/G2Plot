---
title: Getting Started
order: 1
---

## Installation

### Import by CDN in browser

```html
<!-- import CDN source -->
<script src="https://unpkg.com/@antv/g2plot@latest/dist/g2plot.js"></script>
<script>
  const plot = new G2Plot.Line(document.getElementById('app'), {
    // ...
  });
  plot.render();
</script>
```

```html
<!-- import local source -->
<script src="./g2plot.js"></script>
```

### Import via NPM

```bash
npm install @antv/g2plot --save
```

Use `import` or `require` to import when installation was complete:

```
import { Line } from '@antv/g2plot';
```

## Create your first chart!

Now we're ready to create our first chart by using G2Plot. Let's begin with a basic line Chart.

**step1**: create chart container

```html
<div id="canvas"></div>
```

**step2**: prepare your data

The standard data format in G2Plot is JSON array with JSON object elements.

```js
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
```

**step3**: create and render chart

```js
const linePlot = new Line('canvas', {
  data,
  xField: 'year',
  yField: 'value',
});

linePlot.render();
```

the result：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ulnDT6yfBOkAAAAAAAAAAABkARQnAQ" width="400">

## Add more chart components

The line chart created in former step already had an axis which is belong to the core chart componets. In this stage, in order to enrich chart information, we'll add four componnets to the chart: Title, Description, Data Point on the line and Label.

**step1**: add title

```js
const linePlot = new Line('canvas', {
  // highlight-start
  title: {
    text: 'this is a basic line chart',
  },
  // highlight-end
  data,
  xField: 'year',
  yField: 'value',
});

linePlot.render();
```

**step2**: add description

```js
const linePlot = new Line('canvas', {
  title: {
    text: 'this is a basic line chart',
  },
  // highlight-start
  description: {
    text: 'a breif description of Basic Line Chart',
  },
  // highlight-end
  data,
  xField: 'year',
  yField: 'value',
});
linePlot.render();
```

**step3**: display data points on the line

```js
const linePlot = new Line('canvas', {
  title: {
    visible: true,
    text: 'this is a basic line chart',
  },
  description: {
    visible: true,
    text: 'a breif description of Basic Line Chart',
  },
  data,
  xField: 'year',
  yField: 'value',
  // highlight-start
  point: {
    visible: true,
  },
  // highlight-end
});
linePlot.render();
```

**step4**: add label

```js
const linePlot = new Line('canvas', {
  title: {
    visible: true,
    text: 'this is a basic line chart',
  },
  description: {
    visible: true,
    text: 'a breif description of Basic Line Chart',
  },
  data,
  xField: 'year',
  yField: 'value',
  point: {
    visible: true,
  },
  // highlight-start
  label: {
    visible: true,
  },
  // highlight-end
});
linePlot.render();
```

the result：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sbL3QqAIJdQAAAAAAAAAAABkARQnAQ" width="500">

## Stylize your chart

Till now, the visual style of our chart was defaultly applied by chart theme, not to mention the unformatted text content of labels. In this step, we'll stylize the chart through several steps: changing line color and point style, formatting the numbers on Y axis:

**step1**: change line color

```js
const linePlot = new Line('canvas', {
  title: {
    visible: true,
    text: 'this is a basic line chart',
  },
  description: {
    visible: true,
    text: 'a breif description of Basic Line Chart',
  },
  data,
  xField: 'year',
  yField: 'value',
  color: '#FE740C', // highlight-line
  point: {
    visible: true,
  },
  label: {
    visible: true,
  },
});

linePlot.render();
```

**step2**: change the size and style of data points

```js
const linePlot = new Line('canvas', {
  title: {
    visble: true,
    text: 'this is a basic line chart',
  },
  description: {
    visible: true,
    text: 'a breif description of Basic Line Chart',
  },
  data,
  xField: 'year',
  yField: 'value',
  color: '#FE740C',
  // highlight-start
  point: {
    visible: true,
    size: 5,
    color: 'white',
    style: {
      stroke: '#FE740C',
      lineWidth: 2,
      fillOpacity: 0.6,
    },
  },
  // highlight-end
  label: {
    visible: true,
  },
});
linePlot.render();
```

**step3**: format labels text on Y axis

```js
const linePlot = new Line('canvas', {
  title: {
    visible: true,
    text: 'this is a basic line chart',
  },
  description: {
    visible: true,
    text: 'a breif description of Basic Line Chart',
  },
  data,
  xField: 'year',
  yField: 'value',
  color: '#FE740C',
  point: {
    visible: true,
    size: 5,
    color: 'white',
    style: {
      stroke: '#FE740C',
      lineWidth: 2,
      fillOpacity: 0.6,
    },
  },
  // highlight-start
  yAxis: {
    formatter: (v) => {
      return v + 'k';
    },
  },
  // highlight-end
  label: {
    visible: true,
  },
});
linePlot.render();
```

the result：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*_Z-jR7DOtycAAAAAAAAAAABkARQnAQ" width="500">

### More

In this chapter, we only briefly introduce the installation and basic usage of G2Plot. We hope you'll find more useful or funny features in our project.

Charts configurations: [url](../manual/plots/line)

Advanced features: [url](../manual/advanced/responsive)
