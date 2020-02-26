import { each, deepMix, clone } from '@antv/util';
import { Group } from '@antv/g';
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

function getPointRadius(coord, point): number {
    const center = coord.getCenter();
    const r = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
    return r;
}

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
  adjustColor?: boolean;
  adjustPosition?: boolean;
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
      const positions = this.getPosition(shape);
      const values = this.getValue(shape);
      const rotate = this.getRotate(positions.angle);
      this.container.addShape('text',{
          attrs:{
              x: positions.x,
              y:positions.y,
              text: values,
              fontSize: 11,
              fill:'#000000',
              textAlign:'center',
              textBaseline:'middle',
              rotate
          }
      });
      //shape.set('labelShapes', labels);
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
      const coord = shape.get('coord');
      const { center}  = coord;
      const xPoints = shape.get('origin').x;
      const yPoints = shape.get('origin').y;
      const midX_0 = xPoints[0] + (xPoints[1]-xPoints[1]) / 2;
      const midX_1 = xPoints[3] + (xPoints[2]-xPoints[3]) / 2;
      const midY_0 = yPoints[1] + (yPoints[0]-yPoints[1]) / 2;
      const midY_1 = yPoints[2] + (yPoints[3]-yPoints[2]) / 2;
      const x = midX_0 + (midX_1 - midX_0) / 2;
      const y = midY_0 + (midY_1 - midY_0) / 2;
      const radius = getPointRadius(coord,{x,y});
      const angle = getPointAngle(coord,{x,y});
      
      return {
          x: center.x + Math.cos(angle)*radius,
          y: center.y + Math.sin(angle)*radius,
          angle
      };
  }

  private getValue(shape) {
    const { colorField } = this.plot.options;
    return shape.get('origin')._origin[colorField];
  }

  private getRotate(angle){
    let rotate = angle * 180 / Math.PI;
    rotate += 90;
    if (rotate) {
        if (rotate > 90) {
          rotate = rotate - 180;
        } else if (rotate < -90) {
          rotate = rotate + 180;
        }
      }
      return rotate / 180 * Math.PI;
  }


  private getTextColor(shape, index) {
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
    const panelRange = this.view.get('panelRange');
    const boxes = [la.getBBox(), lb.getBBox()];
    let ax = la.attr('x');
    let bx = lb.attr('x');
    if (this.options.adjustPosition) {
      const totalLength = boxes[0].width + boxes[1].width;
      const isOverlap = boxes[0].maxX - boxes[1].minX > 2;
      const isTooShort = totalLength > shapeWidth;
      if (isOverlap || isTooShort) {
        ax = shapeMinX - this.options.offsetX;
        la.attr('fill', this.options.style.fill);
        la.attr('textAlign', 'right');
        boxes[0] = la.getBBox();
        bx = shapeMaxX + this.options.offsetX;
        lb.attr('fill', this.options.style.fill);
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
}
