import { each, deepMix, clone } from '@antv/util';
import { Group } from '@antv/g';
import { View } from '@antv/g2';
import { rgb2arr } from '../../../util/color';

function getPointAngle(coord, point): number {
  const center = coord.getCenter();
  return Math.atan2(point.y - center.y, point.x - center.x);
}

export interface SunburstLabelConfig {
  visible: boolean;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
}

export interface ISunburstLabel extends SunburstLabelConfig {
  view: View;
  plot: any;
}

export default class RangeBarLabel {
  public options: SunburstLabelConfig;
  public destroyed: boolean = false;
  private plot: any;
  private view: View;
  private container: Group;

  constructor(cfg: ISunburstLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    this.init();
  }

  public init() {
    const geomContainer = this.view.get('elements')[0].get('container');
    this.container = geomContainer.addGroup();
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    const geometry = this.view.get('elements')[0];
    const shapes = geometry.getShapes();
    each(shapes, (shape) => {
      const { style } = this.options;
      const position = this.getPosition(shape);
      const value = this.getValue(shape);
      const formatter = this.options.formatter;
      const content = formatter ? formatter(value) : value;
      const rotate = this.getRotate(position.angle);
      this.container.addShape('text', {
        attrs: deepMix({}, style, {
          x: position.x,
          y: position.y,
          text: content,
          textAlign: 'center',
          textBaseline: 'middle',
          rotate,
        }),
      });
    });
    const labelCtr = geometry.get('labelController');
    labelCtr.labelsContainer = this.container;
    this.plot.canvas.draw();
  }

  public hide() {
    this.container.set('visible', false);
    this.plot.canvas.draw();
  }

  public show() {
    this.container.set('visible', true);
    this.plot.canvas.draw();
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
    this.destroyed = true;
  }

  public getBBox() {}

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = clone(theme.label.style);
    if (!labelStyle.fontSize) {
      labelStyle.fontSize = 11;
    }
    labelStyle.lineHeight = labelStyle.fontSize;
    labelStyle.stroke = null;
    return {
      position: 'outer',
      offsetX: 0,
      offsetY: 0,
      style: labelStyle,
      adjustColor: true,
      adjustPosition: true,
    };
  }

  private getPosition(shape) {
    const coord = shape.get('coord');
    const data = shape.get('origin')._origin;
    let point;
    let angle;
    if (data.depth >= 1) {
      const points = shape.get('origin').points;
      const x = (points[0].x + points[1].x + points[2].x + points[3].x) / 4;
      const y = (points[0].y + points[1].y + points[2].y + points[3].y) / 4;
      point = coord.convertPoint({ x, y });
      angle = getPointAngle(coord, { x: point.x, y: point.y });
    } else {
      const bbox = shape.getBBox();
      const x = bbox.minX + bbox.width / 2;
      const y = bbox.minY + bbox.height / 2;
      point = { x, y };
      angle = 0;
    }

    return {
      x: point.x,
      y: point.y,
      angle,
    };
  }

  private getValue(shape) {
    const { colorField } = this.plot.options;
    let text = shape.get('origin')._origin[colorField];
    if (this.plot.options.label && this.plot.options.label.field) {
      text = shape.get('origin')._origin[this.plot.options.label.field];
    }
    const values = String(text).split(' ');
    if (values.length > 1) {
      return values.join('\n');
    }
    return values[0];
  }

  private getRotate(angle) {
    let rotate = (angle * 180) / Math.PI;
    if (rotate) {
      if (rotate > 90) {
        rotate = rotate - 180;
      } else if (rotate < -90) {
        rotate = rotate + 180;
      }
    }
    return (rotate / 180) * Math.PI;
  }
}
