import { each, deepMix, clone, find } from '@antv/util';
import { View, IGroup, Geometry } from '../../../../dependents';

const DEFAULT_OFFSET = 8;

export interface LineLabelConfig {
  visible?: boolean;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
}

export interface ILineLabel extends LineLabelConfig {
  view: View;
  plot: any;
}

export default class LineLabel {
  public options: LineLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  private container: IGroup;

  constructor(cfg: ILineLabel) {
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
      const shapeInfo = this.getShapeInfo(ele.shape);
      const { style, offsetX, offsetY } = this.options;
      const formatter = this.options.formatter;
      const content = formatter ? formatter(shapeInfo.name) : shapeInfo.name;
      this.container.addShape('text', {
        attrs: deepMix({}, style, {
          x: shapeInfo.x + offsetX,
          y: shapeInfo.y + offsetY,
          text: content,
          fill: shapeInfo.color,
          textAlign: 'left',
          textBaseline: 'middle',
        }),
        name: 'label',
      });
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

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: DEFAULT_OFFSET,
      offsetY: 0,
      style: clone(labelStyle),
    };
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'line') as Geometry;
  }

  protected getShapeInfo(shape) {
    const originPoints = shape.get('origin').points;
    const lastPoint = originPoints[originPoints.length - 1];
    const color = shape.attr('stroke');
    const { seriesField } = this.plot.options;
    const name = shape.get('origin').data[0][seriesField];
    return { x: lastPoint.x, y: lastPoint.y, color, name };
  }
}
