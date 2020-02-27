import { IGroup } from '@antv/g-canvas';
import { View } from '@antv/g2';
import { clone, deepMix, each } from '@antv/util';
import { mappingColor, rgb2arr } from '../../../util/color';

export interface ColumnLabelConfig {
  visible: boolean;
  position?: string;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IColumnLabel extends ColumnLabelConfig {
  view: View;
  plot: any;
}

export default class ColumnLabel {
  public options: ColumnLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  protected container: IGroup;

  constructor(cfg: IColumnLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    this.init();
  }

  protected init() {
    this.container = this.getGeometry().labelsContainer;
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    const elements = this.getGeometry().elements;
    each(elements, (ele) => {
      const { shape } = ele;
      const style = clone(this.options.style);
      const value = this.getValue(shape);
      const position = this.getPosition(shape, value);
      const textAlign = this.getTextAlign(value);
      const textBaseline = this.getTextBaseLine(value);
      const color = this.getTextColor(shape);
      if (this.options.position !== 'top' && this.options.adjustColor && color !== 'black') {
        style.stroke = null;
      }
      const formatter = this.options.formatter;
      const content = formatter ? formatter(value) : value;
      const label = this.container.addShape('text', {
        attrs: deepMix({}, style, {
          x: position.x,
          y: position.y,
          text: content,
          fill: color,
          textAlign,
          textBaseline,
        }),
        name:'label'
      });
      this.adjustLabel(label, shape);
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public hide() {
    this.container.set('visible', false);
    this.plot.canvas.draw();
  }

  public show() {
    this.container.set('visible', true);
    this.plot.canvas.draw();
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  public getBBox() {}

  protected getPosition(shape, value) {
    const bbox = shape.getBBox();
    const { minX, maxX, minY, maxY, height, width } = bbox;
    const { offsetX, offsetY, position } = this.options;
    const x = minX + width / 2 + offsetX;
    const dir = value > 0 ? -1 : 1;
    let y;
    if (position === 'top') {
      const root = value > 0 ? minY : maxY;
      y = root + (offsetY + 8) * dir;
    } else if (position === 'bottom') {
      y = maxY + (offsetY + 8) * dir;
    } else {
      y = minY + height / 2 + offsetY;
    }

    return { x, y };
  }

  protected getTextColor(shape) {
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

  protected getTextAlign(value) {
    return 'center';
  }

  protected getTextBaseLine(value) {
    const { position } = this.options;
    return position === 'middle' ? 'middle' : 'bottom';
  }

  protected getValue(shape) {
    const data = shape.get('origin').data;
    return data[this.plot.options.yField];
  }

  protected adjustLabel(label, shape) {
    if (this.options.adjustPosition && this.options.position !== 'top') {
      const labelRange = label.getBBox();
      const shapeRange = shape.getBBox();
      if (shapeRange.height <= labelRange.height) {
        const yPosition = shapeRange.minY + this.options.offsetY - 8;
        label.attr('y', yPosition);
        label.attr('textBaseline', 'bottom');
        label.attr('fill', this.options.style.fill);
      }
    }
  }

  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      style: clone(labelStyle),
      adjustPosition: true,
    };
  }

  private getGeometry() {
    const { geometries } = this.view;
    let lineGeom;
    each(geometries, (geom) => {
      if (geom.type === 'interval') {
        lineGeom = geom;
      }
    });
    return lineGeom;
  }
}
