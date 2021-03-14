---
title: 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

G2Plot 是一套简单、易用、并具备一定扩展能力和组合能力的统计图表库，基于图形语法理论搭建而成，"G2Plot"中的 G2 即意指图形语法 (the Gramma of Graphics)，同时也致敬了 ggplot2。

[![Version](https://badgen.net/npm/v/@antv/g2plot)](https://www.npmjs.com/@antv/g2plot)
[![NPM downloads](https://img.shields.io/npm/dm/@antv/g2plot.svg)](https://npmjs.com/@antv/g2plot)
![Latest commit](https://badgen.net/github/last-commit/antvis/G2Plot)
[![build Status](https://github.com/antvis/G2Plot/workflows/build/badge.svg?branch=master)](https://github.com/antvis/G2Plot/actions?query=workflow%3Abuild)
[![coverage](https://img.shields.io/coveralls/antvis/G2Plot/master.svg)](https://coveralls.io/github/antvis/G2Plot)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2plot.svg)](http://isitmaintained.com/project/antvis/g2plot "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/g2plot.svg)](http://isitmaintained.com/project/antvis/g2plot "Average time to resolve an issue")

## 特性

- 📦 开箱即用、默认好用的高质量统计图表

- 🎨 提炼自企业级产品的视觉语言和设计规范

- 📊 响应式图表：致力于解决图表在任何数据和显示尺寸下的基本可读性问题

- 🔳 图层化设计方法：在 G2Plot 体系下，图表不仅仅只是各不相关的实例，图层概念的引入提供了多图表组合叠联动，共同讲述一个数据故事的可能性

<img alt="图表列表概览" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sXqrRrEwFRQAAAAAAAAAAABkARQnAQ" width="800">

## 安装

```bash
$ npm install @antv/g2plot
```

## 使用

```html
<div id="container"></div>
```

<playground path='bar/basic/demo/basic.ts' rid='basic-bar-demo'></playground>


## 开发

```bash
# install dependences
$ npm install

# run test case
$ npm run test

# build & run website with watching file changes
$ npm run start
```
