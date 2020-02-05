import { each, isArray, deepMix, clone } from '@antv/util';
import { Group, BBox, Shape } from '@antv/g';
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

export interface RangedBarLabelConfig {
  visible: boolean;
  position?: 'outer' | 'inner';
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  leftStyle?: any;
  rightStyle?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IRangedBarLabel extends RangedBarLabelConfig {
  view: View;
  plot: any;
}

export default class RangedBarLabel {
  public options: RangedBarLabelConfig;
  private plot: any;
  private view: View;
  private container: Group;

  constructor(cfg: IRangedBarLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    this.init();
  }

  public init() {
    const geomContainer = this.view.get('elements')[0].get('container');
    this.container = geomContainer.addGroup();
  }

  public render() {
    const shapes = this.view.get('elements')[0].getShapes();
    each(shapes, (shape) => {
      const positions = this.getPosition(shape);
      const values = this.getValue(shape);
      const textAlign = this.getTextAlign();
      each(positions, (pos, i) => {
        const style = i === 0 ? this.options.leftStyle : this.options.rightStyle;
        const color = this.getTextColor(shape, i);
        const formatter = this.options.formatter;
        const content = formatter ? formatter(values[i]) : values[i];
        this.container.addShape('text', {
          attrs: deepMix(
            style,
            {
              x: pos.x,
              y: pos.y,
              text: content,
              fill: color,
              textAlign: textAlign[i],
              textBaseline: 'middle',
            },
            {}
          ),
        });
      });
    });

    this.plot.canvas.draw();
  }

  public hide() {}

  public show() {}

  public clear() {}

  public destory() {}

  public getBBox() {}

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      position: 'outer',
      offsetX: DEFAULT_OFFSET,
      offsetY: 0,
      leftStyle: clone(labelStyle),
      rightStyle: clone(labelStyle),
      adjustColor: true,
      adjustPosition: false,
    };
  }

  private getPosition(shape) {
    const bbox = shape.getBBox();
    const { offsetX, offsetY } = this.options;
    const y = bbox.minY + bbox.height / 2 + offsetY;
    let x1, x2;
    if (this.options.position === 'outer') {
      x1 = bbox.minX - offsetX;
      x2 = bbox.maxX + offsetX;
    } else {
      x1 = bbox.minX + offsetX;
      x2 = bbox.maxX - offsetX;
    }
    return [
      { x: x1, y },
      { x: x2, y },
    ];
  }

  private getValue(shape) {
    const { xField } = this.plot.options;
    return shape.get('origin')._origin[xField];
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
    const defaultColor = index === 0 ? this.options.leftStyle : this.options.rightStyle;
    return defaultColor;
  }
}
