<!-- 类型定义 -->

Types of **_TooltipCrosshairsText_** are as follow:

```ts
/** 辅助线文本配置 */
type TooltipCrosshairsText = {
  /**
   * position of text, only support: 'start' | 'end'
   * @type {string}
   */
  position?: string;
  /**
   * 文本内容
   */
  content?: string;
  /**
   * 距离线的距离
   * @type {number}
   */
  offset?: number;
  /**
   * @type {boolean}
   */
  autoRotate?: boolean;
  /**
   * 文本的配置项
   * @type {ShapeAttrs}
   */
  style?: TextStyle;
};
```

Details about types of **_TextStyle_** see: [通用文本样式](/zh/docs/api/graphic-style#%E9%85%8D%E7%BD%AE%E6%96%87%E5%AD%97%E6%A0%B7%E5%BC%8F)

Types of **_TooltipCrosshairsTextCallback_** are as follow:

```ts
/**
 * 辅助线文本回调函数
 * @param type 对应当前 crosshairs 的类型，值为 'x' 或者 'y'
 * @param defaultContent 对应当前 crosshairs 默认的文本内容
 * @param items 对应当前 tooltip 内容框中的数据
 * @param currentPoint 对应当前坐标点
 * @returns 返回当前 crosshairs 对应的辅助线文本配置
 */
type TooltipCrosshairsTextCallback = (
  type: string,
  defaultContent: any,
  items: any[],
  currentPoint: Point
) => TooltipCrosshairsText;
```

<!-- 容器无限变大 -->
<!-- <Playground path="more-plots/stock/demo/custom-crosshairs.ts" rid="crosshairs" height=400></playground> -->
