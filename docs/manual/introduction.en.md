---
title: 简介
order: 0
redirect_from:
  - /en/docs/manual
---

g2plot 是一套简单、易用、并具备一定扩展能力和组合能力的统计图表库，基于图形语法理论搭建而成，"g2plot"中的 g2 即意指图形语法 (the Gramma of Graphics)，同时也致敬了 ggplot2。

## 特性

- 📦 开箱即用、默认好用的高质量统计图表

- 🎨 提炼自企业级产品的视觉语言和设计规范

- 📊 响应式图表：致力于解决图表在任何数据和显示尺寸下的基本可读性问题

- 🔳 图层化设计方法：在 g2plot 体系下，图表不仅仅只是各不相关的实例，图层概念的引入提供了多图表组合叠联动，共同讲述一个数据故事的可能性

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sXqrRrEwFRQAAAAAAAAAAABkARQnAQ" width="800">

## 安装

```bash
$ npm install @antv/g2plot
```

## 使用

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*37siRJftYDIAAAAAAAAAAABkARQnAQ" width="450">

```html
<div id="c1"></div>
```

```js
import { Bar } from '@antv/g2plot';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
];

const barPlot = new Bar('c1', {
  data,
  xField: 'sales',
  yField: 'year',
  colorField: 'year',
});

barPlot.render();
```

## 开发

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run dev

# run demos
$ npm run demos
```
