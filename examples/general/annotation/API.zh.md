---
title: API
---

## Annotation

图形标注，Annotation，作为图表的辅助元素，主要用于在图表上标识额外的标记注解

G2Plot 继承了 G2 的图形标注配置，[详细介绍](https://g2.antv.vision/en/docs/api/general/annotation)

通用配置属性：

```ts
{
  /** annotation 类型，支持类型详细见下文介绍 */
  type: 'xxx',
  /** 指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层 */
  top: false,
  /** 是否进行动画 */
  animate: true;
  /** 动画参数配置，当且仅当 `animate` 属性为 true，即动画开启时生效。 */
  animateOption: {},
  /** 图形样式属性 */
  style: {},
  /** x 方向的偏移量 */
  offsetX: 0,
  /** y 方向的偏移量 */
  offsetY: 0,
}
```

### Arc Annotaion

使用示例:

```ts
{
  type: 'arc',
  /** 起始位置 */
  start: ['20%', 0],
  /** 结束位置 */
  end: ['20%', 0],
}
```

### Image Annotaion

使用示例:

```ts
{
  type: 'image',
  src:
    "https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ELYbTIVCgPoAAAAAAAAAAABkARQnAQ",
  /** 位置 */
  position: ["50%", "50%"],
  /** 图形样式属性 */
  style: {
    width: 100,
    height: 100
  },
  /** x 方向的偏移量 */
  offsetX: -50,
  /** y 方向的偏移量 */
  offsetY: 50
}
```

### Line Annotaion

使用示例: _绘制中位线_

```ts
{
  type: 'line',
  /** 起始位置 */
  start: ['min','median'],
  /** 结束位置 */
  end: ['max','median'],
}
```

### Text Annotaion

使用示例:

```ts
{
  type: 'text',
  /** 位置 */
  position: ['median', 'median'],
  content: '趋势面积图',
  style: {
    textAlign: 'center',
  },
}
```

### Region Annotaion

使用示例

```ts
{
  type: 'region',
  /** 起始位置 */
  start: ['min','median'],
  /** 结束位置 */
  end: ['max','median'],
}
```
