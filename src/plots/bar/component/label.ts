import { each, get, deepMix } from '@antv/util';
import { Element, IShape, MappingDatum, _ORIGIN } from '../../../dependents';
import BaseLabel, { registerLabelComponent } from '../../../components/label/base';
import { rgb2arr, mappingColor } from '../../../util/color';
import BBox from '../../../util/bbox';
import { TextStyle } from '../../../interface/config';
import { IBarLabel } from '../interface';

export default class BarLabel<L extends IBarLabel = IBarLabel> extends BaseLabel<L> {
  protected getLabelItemAttrs(element: Element, index: number): TextStyle {
    const { style, formatter } = this.options;
    const mappingData: MappingDatum[] = [].concat(element.getModel().mappingData);
    const value = this.getValue(element);

    return deepMix({}, style, {
      ...this.getPosition(element),
      text: formatter
        ? formatter(
            value,
            {
              [_ORIGIN]: mappingData[0]._origin,
              mappingDatum: mappingData[0],
              mappingDatumIndex: 0,
              element,
              elementIndex: index,
            },
            index
          )
        : value,
      fill: this.getTextFill(element),
      stroke: this.getTextStroke(element),
      textAlign: this.getTextAlign(element),
      textBaseline: this.getTextBaseline(),
    });
  }

  protected adjustLabel(label: IShape, element: Element): void {
    const { adjustPosition, style } = this.options;
    if (adjustPosition) {
      const offset = this.getDefaultOffset();
      const labelRange = label.getBBox();
      const shapeRange = this.getElementShapeBBox(element);
      if (shapeRange.width <= labelRange.width) {
        const xPosition = shapeRange.maxX + this.options.offsetX + offset;
        label.attr('x', xPosition);
        label.attr('fill', style.fill);
      }
    }
  }

  protected getDefaultOptions() {
    const { theme } = this.layer;
    const { label = {} } = theme;
    return {
      offsetX: 0,
      offsetY: 0,
      adjustPosition: true,
      ...label,
    };
  }

  protected getValue(element: Element): number | undefined | null {
    return get(element.getData(), this.layer.options.xField);
  }

  protected getPosition(element: Element): { x: number; y: number } {
    const offset = this.getDefaultOffset();
    const value = this.getValue(element);
    const bbox = this.getElementShapeBBox(element);
    const { minX, maxX, minY, height, width } = bbox;
    const { offsetX, offsetY, position } = this.options;
    const y = minY + height / 2 + offsetY;
    const dir = value < 0 ? -1 : 1;
    let x;
    if (position === 'left') {
      const root = value > 0 ? minX : maxX;
      x = root + offset * dir + offsetX;
    } else if (position === 'right') {
      const root = value > 0 ? maxX : minX;
      x = root + offset * dir + offsetX;
    } else {
      x = minX + width / 2 + offsetX;
    }

    return { x, y };
  }

  protected getTextFill(element: Element) {
    const { shape } = element;
    if (this.options.adjustColor && this.options.position !== 'right') {
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
    return position !== 'right' && adjustColor && fill !== 'black' ? null : undefined;
  }

  protected getTextAlign(element: Element) {
    const value = this.getValue(element);
    const { position } = this.options;
    const alignOptions = {
      right: 'left',
      left: 'left',
      middle: 'center',
    };
    const alignOptionsReverse = {
      right: 'right',
      left: 'right',
      middle: 'center',
    };
    if (value < 0) {
      return alignOptionsReverse[position];
    }
    return alignOptions[position];
  }

  protected getTextBaseline() {
    return 'middle';
  }

  protected getElementShapeBBox(element: Element): BBox {
    const { shape } = element;
    const points = [];
    each(shape.get('origin').points, (p) => {
      points.push(this.coord.convertPoint(p));
    });
    const xValues = points.map((point) => point.x);
    const xValuesMin = Math.min(...xValues);
    const xValueMax = Math.max(...xValues);
    const yValues = points.map((point) => point.y);
    const yValuesMin = Math.min(...yValues);
    const yValuesMax = Math.max(...yValues);
    const bbox = new BBox(xValuesMin, yValuesMin, xValueMax - xValuesMin, yValuesMax - yValuesMin);
    return bbox;
  }

  protected getLabelOffset() {
    // Column 的 offset 在 getPosition 中因 position 不同单独处理
    return {
      x: 0,
      y: 0,
    };
  }
}

registerLabelComponent('bar', BarLabel);
