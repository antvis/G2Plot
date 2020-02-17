import { each, deepMix, clone, find } from '@antv/util';
import { IGroup } from '@antv/g-canvas';
import { View } from '@antv/g2';
import { rgb2arr, mappingColor } from '../../../util/color';

export interface MatrixLabelConfig {
  visible: boolean;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IMatrixLabel extends MatrixLabelConfig {
  view: View;
  plot: any;
}

export default class MatrixLabel {
  public options: MatrixLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  private container: IGroup;

  constructor(cfg: IMatrixLabel) {
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
      const { style, offsetX, offsetY } = this.options;
      const formatter = this.options.formatter;
      const content = formatter ? formatter(this.getContent(shape)) : this.getContent(shape);
      const position = this.getPosition(shape);
      const color = this.getTextColor(shape);
      const label = this.container.addShape('text', {
        attrs: deepMix({}, style, {
          x: position.x + offsetX,
          y: position.y + offsetY,
          text: content,
          fill: color,
          textAlign: 'center',
          textBaseline: 'middle',
        }),
      });
      if (this.options.adjustPosition) {
        this.adjustLabel(label, shape);
      }
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

  public destory() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  public getBBox() {}

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      style: clone(labelStyle),
    };
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'point');
  }

  protected getContent(shape) {
    const data = shape.get('origin').data;
    const field = this.plot.options.colorField;
    return data[field];
  }

  protected getPosition(shape) {
    const bbox = shape.getBBox();
    return {
      x: bbox.minX + bbox.width / 2,
      y: bbox.minY + bbox.height / 2,
    };
  }

  protected getTextColor(shape) {
    if (this.options.adjustColor) {
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

  protected adjustLabel(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (labelRange.width > shapeRange.width || labelRange.height > shapeRange.height) {
      label.attr('text', '');
    }
  }
}
