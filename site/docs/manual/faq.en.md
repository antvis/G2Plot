---
title: FAQ
order: 8
---

## FAQ

Here are the frequently asked questions about G2Plot that you should look up before you ask in the community or create a new issue.

### Browser compatibility

> Due to the condition limit, the lower version limit is only for reference, which does not mean that the lower version cannot be supported. The test was completed in CDN mode. [online Demo](https://lxfu1.github.io/browser-compatibility-of-antv).

|            | Chrome | Edge | Firefox | IE  | Opera | Safari | UC  | 360 speed | 360 safe browser |
| ---------- | :----: | :--: | :-----: | :-: | :---: | :----: | :-: | :-------: | :--------------: |
| **G2Plot** |   40   |  12  |   85    |  9  |  40   |   14   | 6.2 |    12     |       7.3        |

How to add `polyfill` into your project.

- CDN

The following JS is introduced in the HEAD.

```ts
<script src="https://unpkg.com/@babel/polyfill@latest"></script> // optional
<script src="https://unpkg.com/@antv/g2plot@latest"></script>

var line = new G2Plot.Line({
  // ...
});
```

- NPM

Use NPM mode, if there is a compatibility problem please use combination of Babel and `@Babel/polyfill`, reference G2 [.babelrc](https://github.com/antvis/G2/blob/master/.babelrc) and [webpack.config](https://github.com/antvis/G2/blob/master/webpack.config.js), More questions are welcome to join the DingTalk Group.

### How do I set the horizontal axis to start at 0

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NAvlTZ66qzMAAAAAAAAAAAAAARQnAQ" alt="faq">

Horizontal axis is configurable, which can be configured in meta. The optional range is 0~1.

```ts
meta: {
  [xField]: {
    range: [0, 1]
  }
}
```

### How to share a Y axis in DaulAxes plot

You can use `scale.sync` and hide one of the y-axis.

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

### MultiView Plot of multiple-views is rename to Mix from v2.3.20

More details to see [API](/en/docs/api/advanced-plots/mix)  of Mix Plot.

### Liquid cannot be with transparently or picture background

Currently the abilities to support `distance` and custom `shape` options disable transparently or picture background technically.

### SeriesField is not supported in Sunburst Plot anymore

In the version bigger than 2.3.20, you can use `hierarchyConfig.field` to replace `seriesField` config. More details to see [API]((/zh/docs/api/plots/sunburst)) of Sunburst Plot.

### How do export images

Considering the different use environment (browser, mobile, etc.) of G2, starting from version 4, G2 no longer provides `chart.todataURL()` and `chart.downloadiimage()` interfaces, which encourages users to encapsulate themselves.

You can refer to the following utility functions (which cover most scenarios, but do not guarantee that there are no compatibility issues, **for reference only**) :

<details>
  <summary>
  Reference scheme (click to expand) :
  </summary>

You can get the `Chart` instance through `plot.chart`.

```ts
/**
 * Returns the dataURL for the chart to generate the image.
 * @param chart requires a Chart instance of Dataurl
 * @returns Returns the dataURL of the chart
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
 * Chart pictures exported
 * @param chart chart instance
 * @param name image name, optional, default name 'G2Chart'
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

In addition, access to the canvas dataURI data, you can also use the images are downloaded [download](https://github.com/rndme/download).

