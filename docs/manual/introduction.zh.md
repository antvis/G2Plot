---
title: 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

G2Plot 是一套简单、易用、并具备一定扩展能力和组合能力的统计图表库，基于图形语法理论搭建而成，"G2Plot"中的 G2 即意指图形语法 (the Gramma of Graphics)，同时也致敬了 ggplot2。

## 特性

- 📦 开箱即用、默认好用的高质量统计图表

- 🎨 提炼自企业级产品的视觉语言和设计规范

- 📊 响应式图表：致力于解决图表在任何数据和显示尺寸下的基本可读性问题

- 🔳 图层化设计方法：在 G2Plot 体系下，图表不仅仅只是各不相关的实例，图层概念的引入提供了多图表组合叠联动，共同讲述一个数据故事的可能性

<img alt="图片加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sXqrRrEwFRQAAAAAAAAAAABkARQnAQ" width="800">

## 安装

```bash
$ npm install @antv/g2plot
```

## 使用

<img alt="图片加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*MNTcRJW4pF4AAAAAAAAAAAAAARQnAQ" width="450">

```html
<div id="container"></div>
```

```ts
import { Bar } from '@antv/g2plot';

const data = [
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
];

const bar = new Bar('container', {
  data,
  xField: 'value',
  yField: 'year',
  seriesField: 'year',
});

bar.render();
```

## 开发

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run start

```
