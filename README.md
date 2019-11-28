# G2Plot

[![版本](https://badgen.net/npm/v/@antv/g2plot)](https://www.npmjs.com/@antv/g2plot)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g2plot.svg)](http://npmjs.com/@antv/g2plot)
![最近提交](https://badgen.net/github/last-commit/antvis/g2plot)

一套简单、易用、并具备一定扩展能力和组合能力的统计图表库，基于图形语法理论搭建而成，『G2Plot』中的 G2 即意指图形语法 (the Grammar of Graphics)，同时也致敬了 [ggplot2](https://ggplot2.tidyverse.org/)。我们想做的事有三件：（1）使用户不用成为可视化专家也能够轻松制作出优雅美观的图表 （2）保证图表能够经受得起业务的检验，在真实的场景中易用、好用 （3）探索统计图表的更多可能性，使统计图表变得更好玩、更酷。

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*pivcSq450scAAAAAAAAAAABkARQnAQ" width="1000">

## 特性

- 📦 开箱即用、体验优雅的高质量统计图表

  G2Plot 呈现给用户的是一套提炼自企业级产品的视觉语言和设计规范。不仅对图表的整体视觉样式进行了优化，并且针对每一个图表自身的特点，沉淀出一套最佳配置，保证用户能够通过最少的配置制作出优雅、标准的图表。

   <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rqI2Qqt0pTwAAAAAAAAAAABkARQnAQ" width="600" />

- 📊 响应式：让图表更聪明

  在现实的图表应用场景中，一个棘手的难题是图表的展示空间往往并不足够显示图表的数据量，造成极值情况下文本的重叠遮挡、内容无法自适应、内容裁剪等问题。G2Plot 借鉴宽容性设计的思想，在图表的信息密度过高时，对图表辅助信息进行抽稀，保证图表主要信息的展示和基本可读性。

  <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ifK1TLi_4WoAAAAAAAAAAABkARQnAQ" width="600" />

* 🔳 向前一步：会讲故事的图表

  在 G2Plot 体系下，图表不仅仅只是各不相关的实例，图层概念的引入提供了多图表组合、叠加、联动，共同讲述一个数据故事的可能性。未来，我们还将探索统计图表转化信息图的可能性，丰富统计图表的表现能力。

   <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gd00QaD9110AAAAAAAAAAABkARQnAQ" width="600" />

## 安装

```bash
$ npm install @antv/g2plot
```

## 使用

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*37siRJftYDIAAAAAAAAAAABkARQnAQ" width="450" />

```html
<div id="container"></div>
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

const bar = new Bar(document.getElementById('container'), {
  data,
  xField: 'sales',
  yField: 'year',
  colorField: 'year',
});

bar.render();
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
