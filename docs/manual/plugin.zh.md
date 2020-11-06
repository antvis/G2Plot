---
title: 自定义扩展
order: 6
---

## 自定义图表开发

G2Plot 内置的是业务中使用量占比超过 90% 的常规统计图表，而对于业务产品来说，定制不可避免，这个时候，用户将面临两难：

 - 使用 G2 去开发
 - 建议 G2Plot 增加图表
 - 使用其他图表库、或者自研

而我们作为 G2Plot 开发团队，也陷入一些问题：

1. 这个图表通用吗？是不是太跟随业务了？能直接内置进来吗？
2. 开发者基于 G2 开发了，能开源给其他需要的用户使用吗？

基于这些问题，我们将 G2Plot 基于 G2 开发图表的 Adaptor 模式直接开放出来，业务同学可以基于这一个模式去基于 G2 封装定制图表，如果需要给其他业务复用，直接发 NPM 包，并且在 G2Plot 的模式上去使用。举个简单的例子：

```ts
// 引入自定义扩展图表入口
import { P } from '@antv/g2plot';
// 引入自己开发的扩展图表（二维码）
import { adaptor, defaultOptions } from 'g2plot-qrcode';

const plot = new P('container', {
  data: 'Hello, G2Plot v2!', // 二维码内容
}, adaptor, defaultOptions);

plot.render();
```

以这样的开放扩展开发的方式，既保证业务技术栈的统一，又保证 G2Plot 内置图表的足够通用，也可以无限透出 G2 的能力。


## 如何开发自定义图表

这个章节，将介绍如何开发一个自定义图表。具体的实例在这里：

<playground path="plugin/basic/demo/hill-column.ts"></playground>

主要的流程分成为以下几个步骤：

1. 定义图表默认配置
2. 自定义 adaptor 实现配置到 G2 API 的转换
3. 在 G2Plot 上使用，或者发 NPM 包复用


## 收录自定义图表

> 基于 G2Plot 的`开放开发能力`，定制的第三方图表，弥补 G2Plot 官方通用图表收录标准和数量的限制。插件来源于社区，用于业务生产环境请谨慎筛选。

| 项目名 | 演示 | 描述 | 版本 |
|---|---|---|---|
| [G2Plot-QRCode](https://github.com/hustcc/G2Plot-QRCode) | [前往](https://git.hust.cc/G2Plot-QRCode) | Draw a QRCode with G2Plot. | [![npm](https://img.shields.io/npm/v/g2plot-qrcode.svg)](https://www.npmjs.com/package/g2plot-qrcode) |


## 技术栈封装

> 针对不同技术栈（React、Vue、Angular）的 G2Plot 封装。插件来源于社区，用于业务生产环境请谨慎筛选。

| 项目名 | 技术栈 | 描述 | 版本 |
|---|---|---|---|
| [@ant-design/charts](https://github.com/ant-design/ant-design-charts) | **React** | A React Chart Library based on `@antvis/G2Plot`. | ![npm](https://img.shields.io/npm/v/@ant-design/charts) |
| [React-G2Plot](https://github.com/hustcc/React-G2Plot) | **React** | Unofficial react component wrapper for `@antvis/G2Plot`. | ![npm](https://img.shields.io/npm/v/react-g2plot.svg) |
| [@opd/g2plot-react](https://github.com/open-data-plan/g2plot-react) | **React** | G2Plot for React. | ![npm](https://img.shields.io/npm/v/@opd/g2plot-react.svg) |
| [@opd/g2plot-vue](https://github.com/open-data-plan/g2plot-vue) | **Vue** | G2Plot for Vue 3. | ![npm](https://img.shields.io/npm/v/@opd/g2plot-vue.svg) |