import { each, deepMix, clone } from '@antv/util';
import { IGroup, IShape } from '@antv/g-canvas';
import { View } from '@antv/g2';
import { Label } from '../../../interface/config';

export interface IScatterLabel extends Label {
  field: string;
  view: View;
  plot: any;
  style?: any;
}

export default class ScatterLabel {
  public options: IScatterLabel;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  protected container: IGroup;
  protected label: IShape;

  constructor(cfg: IScatterLabel) {
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
    const { field } = this.options;
    const elements = this.getGeometry().elements;
    each(elements, (ele, index) => {
      const { shape } = ele;
      const style = clone(this.options.style);
      const data = shape.get('origin').data;
      const value = data[field];
      const position = this.getPosition(shape, value);
      const textAlign = this.getTextAlign();
      const textBaseline = this.getTextBaseline();
      const formatter = this.options.formatter;
      const content = formatter ? formatter(value, data, index) : value;
      this.label = this.container.addShape('text', {
        attrs: deepMix({}, style, {
          x: position.x,
          y: position.y,
          text: content,
          textAlign,
          textBaseline,
        }),
      });
    });
  }

  protected getTextBaseline() {
    const { position } = this.options;
    const baselineOptions = {
      right: 'middle',
      left: 'middle',
      middle: 'middle',
      top: 'bottom',
      bottom: 'top',
    };
    return baselineOptions[position];
  }

  protected getTextAlign() {
    const { position } = this.options;
    const alignOptions = {
      right: 'left',
      left: 'right',
      middle: 'center',
      top: 'center',
      bottom: 'center',
    };
    return alignOptions[position];
  }

  protected getPosition(shape, value) {
    const bbox = shape.getBBox();
    const { minX, minY, height, width } = bbox;
    const { offsetX, offsetY, position } = this.options;
    switch (position) {
      case 'middle':
        return {
          x: minX + width / 2 + offsetX,
          y: minY + height / 2 + offsetY,
        };
      case 'right': {
        return {
          x: minX + width + offsetX,
          y: minY + height / 2 + offsetY,
        };
      }
      case 'left': {
        return {
          x: minX + offsetX,
          y: minY + height / 2 + offsetY,
        };
      }
      case 'top': {
        return {
          x: minX + width / 2 + offsetX,
          y: minY + offsetY,
        };
      }
      case 'bottom': {
        return {
          x: minX + width / 2 + offsetX,
          y: minY + height + offsetY,
        };
      }
    }
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

  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      position: 'left',
      offsetX: 0,
      offsetY: 0,
      style: clone(labelStyle),
    };
  }

  private getGeometry() {
    const { geometries } = this.view;
    let lineGeom;
    each(geometries, (geom) => {
      if (geom.type === 'point') {
        lineGeom = geom;
      }
    });
    return lineGeom;
  }
}
