import * as _ from '@antv/util';
import { View, IGroup } from '../../../dependents';
import { rgb2arr, mappingColor } from '../../../util/color';
import * as Config from '../../../interface/config';

export interface IFunnelLabelOptions extends Config.Label {}

export interface IFunnelLabelConfig extends IFunnelLabelOptions {
  view: View;
  plot: any;
}

export default class FunnelLabel {
  public options: IFunnelLabelOptions;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  protected container: IGroup;

  constructor(cfg: IFunnelLabelConfig) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    this.options = cfg;
    this.init();
  }

  protected init() {
    this.container = this.view.geometries[0]?.labelsContainer;
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    const { formatter } = this.options;

    let index = 0;
    let yValueTop;
    this.view.geometries[0]?.elements.forEach((element) => {
      const { shape } = element;

      const style = _.deepMix({}, this.options.style);

      const [xValue, yValue] = this.getValues(shape);
      if (index == 0) yValueTop = yValue;

      const position = this.getPosition(shape);
      const textAlign = this.getTextAlign();
      const color = this.getTextColor(shape);
      if (this.options.position !== 'right' && this.options.adjustColor && color !== 'black') {
        style.stroke = null;
      }

      const content = formatter ? formatter(xValue, shape, index, yValue, yValueTop) : `${xValue} ${yValue}`;
      const label = this.container.addShape('text', {
        attrs: _.deepMix({}, style, {
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
      index++;
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

  protected getPosition(shape) {
    const bbox = shape.getBBox();
    const { minX, maxX, minY, maxY } = bbox;
    const { offsetX, offsetY } = this.options;
    const x = (minX + maxX) / 2 + offsetX;
    const y = (minY + maxY) / 2 + offsetY;
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

  protected getTextAlign() {
    const { position } = this.options;
    return position;
  }

  protected getValues(shape) {
    const { xField, yField } = this.plot.options;
    const data = shape.get('origin').data;
    return [data[xField], data[yField]];
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

  private getGeometry() {
    return this.view.geometries[0];
  }
}
