---
title: Introduction
order: 0
redirect_from:
  - /en/docs/manual
---

G2Plot is an interactive and responsive charting library based on the grammar of graphics, which enables users to generate high quality statistical charts through a few lines of code easily. G2 in "G2Plot" means the grammar of graphics and pays homage to ggplot2.

## Features

- 📦 Pretty and high-quality charts out of box

- 🎨 Visual language and design specification extracted from enterprise products

- 📊 Responsive charts

- 🔳 Story-telling charts

<img alt="Image loading failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sXqrRrEwFRQAAAAAAAAAAABkARQnAQ" width="800">

## Installation

```bash
$ npm install @antv/g2plot
```

## Usage

<img alt="Image loading failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*MNTcRJW4pF4AAAAAAAAAAAAAARQnAQ" width="450">

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

## Development

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run start

```
