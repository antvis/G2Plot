import { each, deepMix, clone, find } from '@antv/util';
import { View, IGroup, Geometry } from '../../../dependents';
import { rgb2arr } from '../../../util/color';
import BBox from '../../../util/bbox';

const DEFAULT_OFFSET = 8;

function mappingColor(band, gray) {
  let reflect;
  each(band, (b) => {
    const map = b;
    if (gray >= map.from && gray < map.to) {
      reflect = map.color;
    }
  });
  return reflect;
}

export interface RangeColumnLabelConfig {
  visible: boolean;
  position?: 'outer' | 'inner';
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  topStyle?: any;
  bottomStyle?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IRangeColumnLabel extends RangeColumnLabelConfig {
  view: View;
  plot: any;
}

export default class RangeColumnLabel {
  public options: RangeColumnLabelConfig;
  public destroyed: boolean = false;
  private plot: any;
  private view: View;
  private coord: any;
  private container: IGroup;

  constructor(cfg: IRangeColumnLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    if (!this.options.topStyle) {
      this.options.topStyle = this.options.style;
    }
    if (!this.options.bottomStyle) {
      this.options.bottomStyle = this.options.style;
    }
    this.init();
  }

  public init() {
    this.container = this.getGeometry().labelsContainer;
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    const { coordinate, elements } = this.getGeometry();
    this.coord = coordinate;
    each(elements, (ele) => {
      const shape = ele.shape;
      const positions = this.getPosition(shape);
      const values = this.getValue(shape);
      const textBaeline = this.getTextBaseline();
      const labels = [];
      each(positions, (pos, i) => {
        const style = i === 1 ? this.options.topStyle : this.options.bottomStyle;
        const color = this.getTextColor(shape, i);
        if (this.options.position === 'inner' && this.options.adjustColor && color !== 'black') {
          style.stroke = null;
        }
        const formatter = this.options.formatter;
        const content = formatter ? formatter(values[i]) : values[i];
        const label = this.container.addShape('text', {
          attrs: deepMix({}, style, {
            x: pos.x,
            y: pos.y,
            text: content,
            fill: color,
            textAlign: 'center',
            textBaseline: textBaeline[i],
          }),
          name: 'label',
        });
        labels.push(label);
        this.doAnimation(label);
      });
      shape.set('labelShapes', labels);
      this.adjustPosition(labels[0], labels[1], shape);
    });
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

  protected getShapeBbox(shape) {
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

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      position: 'outer',
      offsetX: 0,
      offsetY: DEFAULT_OFFSET,
      style: clone(labelStyle),
      adjustColor: true,
      adjustPosition: true,
    };
  }

  private getPosition(shape) {
    const bbox = this.getShapeBbox(shape);
    const { minX, maxX, minY, maxY, height, width } = bbox;
    const { offsetX, offsetY } = this.options;
    const x = minX + width / 2;
    let y1, y2;
    if (this.options.position === 'outer') {
      y1 = minY - offsetY;
      y2 = maxY + offsetY;
    } else {
      y1 = minY + offsetY;
      y2 = maxY - offsetY;
    }
    return [
      { x: x, y: y2 },
      { x: x, y: y1 },
    ];
  }

  private getValue(shape) {
    const { yField } = this.plot.options;
    return shape.get('origin').data[yField];
  }

  private getTextBaseline() {
    if (this.options.position === 'outer') {
      return ['top', 'bottom'];
    } else {
      return ['bottom', 'top'];
    }
  }

  private getTextColor(shape, index) {
    if (this.options.adjustColor && this.options.position === 'inner') {
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
    const defaultColor = index === 1 ? this.options.topStyle.fill : this.options.bottomStyle.fill;
    return defaultColor;
  }

  private doAnimation(label) {
    if (this.plot.animation && this.plot.animation === false) {
      return;
    }
    label.attr('fillOpacity', 0);
    label.attr('strokeOpacity', 0);
    label.stopAnimate();
    label.animate(
      {
        fillOpacity: 1,
        strokeOpacity: 1,
      },
      800,
      'easeLinear',
      500
    );
  }

  private adjustPosition(la, lb, shape) {
    const origin = shape.get('origin');
    const shapeMinY = origin.y[1];
    const shapeMaxY = origin.y[0];
    const bbox = shape.getBBox();
    const { minX, maxX, minY, height, width } = bbox;
    const shapeHeight = height;
    const panelRange = this.view.coordinateBBox;
    const boxes = [la.getBBox(), lb.getBBox()];
    let ay = la.attr('y');
    let by = lb.attr('y');
    if (this.options.adjustPosition && this.options.position === 'inner') {
      const totalLength = boxes[0].height + boxes[1].height;
      const isOverlap = boxes[1].maxY - boxes[0].minY > 2;
      const isTooShort = totalLength > shapeHeight;
      if (isOverlap || isTooShort) {
        by = shapeMinY - this.options.offsetY;
        lb.attr('fill', this.options.topStyle.fill);
        lb.attr('textBaseline', 'bottom');
        ay = shapeMaxY + this.options.offsetY;
        la.attr('fill', this.options.bottomStyle.fill);
        la.attr('textBaseline', 'top');
        boxes[0] = la.getBBox();
        boxes[1] = lb.getBBox();
      }
    }
    // fixme: textBaseline 取不准bbox
    if (boxes[0].maxY > panelRange.maxY - DEFAULT_OFFSET) {
      ay = panelRange.maxY - DEFAULT_OFFSET / 2;
      la.attr('textBaseline', 'bottom');
    }
    la.attr('y', ay);
    lb.attr('y', by);
    this.plot.canvas.draw();
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'interval') as Geometry;
  }
}
