---
title: FAQ
order: 8
---

## FAQ

以下整理了一些 G2Plot 社区常见的问题和官方答复，提问或新增 issue 前先看看。

### 浏览器兼容性

> 由于条件限制，版本下限仅供参考，并不意味着不能支持更低版本，该测试在 CDN 模式下测试完成，[在线 Demo](https://lxfu1.github.io/browser-compatibility-of-antv)。

|            | Chrome | Edge | Firefox | IE  | Opera | Safari | UC  | 360 极速浏览器 | 360 安全浏览器 |
| ---------- | :----: | :--: | :-----: | :-: | :---: | :----: | :-: | :------------: | :------------: |
| **G2Plot** |   40   |  12  |   85    |  9  |  40   |   14   | 6.2 |       12       |      7.3       |

 如果出现浏览器兼容，看是否项目中有引入 polyfill。在不同使用方式下，添加方式如下：

- CDN 下使用

```ts
<script src="https://unpkg.com/@babel/polyfill@latest"></script> // 非必需
<script src="https://unpkg.com/@antv/g2plot@latest"></script>

var line = new G2Plot.Line({
  // ...
});
```

- NPM

使用 npm 模式，如果出现兼容性问题请结合 babel 和 @babel/polyfill 使用，参考 G2 [.babelrc](https://github.com/antvis/G2/blob/master/.babelrc) 和 [webpack.config](https://github.com/antvis/G2/blob/master/webpack.config.js)，更多问题欢迎进群交流。

### 怎么设置横轴从 0 开始

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NAvlTZ66qzMAAAAAAAAAAAAAARQnAQ" alt="faq">

横轴的范范是可配置的，在 meta 里面配置即可，range 可选范围是 0~1。

```ts
meta: {
  [xField]: {
    range: [0, 1]
  }
}
```

### 双轴图如何共用一个 Y 轴

可以通过开启 scale 同步， 然后隐藏其中一个 y 轴坐标。

```ts
// 适用于 DualAxes plot
{
  yFields: ['y1', 'y2'],
  meta: {
    y1: { sync: 'y2' },
    y2: { sync: true },
  },
  yAxis: {
    y2: false
  }
}
```

### 多图层图表自 2.3.20 版本从 MultiView 更名为 Mix

具体使用：可以见 Mix Plot [API](/zh/docs/api/advanced-plots/mix) 文档。

### 水波图无法设置透明或者图片背景

因为水波图需要支持 distance 和通过 path 来自定义 shape，所以目前没有办法设置透明或者图片背景。

### 旭日图不再支持配置 seriesField

在旭日图中, seriesField 字段主要代表的是节点权重映射的数值字段，但从更合理的角度看：seriesField 应该代表的是分组字段。在 > 2.3.20 版本之后，我们将其配置使用 `hierarchyConfig.field` 进行替代。详细见旭日图 [API]((/zh/docs/api/plots/sunburst)) 文档