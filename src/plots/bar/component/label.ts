import { each, deepMix, clone } from '@antv/util';
import { View, IGroup } from '../../../dependents';
import { rgb2arr, mappingColor } from '../../../util/color';

const DEFAULT_OFFSET = 8;

export interface BarLabelConfig {
  visible?: boolean;
  position?: string;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IBarLabel extends BarLabelConfig {
  view: View;
  plot: any;
}

export default class BarLabel {
  public options: BarLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  protected container: IGroup;

  constructor(cfg: IBarLabel) {
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
      const color = this.getTextColor(shape);
      if (this.options.position !== 'right' && this.options.adjustColor && color !== 'black') {
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
          textBaseline: 'middle',
        }),
        name: 'label',
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
    const { minX, maxX, minY, height, width } = bbox;
    const { offsetX, offsetY, position } = this.options;
    const y = minY + height / 2 + offsetY;
    const dir = value < 0 ? -1 : 1;
    let x;
    if (position === 'left') {
      const root = value > 0 ? minX : maxX;
      x = root + offsetX * dir;
    } else if (position === 'right') {
      x = maxX + offsetX * dir;
    } else {
      x = minX + width / 2 + offsetX;
    }

    return { x, y };
  }

  protected getTextColor(shape) {
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

  protected getTextAlign(value) {
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

  protected getValue(shape) {
    const data = shape.get('origin').data;
    return data[this.plot.options.xField];
  }

  protected adjustLabel(label, shape) {
    if (this.options.adjustPosition && this.options.position !== 'right') {
      const labelRange = label.getBBox();
      const shapeRange = shape.getBBox();
      if (shapeRange.width <= labelRange.width) {
        const xPosition = shapeRange.maxX + this.options.offsetX;
        label.attr('x', xPosition);
        label.attr('fill', this.options.style.fill);
      }
    }
  }

  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: DEFAULT_OFFSET,
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
