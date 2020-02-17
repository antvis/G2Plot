import { each, deepMix, clone,find } from '@antv/util';
import { IGroup } from '@antv/g-canvas';
import { View } from '@antv/g2';
import { rgb2arr } from '../../../util/color';

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

export interface RangeBarLabelConfig {
  visible: boolean;
  position?: 'outer' | 'inner';
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  leftStyle?: any;
  rightStyle?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IRangeBarLabel extends RangeBarLabelConfig {
  view: View;
  plot: any;
}

export default class RangeBarLabel {
  public options: RangeBarLabelConfig;
  public destroyed: boolean = false;
  private plot: any;
  private view: View;
  private container: IGroup;

  constructor(cfg: IRangeBarLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    if (!this.options.leftStyle) {
      this.options.leftStyle = this.options.style;
    }
    if (!this.options.rightStyle) {
      this.options.rightStyle = this.options.style;
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
    const geometry = this.getGeometry();
    const elements = geometry.elements;
    each(elements, (ele) => {
      const { shape } = ele;
      const positions = this.getPosition(shape);
      const values = this.getValue(shape);
      const textAlign = this.getTextAlign();
      const labels = [];
      each(positions, (pos, i) => {
        const style = i === 0 ? this.options.leftStyle : this.options.rightStyle;
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
            textAlign: textAlign[i],
            textBaseline: 'middle',
          }),
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

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      position: 'outer',
      offsetX: DEFAULT_OFFSET,
      offsetY: 0,
      style: clone(labelStyle),
      adjustColor: true,
      adjustPosition: true,
    };
  }

  private getPosition(shape) {
    const bbox = shape.getBBox();
    const { minX, maxX, minY, height, width } = bbox;
    const { offsetX, offsetY } = this.options;
    const y = minY + height / 2 + offsetY;
    let x1, x2;
    if (this.options.position === 'outer') {
      x1 = minX - offsetX;
      x2 = maxX + offsetX;
    } else {
      x1 = minX + offsetX;
      x2 = maxX - offsetX;
    }
    return [
      { x: x1, y },
      { x: x2, y },
    ];
  }

  private getValue(shape) {
    const { xField } = this.plot.options;
    return shape.get('origin').data[xField];
  }

  private getTextAlign() {
    if (this.options.position === 'outer') {
      return ['right', 'left'];
    } else {
      return ['left', 'right'];
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
    const defaultColor = index === 0 ? this.options.leftStyle.fill : this.options.rightStyle.fill;
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
    const shapeMinX = origin.x[0];
    const shapeMaxX = origin.x[1];
    const shapeWidth = Math.abs(shapeMaxX - shapeMinX);
    const panelRange = this.view.coordinateBBox;
    const boxes = [la.getBBox(), lb.getBBox()];
    let ax = la.attr('x');
    let bx = lb.attr('x');
    if (this.options.adjustPosition && this.options.position === 'inner') {
      const totalLength = boxes[0].width + boxes[1].width;
      const isOverlap = boxes[0].maxX - boxes[1].minX > 2;
      const isTooShort = totalLength > shapeWidth;
      if (isOverlap || isTooShort) {
        ax = shapeMinX - this.options.offsetX;
        la.attr('fill', this.options.leftStyle.fill);
        la.attr('textAlign', 'right');
        boxes[0] = la.getBBox();
        bx = shapeMaxX + this.options.offsetX;
        lb.attr('fill', this.options.rightStyle.fill);
        lb.attr('textAlign', 'left');
        boxes[1] = lb.getBBox();
      }
    }
    if (boxes[0].minX < panelRange.minX) {
      ax = panelRange.minX + DEFAULT_OFFSET;
      la.attr('textAlign', 'left');
    }
    la.attr('x', ax);
    lb.attr('x', bx);
    this.plot.canvas.draw();
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'interval');
  }
  
}
