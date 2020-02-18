/**
 * 转化率组件，用于柱状图和条形图，展示从一个值到另一个值的转化率。
 */
import { Group, Shape } from '@antv/g';
import { View, Animate } from '@antv/g2';
import * as _ from '@antv/util';

function parsePoints(shape) {
  const parsedPoints = [];
  const coord = shape.get('coord');
  const points = shape.get('origin').points;
  _.each(points, (p) => {
    parsedPoints.push(coord.convertPoint(p));
  });
  return parsedPoints;
}

export interface ConversionTagOptions {
  visible: boolean;
  size?: number;
  spacing?: number;
  offset?: number;
  arrow?: ArrowOptions;
  value?: ValueOptions;
  animation?: any;
  transpose?: boolean;
}

interface ArrowOptions {
  visible: boolean;
  headSize?: number;
  style?: any;
}

interface ValueOptions {
  visible: boolean;
  style?: any;
  formatter?: (valueUpper: any, valueLower: any) => string;
}

export interface ConversionTagConfig extends ConversionTagOptions {
  view: View;
  field: string;
}

export default class ConversionTag {
  public static getDefaultOptions({ transpose }: ConversionTagConfig): ConversionTagOptions {
    return {
      visible: true,
      size: transpose ? 32 : 80,
      spacing: transpose ? 8 : 12,
      offset: transpose ? 32 : 0,
      arrow: {
        visible: true,
        headSize: 12,
        style: {
          fill: 'rgba(0, 0, 0, 0.05)',
        },
      },
      value: {
        visible: true,
        style: {
          fontSize: 12,
          fill: 'rgba(0, 0, 0, 0.85)',
        },
        formatter: (valueUpper: any, valueLower: any) => `${((100 * valueLower) / valueUpper).toFixed(2)}%`,
      },
      animation: _.deepMix({}, Animate.defaultCfg),
    };
  }

  private view: View;
  private container: Group;
  private transpose?: boolean;
  private field: string;
  private size: number;
  private offset: number;
  private spacing: number;
  private arrow: ArrowOptions;
  private value: ValueOptions;
  private animation: boolean;

  constructor(cfg: ConversionTagConfig) {
    // @ts-ignore
    _.deepMix(this, this.constructor.getDefaultOptions(cfg), cfg);
    this._init();
  }

  private _init() {
    const layer = this.view.get('backgroundGroup');
    this.container = layer.addGroup();
    this.draw();
    this.view.on('beforerender', () => {
      this.clear();
    });
  }

  public draw() {
    const { transpose } = this;
    const { values } = this.view.get('scales')[this.field];
    const geometry = this.view.get('elements')[0];
    const shapes: Shape[] = geometry.getShapes();

    let shapeLower, valueLower, shapeUpper, valueUpper;

    if (transpose) {
      shapes.forEach((shapeLower, i) => {
        valueLower = values[i];
        if (i++ > 0) {
          this._drawTag(shapeUpper, valueUpper, shapeLower, valueLower);
        }
        valueUpper = valueLower;
        shapeUpper = shapeLower;
      });
    } else {
      shapes.forEach((shapeUpper, i) => {
        valueUpper = values[i];
        if (i++ > 0) {
          this._drawTag(shapeUpper, valueUpper, shapeLower, valueLower);
        }
        valueLower = valueUpper;
        shapeLower = shapeUpper;
      });
    }
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destory() {
    if (this.container) {
      this.container.remove();
    }
  }

  private _drawTag(shapeUpper, valueUpper, shapeLower, valueLower) {
    const { transpose } = this;
    const pointUpper = parsePoints(shapeUpper)[transpose ? 3 : 0];
    const pointLower = parsePoints(shapeLower)[transpose ? 0 : 3];
    this._drawTagArrow(pointUpper, pointLower);
    this._drawTagValue(pointUpper, valueUpper, pointLower, valueLower);
  }

  private _drawTagArrow(pointUpper, pointLower) {
    let { spacing } = this;
    const { size, offset, animation, transpose } = this;
    const { headSize } = this.arrow;
    const totalHeight = pointLower.y - pointUpper.y;
    const totalWidth = pointLower.x - pointUpper.x;

    let points;

    if (transpose) {
      if ((totalWidth - headSize) / 2 < spacing) {
        // 当柱间距不足容纳箭头尖与间隔时，画三角并挤占间隔
        spacing = Math.max(1, (totalWidth - headSize) / 2);
        points = [
          [pointUpper.x + spacing, pointUpper.y - offset],
          [pointUpper.x + spacing, pointUpper.y - offset - size],
          [pointLower.x - spacing, pointLower.y - offset - size / 2],
        ];
      } else {
        // 当柱间距足够时，画完整图形并留出间隔。
        points = [
          [pointUpper.x + spacing, pointUpper.y - offset],
          [pointUpper.x + spacing, pointUpper.y - offset - size],
          [pointLower.x - spacing - headSize, pointLower.y - offset - size],
          [pointLower.x - spacing, pointLower.y - offset - size / 2],
          [pointLower.x - spacing - headSize, pointLower.y - offset],
        ];
      }
    } else {
      if ((totalHeight - headSize) / 2 < spacing) {
        // 当柱间距不足容纳箭头尖与间隔时，画三角并挤占间隔
        spacing = Math.max(1, (totalHeight - headSize) / 2);
        points = [
          [pointUpper.x + offset, pointUpper.y + spacing],
          [pointUpper.x + offset + size, pointUpper.y + spacing],
          [pointLower.x + offset + size / 2, pointLower.y - spacing],
        ];
      } else {
        // 当柱间距足够时，画完整图形并留出间隔。
        points = [
          [pointUpper.x + offset, pointUpper.y + spacing],
          [pointUpper.x + offset + size, pointUpper.y + spacing],
          [pointLower.x + offset + size, pointLower.y - spacing - headSize],
          [pointLower.x + offset + size / 2, pointLower.y - spacing],
          [pointLower.x + offset, pointLower.y - spacing - headSize],
        ];
      }
    }

    const tagArrow = this.container.addShape('polygon', {
      name: 'arrow',
      attrs: {
        ...this.arrow.style,
        points,
      },
    });

    if (animation !== false) {
      this._fadeInTagShape(tagArrow);
    }
  }

  private _drawTagValue(pointUpper, valueUpper, pointLower, valueLower) {
    const { size, offset, animation, transpose } = this;

    const text = this.value.formatter(valueUpper, valueLower);

    const tagValue = this.container.addShape('text', {
      name: 'value',
      attrs: {
        ...this.value.style,
        text,
        x: transpose ? (pointUpper.x + pointLower.x) / 2 : pointUpper.x + offset + size / 2,
        y: transpose ? pointUpper.y - offset - size / 2 : (pointUpper.y + pointLower.y) / 2,
        textAlign: 'center',
        textBaseline: 'middle',
      },
    });

    if (transpose) {
      const totalWidth = pointLower.x - pointUpper.x;
      const { width: textWidth } = tagValue.getBBox();
      if (textWidth > totalWidth) {
        const cWidth = textWidth / text.length;
        const cEnd = Math.max(1, Math.ceil(totalWidth / cWidth) - 1);
        const textAdjusted = `${text.slice(0, cEnd)}...`;
        tagValue.attr('text', textAdjusted);
      }
    }

    if (animation !== false) {
      this._fadeInTagShape(tagValue);
    }
  }

  private _fadeInTagShape(shape) {
    const { animation } = this;

    const opacity = shape.attr('opacity');
    shape.attr('opacity', 0);
    const { duration } = _.get(animation, 'appear', Animate.defaultCfg.appear);
    shape.animate({ opacity }, duration);
  }
}
