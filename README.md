<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">G2Plot</h1>

<div align="center">

基于图形语法（the Grammar of Graphics）的图表库。

[![Version](https://badgen.net/npm/v/@antv/g2plot)](https://npmjs.com/@antv/g2plot)
[![NPM downloads](https://img.shields.io/npm/dm/@antv/g2plot.svg)](https://npmjs.com/@antv/g2plot)
![Latest commit](https://badgen.net/github/last-commit/antvis/G2Plot)
[![build Status](https://github.com/antvis/G2Plot/workflows/build/badge.svg?branch=master)](https://github.com/antvis/G2Plot/actions?query=workflow%3Abuild)
[![coverage](https://img.shields.io/coveralls/antvis/G2Plot/master.svg)](https://coveralls.io/github/antvis/G2Plot)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2plot.svg)](http://isitmaintained.com/project/antvis/g2plot "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/g2plot.svg)](http://isitmaintained.com/project/antvis/g2plot "Average time to resolve an issue")

<p align="center">
  <a href="https://g2plot.antv.vision/en">网站</a> •
  <a href="https://g2plot.antv.vision/en/docs/manual/getting-started">快速开始</a> •
  <a href="https://www.yuque.com/antv/g2plot">博客</a> •
  <a href="https://github.com/antvis/theme-set">AntV ThemeSet</a>
</p>

</div>

一套简单、易用、并具备一定扩展能力和组合能力的统计图表库，基于图形语法理论搭建而成，『G2Plot』中的 G2 即意指图形语法 (the Grammar of Graphics)，同时也致敬了 [ggplot2](https://ggplot2.tidyverse.org/)。我们想做的事有三件：

1. 使用户不用成为可视化专家也能够轻松制作出优雅美观的图表。
2. 保证图表能够经受得起业务的检验，在真实的场景中易用、好用。
3. 探索统计图表的更多可能性，使统计图表变得更好玩、更酷。

<div align="center">
  <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*sXqrRrEwFRQAAAAAAAAAAABkARQnAQ" width="800">
</div>

## ✨ 特性

### 📦 开箱即用、体验优雅的高质量统计图表

G2Plot 呈现给用户的是一套提炼自企业级产品的视觉语言和设计规范。不仅对图表的整体视觉样式进行了优化，并且针对每一个图表自身的特点，沉淀出一套最佳配置，保证用户能够通过最少的配置制作出优雅、标准的图表。

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rqI2Qqt0pTwAAAAAAAAAAABkARQnAQ" width="600" />
</div>

### 📊 响应式：让图表更聪明

在现实的图表应用场景中，一个棘手的难题是图表的展示空间往往并不足够显示图表的数据量，造成极值情况下文本的重叠遮挡、内容无法自适应、内容裁剪等问题。G2Plot 借鉴宽容性设计的思想，在图表的信息密度过高时，对图表辅助信息进行抽稀，保证图表主要信息的展示和基本可读性。

<div align="center">
  <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ifK1TLi_4WoAAAAAAAAAAABkARQnAQ" width="600" />
</div>

### 🔳 向前一步：会讲故事的图表

在 G2Plot 体系下，图表不仅仅只是各不相关的实例，图层概念的引入提供了多图表组合、叠加、联动，共同讲述一个数据故事的可能性。未来，我们还将探索统计图表转化信息图的可能性，丰富统计图表的表现能力。

<div align="center">
  <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gd00QaD9110AAAAAAAAAAABkARQnAQ" width="600" />
</div>

## 📦 安装

```bash
$ npm install @antv/g2plot
```

## 🔨 使用

<div align="center">
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*37siRJftYDIAAAAAAAAAAABkARQnAQ" width="450" />
</div>

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

## 🤝 参与贡献

我们非常欢迎你的贡献！无论是 issue 还是 PR。

反馈问题请先阅读 [issues](https://github.com/antvis/g2plot/issues)。

提交代码请遵循 [贡献指引](https://github.com/antvis/g2plot/blob/master/CONTRIBUTING.md)。

感谢下面这些贡献者 ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/visiky"><img src="https://avatars.githubusercontent.com/u/15646325?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Visiky</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=visiky" title="Code">💻</a></td>
    <td align="center"><a href="https://hust.cc/"><img src="https://avatars.githubusercontent.com/u/7856674?v=4?s=32" width="32px;" alt=""/><br /><sub><b>hustcc</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=hustcc" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lxfu1"><img src="https://avatars.githubusercontent.com/u/31396322?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Joel Alan</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=lxfu1" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/liuzhenying"><img src="https://avatars.githubusercontent.com/u/11748654?v=4?s=32" width="32px;" alt=""/><br /><sub><b>刘珍莹</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=liuzhenying" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zqlu"><img src="https://avatars.githubusercontent.com/u/1142242?v=4?s=32" width="32px;" alt=""/><br /><sub><b>zqlu</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=zqlu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/arcsin1"><img src="https://avatars.githubusercontent.com/u/13724222?v=4?s=32" width="32px;" alt=""/><br /><sub><b>arcsin1</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=arcsin1" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/zhangzhonghe"><img src="https://avatars.githubusercontent.com/u/38434641?v=4?s=32" width="32px;" alt=""/><br /><sub><b>被雨水过滤的空气</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=zhangzhonghe" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/yp0413150120"><img src="https://avatars.githubusercontent.com/u/24318174?v=4?s=32" width="32px;" alt=""/><br /><sub><b>banli</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=yp0413150120" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/BBSQQ"><img src="https://avatars.githubusercontent.com/u/35586469?v=4?s=32" width="32px;" alt=""/><br /><sub><b>xi li</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=BBSQQ" title="Code">💻</a></td>
    <td align="center"><a href="https://blog.csdn.net/weixin_42628594"><img src="https://avatars.githubusercontent.com/u/42288791?v=4?s=32" width="32px;" alt=""/><br /><sub><b>DarrenPei</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=DarrenPei" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pearmini"><img src="https://avatars.githubusercontent.com/u/49330279?v=4?s=32" width="32px;" alt=""/><br /><sub><b>MiniPear</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=pearmini" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/connono"><img src="https://avatars.githubusercontent.com/u/36756846?v=4?s=32" width="32px;" alt=""/><br /><sub><b>connono</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=connono" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/yujs"><img src="https://avatars.githubusercontent.com/u/16610138?v=4?s=32" width="32px;" alt=""/><br /><sub><b>于向前</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=yujs" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/afc163"><img src="https://avatars.githubusercontent.com/u/507615?v=4?s=32" width="32px;" alt=""/><br /><sub><b>afc163</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=afc163" title="Code">💻</a></td>
    <td align="center"><a href="http://www.mjul.com/"><img src="https://avatars.githubusercontent.com/u/142868?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Martin Jul</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=mjul" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jinhuiWong"><img src="https://avatars.githubusercontent.com/u/23117130?v=4?s=32" width="32px;" alt=""/><br /><sub><b>jhwong</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=jinhuiWong" title="Code">💻</a></td>
    <td align="center"><a href="https://kingsongao.com/"><img src="https://avatars.githubusercontent.com/u/6930280?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Jingsong Gao</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=kagawagao" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MrSmallLiu"><img src="https://avatars.githubusercontent.com/u/26038018?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Mr小刘</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=MrSmallLiu" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ntscshen"><img src="https://avatars.githubusercontent.com/u/21041458?v=4?s=32" width="32px;" alt=""/><br /><sub><b>ntscshen</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=ntscshen" title="Code">💻</a></td>
    <td align="center"><a href="https://juejin.cn/user/3491704660305111"><img src="https://avatars.githubusercontent.com/u/12762626?v=4?s=32" width="32px;" alt=""/><br /><sub><b>yiminanci</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=guonanci" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ai-qing-hai"><img src="https://avatars.githubusercontent.com/u/65594180?v=4?s=32" width="32px;" alt=""/><br /><sub><b>ai-qing-hai</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=ai-qing-hai" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/xrkffgg"><img src="https://avatars.githubusercontent.com/u/29775873?v=4?s=32" width="32px;" alt=""/><br /><sub><b>xrkffgg</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=xrkffgg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DawnLck"><img src="https://avatars.githubusercontent.com/u/12195307?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Dawnlck</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=DawnLck" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/CarisL"><img src="https://avatars.githubusercontent.com/u/13416424?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Karis</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=CarisL" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://gine.me/"><img src="https://avatars.githubusercontent.com/u/6588202?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Mayne</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=mayneyao" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Plortinus"><img src="https://avatars.githubusercontent.com/u/20693993?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Plortinus</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=Plortinus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/csjkevin"><img src="https://avatars.githubusercontent.com/u/17211870?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Shanjie Chen</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=csjkevin" title="Code">💻</a></td>
    <td align="center"><a href="https://doocs.github.io/"><img src="https://avatars.githubusercontent.com/u/21008209?v=4?s=32" width="32px;" alt=""/><br /><sub><b>Yang Libin</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=yanglbme" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/beewolf233"><img src="https://avatars.githubusercontent.com/u/24711525?v=4?s=32" width="32px;" alt=""/><br /><sub><b>beewolf233</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=beewolf233" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lqzhgood"><img src="https://avatars.githubusercontent.com/u/9134671?v=4?s=32" width="32px;" alt=""/><br /><sub><b>lqzhgood</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=lqzhgood" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://jiazhe.wang/"><img src="https://avatars.githubusercontent.com/u/6898060?v=4?s=32" width="32px;" alt=""/><br /><sub><b>neoddish</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=neoddish" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/stack-stark"><img src="https://avatars.githubusercontent.com/u/46991054?v=4?s=32" width="32px;" alt=""/><br /><sub><b>stack-stark</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=stack-stark" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/NewByVector"><img src="https://avatars.githubusercontent.com/u/20186737?v=4?s=32" width="32px;" alt=""/><br /><sub><b>vector</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=NewByVector" title="Code">💻</a></td>
    <td align="center"><a href="http://www.wanyingxing.vip/"><img src="https://avatars.githubusercontent.com/u/10885578?v=4?s=32" width="32px;" alt=""/><br /><sub><b>嘤嘤嘤</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=xingwanying" title="Code">💻</a></td>
    <td align="center"><a href="https://wineso.me/"><img src="https://avatars.githubusercontent.com/u/2106987?v=4?s=32" width="32px;" alt=""/><br /><sub><b>琚致远</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=juzhiyuan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/YiSiWang"><img src="https://avatars.githubusercontent.com/u/20316342?v=4?s=32" width="32px;" alt=""/><br /><sub><b>14</b></sub></a><br /><a href="https://github.com/antvis/G2Plot/commits?author=YiSiWang" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📧 联系我们

钉钉群组号码: 30233731 / 35686967 (2 群) / 44788198 （3 群）

<img src="https://gw.alipayobjects.com/zos/antfincdn/hTzzaqgHgQ/Antv%252520G2%252520%26%252520G2Plot.png" width="200" height="266" />

## 🔗 相关链接

<img src="https://gw.alipayobjects.com/zos/antfincdn/1yMwFkBvyV/chartcube-logo-cube.svg" width="18"> [ChartCube](https://chartcube.alipay.com/) - 基于 G2Plot 的在线图表制作工具，交互简单，一键导出图表代码！

## 许可证

MIT
