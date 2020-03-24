import { clone, get, each, deepMix } from '@antv/util';
import { IShape, Element } from '../../../dependents';
import BaseLabel, { registerLabelComponent } from '../../../components/label/label';
import { IStyleConfig } from '../../../interface/config';
import { mappingColor, rgb2arr } from '../../../util/color';
import BBox from '../../../util/bbox';

export const DEFAULT_OFFSET = 8;

export default class ColumnLabel extends BaseLabel {
  protected getLabelItemConfig(element: Element, idx: number): IStyleConfig {
    const { style, formatter } = this.options;
    const { shape } = element;
    const value = this.getValue(element);

    return deepMix({}, style, {
      ...this.getPosition(element),
      text: formatter ? formatter(value, shape, idx) : value,
      fill: this.getTextFill(element),
      stroke: this.getTextStroke(element),
      textAlign: this.getTextAlign(element),
      textBaseline: this.getTextBaseLine(element),
    });
  }

  protected getDefaultOptions() {
    const { theme } = this.layer;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      style: clone(labelStyle),
      adjustPosition: true,
    };
  }

  protected adjustLabel(label: IShape, element: Element): void {
    const { adjustPosition } = this.options;
    if (adjustPosition) {
      const labelRange = label.getBBox();
      const shapeRange = this.getElementShapeBBox(element);
      if (shapeRange.height <= labelRange.height) {
        const yPosition = shapeRange.minY + this.options.offsetY - DEFAULT_OFFSET;
        label.attr('y', yPosition);
        label.attr('textBaseline', 'bottom');
        label.attr('fill', this.options.style.fill);
      }
    }
  }

  protected getValue(element: Element): number {
    return get(element.getData(), this.layer.options.yField);
  }

  protected getPosition(element: Element): { x: number; y: number } {
    const value = this.getValue(element);
    const bbox = this.getElementShapeBBox(element);
    const { minX, minY, maxY, height, width } = bbox;
    const { offsetX, offsetY, position } = this.options;
    const x = minX + width / 2 + offsetX;
    const dir = value > 0 ? -1 : 1;
    let y;
    if (position === 'top') {
      const root = value > 0 ? minY : maxY;
      y = root + (offsetY + DEFAULT_OFFSET) * dir;
    } else if (position === 'bottom') {
      y = maxY + (offsetY + DEFAULT_OFFSET) * dir;
    } else {
      y = minY + height / 2 + offsetY;
    }

    return { x, y };
  }

  protected getTextFill(element: Element) {
    const { shape } = element;
    if (this.options.adjustColor && this.options.position !== 'top') {
      const shapeColor = shape.attr('fill');
      const shapeOpacity = shape.attr('opacity') ? shape.attr('opacity') : 1;
      const rgb = rgb2arr(shapeColor);
      const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;
      const colorBand = [
        { from: 0, to: 85, color: 'white' },
        { from: 85, to: 170, color: '#F6F6F6' },
        { from: 170, to: 255, color: 'black' },
      ];
      const reflect = mappingColor(colorBand, gray);
      return reflect;
    }
    const defaultColor = this.options.style.fill;
    return defaultColor;
  }

  protected getTextStroke(element: Element) {
    const fill = this.getTextFill(element);
    const { position, adjustColor } = this.options;
    return position !== 'top' && adjustColor && fill !== 'black' ? null : undefined;
  }

  protected getElementShapeBBox(element: Element) {
    const { shape } = element;
    const points = [];
    each(shape.get('origin').points, (p) => {
      points.push(this.coord.convertPoint(p));
    });
    const bbox = new BBox(
      points[0].x,
      points[1].y,
      Math.abs(points[2].x - points[0].x),
      Math.abs(points[0].y - points[1].y)
    );
    return bbox;
  }

  protected getTextAlign(element: Element) {
    return 'center';
  }

  protected getTextBaseLine(element: Element) {
    const { position } = this.options;
    return position === 'middle' ? 'middle' : 'bottom';
  }
}

registerLabelComponent('column', ColumnLabel);
