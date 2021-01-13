<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">G2Plot</h1>

<div align="center">

A charting library based on the Grammar of Graphics.

[![Version](https://badgen.net/npm/v/@antv/g2plot)](https://npmjs.com/@antv/g2plot)
[![NPM downloads](https://img.shields.io/npm/dm/@antv/g2plot.svg)](https://npmjs.com/@antv/g2plot)
![Latest commit](https://badgen.net/github/last-commit/antvis/G2Plot)
[![build Status](https://github.com/antvis/G2Plot/workflows/build/badge.svg?branch=master)](https://github.com/antvis/G2Plot/actions?query=workflow%3Abuild)
[![coverage](https://img.shields.io/coveralls/antvis/G2Plot/master.svg)](https://coveralls.io/github/antvis/G2Plot)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2plot.svg)](http://isitmaintained.com/project/antvis/g2plot "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/g2plot.svg)](http://isitmaintained.com/project/antvis/g2plot "Average time to resolve an issue")

</div>

G2Plot is an interactive and responsive charting library.
Based on [the grammar of graphics](https://github.com/antvis/g2), you can easily make superior statistical charts through a few lines of code.

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sXqrRrEwFRQAAAAAAAAAAABkARQnAQ" width="800">
</div>
<br/>

## Features

### Pretty & Lightweight

With [AntV](https://antv.vision/en) design principles of data visualization, G2Plot provides standard and elegant visual styles as well as neat config options.

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rqI2Qqt0pTwAAAAAAAAAAABkARQnAQ" />

### Responsive

G2Plot guarantees the readability of the charts in different sizes and data.

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ifK1TLi_4WoAAAAAAAAAAABkARQnAQ" />

### Storytelling

With the feature of _layers_, charts can be grouped, nested or linked to do exploratory analysis and expressive storytelling.

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gd00QaD9110AAAAAAAAAAABkARQnAQ" />

## Installation

```bash
$ npm install @antv/g2plot
```

## Usage

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*37siRJftYDIAAAAAAAAAAABkARQnAQ" />

```html
<div id="container"></div>
```

```ts
import { Bar } from '@antv/g2plot';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
];

const bar = new Bar('container', {
  data,
  xField: 'sales',
  yField: 'year',
  seriesField: 'year',
});

bar.render();
```

## Contributing

Your contributions are always welcome! Please Do have a look at the [issues](https://github.com/antvis/g2plot/issues) first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/g2plot/blob/master/CONTRIBUTING.md).

## Contact us

钉钉群组号码: 30233731

<img src="https://gw.alipayobjects.com/zos/antfincdn/9sHnl5k%26u4/dingdingqun.png" width="200" height="266" />

## Links

<img src="https://gw.alipayobjects.com/zos/antfincdn/1yMwFkBvyV/chartcube-logo-cube.svg" width="18"> [ChartCube](https://chartcube.alipay.com/) - Online chart making tool based on G2Plot.

## License

MIT
