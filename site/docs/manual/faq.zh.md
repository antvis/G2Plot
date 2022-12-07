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

横轴的范围是可配置的，在 meta 里面配置即可，range 可选范围是 0~1。

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

### 如何导出图片

考虑到 G2 使用环境的不同（浏览器、mobile 等），G2 从 v4 版本开始，不再提供 `chart.toDataURL()` 以及 `chart.downloadImage()` 接口，鼓励用户自己包装。

可以参考以下工具函数（能覆盖大部分场景，但是不保证完全不存在兼容问题，**仅供参考**）：

<details>
  <summary>
  参考方案(点击展开)：
  </summary>

下面的 `Chart` 实例，在 G2Plot 中可以通过 `plot.chart` 获取。

```ts
/**
 * 返回图表的 dataURL 用于生成图片。
 * @param chart 需要获取 DataURL 的 chart 实例
 * @returns 返回图表的 dataURL
 */
function toDataURL(chart: Chart) {
  const canvas = chart.getCanvas();
  const renderer = chart.renderer;
  const canvasDom = canvas.get('el');
  let dataURL = '';
  if (renderer === 'svg') {
    const clone = canvasDom.cloneNode(true);
    const svgDocType = document.implementation.createDocumentType(
      'svg',
      '-//W3C//DTD SVG 1.1//EN',
      'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
    );
    const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
    svgDoc.replaceChild(clone, svgDoc.documentElement);
    const svgData = new XMLSerializer().serializeToString(svgDoc);
    dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
  } else if (renderer === 'canvas') {
    dataURL = canvasDom.toDataURL('image/png');
  }
  return dataURL;
}

/**
 * 图表图片导出
 * @param chart chart 实例
 * @param name 图片名称，可选，默认名为 'G2Chart'
 */
function downloadImage(chart: Chart, name: string = 'G2Chart') {
  const link = document.createElement('a');
  const renderer = chart.renderer;
  const filename = `${name}${renderer === 'svg' ? '.svg' : '.png'}`;
  const canvas = chart.getCanvas();
  canvas.get('timeline').stopAllAnimations();

  setTimeout(() => {
    const dataURL = toDataURL(chart);
    if (window.Blob && window.URL && renderer !== 'svg') {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blobObj = new Blob([u8arr], { type: mime });
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blobObj, filename);
      } else {
        link.addEventListener('click', () => {
          link.download = filename;
          link.href = window.URL.createObjectURL(blobObj);
        });
      }
    } else {
      link.addEventListener('click', () => {
        link.download = filename;
        link.href = dataURL;
      });
    }
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, false);
    link.dispatchEvent(e);
  }, 16);
}
```

</details>

另外，获取到画布的 dataURI 数据之后，也可以使用 [download](https://github.com/rndme/download) 进行图片下载。

