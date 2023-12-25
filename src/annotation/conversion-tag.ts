import { Chart } from '@antv/g2';
import { get, isFunction } from '../utils';
import { Text, Polygon } from './shapes';
import { Annotaion } from './core';

type ShapeAttrs = Record<string, any>;

export type ConversionTagOptions = {
  /** tag 高度 */
  size?: number;
  /** tag 箭头大小 */
  arrowSize?: number;
  /** tag 对柱子间距 */
  spacing?: number;
  /** 文本配置 */
  text?: {
    /** 文字样式 */
    style?: ShapeAttrs;
    /** 文本格式化 */
    formatter?: (prev: number, next: number) => string;
  };
  /** tag 样式 */
  style?: ShapeAttrs;
};

export class ConversionTag extends Annotaion<ConversionTagOptions> {
  static tag = 'ConversionTag';
  public direction: 'vertical' | 'horizontal';

  constructor(chart: Chart, options: ConversionTagOptions) {
    super(chart, options, { type: ConversionTag.tag });
  }

  public getConversionTagLayout() {
    const isVertical = this.direction === 'vertical';
    const elementsLayout = this.getElementsLayout();
    const { x: firstX, y: firstY, height: firstHeigt, width: firstWidth, data: firstData } = elementsLayout[0];
    const valuePath = ['items', 0, 'value'];
    let preValue = get(firstData, valuePath);
    const elementDistance = isVertical
      ? elementsLayout[1].y - firstY - firstHeigt
      : elementsLayout[1].x - firstX - firstWidth;
    const tagLayout = [];
    const { size = 40, arrowSize = 20, spacing = 4 } = this.attributes;
    elementsLayout.forEach((element, index) => {
      if (index > 0) {
        const { x, y, height, width, data, key } = element;
        const currentValue = get(data, valuePath);

        const halfSize = size / 2;
        if (isVertical) {
          const arrowVertexX = x + width / 2;
          const arrowVertexY = y;
          tagLayout.push({
            points: [
              [arrowVertexX + halfSize, arrowVertexY - elementDistance + spacing],
              [arrowVertexX + halfSize, arrowVertexY - arrowSize - spacing],
              [arrowVertexX, arrowVertexY - spacing],
              [arrowVertexX - halfSize, arrowVertexY - arrowSize - spacing],
              [arrowVertexX - halfSize, arrowVertexY - elementDistance + spacing],
            ],
            center: [arrowVertexX, arrowVertexY - elementDistance / 2 - spacing],
            width: elementDistance,
            value: [preValue, currentValue],
            key,
          });
        } else {
          const arrowVertexX = x;
          const arrowVertexY = y + height / 2;
          tagLayout.push({
            points: [
              [x - elementDistance + spacing, arrowVertexY - halfSize],
              [x - arrowSize - spacing, arrowVertexY - halfSize],
              [arrowVertexX - spacing, arrowVertexY],
              [x - arrowSize - spacing, arrowVertexY + halfSize],
              [x - elementDistance + spacing, arrowVertexY + halfSize],
            ],
            center: [arrowVertexX - elementDistance / 2 - spacing, arrowVertexY],
            width: elementDistance,
            value: [preValue, currentValue],
            key,
          });
        }

        preValue = currentValue;
      }
    });
    return tagLayout;
  }
  public render() {
    this.setDirection();
    this.drawConversionTag();
  }
  /** 根据 coordinate 确定方向 */
  public setDirection() {
    const coordinate = this.chart.getCoordinate();
    const transformations = get(coordinate, 'options.transformations', []);
    let direction = 'horizontal';
    transformations.forEach((transformation) => {
      if (transformation.includes('transpose')) {
        direction = 'vertical';
      }
    });
    this.direction = direction as 'vertical' | 'horizontal';
  }

  public drawConversionTag() {
    const conversionLayout = this.getConversionTagLayout();
    const {
      style,
      text: { style: textStyle, formatter },
    } = this.attributes;
    conversionLayout.forEach((layout) => {
      const { points, center, value, key } = layout;
      const [prev, next] = value;
      const [x, y] = center;
      const polygon = new Polygon({
        style: {
          points,
          fill: '#eee',
          ...style,
        },
        id: `polygon-${key}`,
      });
      const text = new Text({
        style: {
          x,
          y,
          text: isFunction(formatter) ? formatter(prev, next) : ((next / prev) * 100).toFixed(2) + '%',
          ...textStyle,
        },
        id: `text-${key}`,
      });
      this.appendChild(polygon);
      this.appendChild(text);
    });
  }

  /** 仅仅更新位置即可 */
  public update() {
    const conversionLayout = this.getConversionTagLayout();
    conversionLayout.forEach((layout) => {
      const { points, center, key } = layout;
      const [x, y] = center;
      const polygon = this.getElementById(`polygon-${key}`);
      const text = this.getElementById(`text-${key}`);
      polygon.setAttribute('points', points);
      text.setAttribute('x', x);
      text.setAttribute('y', y);
    });
  }
}
