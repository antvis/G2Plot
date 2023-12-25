import { Chart, AxisComponent } from '@antv/g2';
import { get, isFunction, uniqBy, groupBy } from '../utils';
import { VERTICAL_MARGIN } from '../plots/bidirectional-bar/constants';
import { Annotaion } from './core';
import { Text } from './shapes';

export type BidirectionalBarAxisTextOptions = AxisComponent;

export class BidirectionalBarAxisText extends Annotaion<BidirectionalBarAxisTextOptions> {
  static tag = 'BidirectionalBarAxisText';
  constructor(chart: Chart, options: BidirectionalBarAxisTextOptions) {
    super(chart, options, { type: BidirectionalBarAxisText.tag });
  }

  public render() {
    this.drawText();
  }

  public getBidirectionalBarAxisTextLayout() {
    const { layout } = this.attributes;
    const isVertical = layout === 'vertical';
    const allElementsLayout = this.getElementsLayout();
    const elementsLayout = isVertical ? uniqBy(allElementsLayout, 'x') : uniqBy(allElementsLayout, 'y');
    const textPath = ['title'];
    let textLayout = [];
    const { views } = this.chart.getContext();
    const { width: viewWidth, height: viewHeight } = get(views, [0, 'layout']);
    elementsLayout.forEach((element) => {
      const { x, y, height, width, data, key } = element;
      const text = get(data, textPath);
      if (isVertical) {
        textLayout.push({
          x: x + width / 2,
          y: viewHeight,
          text,
          key,
        });
      } else {
        textLayout.push({
          x: viewWidth,
          y: y + height / 2,
          text,
          key,
        });
      }
    });

    /** 分组情况需要特殊处理 */
    if (uniqBy(textLayout, 'text').length !== textLayout.length) {
      textLayout = Object.values(groupBy(textLayout, 'text')).map((items: Array<{ x: number; y: number }>) => {
        const sum = items.reduce((pre, cur) => {
          return pre + (isVertical ? cur.x : cur.y);
        }, 0);
        return {
          ...items[0],
          [isVertical ? 'x' : 'y']: sum / items.length,
        };
      });
    }

    return textLayout;
  }

  public transformLabelStyle(style) {
    const removeLabel = {};
    const reg = /^label[A-Z]/;
    Object.keys(style).forEach((key) => {
      if (reg.test(key)) {
        removeLabel[key.replace('label', '').replace(/^[A-Z]/, (match) => match.toLowerCase())] = style[key];
      }
    });

    return removeLabel;
  }

  public drawText() {
    const axisLayout = this.getBidirectionalBarAxisTextLayout();
    const { layout: viewLayout, labelFormatter, ...textStyle } = this.attributes;

    axisLayout.forEach((layout) => {
      const { x, y, text, key } = layout;
      const textNode = new Text({
        style: {
          x,
          y,
          text: isFunction(labelFormatter) ? labelFormatter(text) : text,
          wordWrap: true,
          wordWrapWidth: viewLayout === 'horizontal' ? VERTICAL_MARGIN * 2 : 120,
          maxLines: 2,
          textOverflow: 'ellipsis',
          ...this.transformLabelStyle(textStyle),
        },
        id: `text-${key}`,
      });
      this.appendChild(textNode);
    });
  }

  /** 仅仅更新位置即可 */
  public update() {
    const axisLayout = this.getBidirectionalBarAxisTextLayout();
    axisLayout.forEach((layout) => {
      const { x, y, key } = layout;
      const text = this.getElementById(`text-${key}`);
      text.setAttribute('x', x);
      text.setAttribute('y', y);
    });
  }
}
