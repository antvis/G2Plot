<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">G2Plot</h1>

<div align="center">

A charting library based on the Grammar of Graphics.

[![Version](https://badgen.net/npm/v/@antv/g2plot)](https://www.npmjs.com/@antv/g2plot)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g2plot.svg)](http://npmjs.com/@antv/g2plot)
![Latest commit](https://badgen.net/github/last-commit/antvis/g2plot)
[![CI Status](https://github.com/antvis/G2Plot/workflows/CI/badge.svg?branch=master)](https://github.com/antvis/G2Plot/actions?query=workflow%3ACI)
[![coverage:?](https://img.shields.io/coveralls/antvis/g2plot/master.svg)](https://coveralls.io/github/antvis/g2plot)

</div>

G2Plot is an interactive and responsive charting library.
Based on [the grammar of graphics](https://github.com/antvis/g2), you can easily make superior statistical charts through a few lines of code.

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*MjhQQLsbWeQAAAAAAAAAAABkARQnAQ" width="200">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*CkSoSpPfWQMAAAAAAAAAAABkARQnAQ" width="200">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ZYmtSqcNDtkAAAAAAAAAAABkARQnAQ" width="200">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gV_JQZVbDWAAAAAAAAAAAABkARQnAQ" width="200">
</div>
<br/>

## Features

### Pretty & Lightweight

With [AntV](https://antv.vision/en) design principles of data visualization, G2Plot provides standard and elegant visual styles as well as neat config options.

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rqI2Qqt0pTwAAAAAAAAAAABkARQnAQ" width="600" />
</div>

### Responsive

G2Plot guarantees the readability of the charts in different sizes and data.

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ifK1TLi_4WoAAAAAAAAAAABkARQnAQ" width="600" />
</div>

### Storytelling

With the feature of _layers_, charts can be grouped, nested or linked to do exploratory analysis and expressive storytelling.

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gd00QaD9110AAAAAAAAAAABkARQnAQ" width="600" />
</div>

## Installation

```bash
$ npm install @antv/g2plot
```

## Usage

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*37siRJftYDIAAAAAAAAAAABkARQnAQ" width="450">
</div>

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

## Contributing

Your contributions are always welcome! Please Do have a look at the [issues](https://github.com/antvis/g2plot/issues) first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/g2plot/blob/master/CONTRIBUTING.md).

## License

MIT

## Links

<img src="https://gw.alipayobjects.com/zos/antfincdn/1yMwFkBvyV/chartcube-logo-cube.svg" width="18"> [ChartCube](https://chartcube.alipay.com/) - Online chart making tool based on G2Plot.
