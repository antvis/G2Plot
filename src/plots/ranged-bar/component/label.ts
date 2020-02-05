import { each, isArray, deepMix } from '@antv/util';
import { Group, BBox, Shape } from '@antv/g';
import { View } from '@antv/g2';

export interface RangedBarLabelConfig {
  visible: boolean;
  position: 'outer' | 'inner';
  formatter?: () => string;
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
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix({}, defaultOptions, cfg);
    this.view = cfg.view;
    this.plot = cfg.plot;
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
        const text = this.container.addShape('text', {
          attrs: {
            x: pos.x,
            y: pos.y,
            text: values[i],
            fontSize: 12,
            fill: '#000000',
            textAlign: textAlign[i],
            textBaseline: 'middle',
          },
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
    return {};
  }

  private getPosition(shape) {
    const bbox = shape.getBBox();
    const offset = 8;
    const y = bbox.minY + bbox.height / 2;
    let x1, x2;
    if (this.options.position === 'outer') {
      x1 = bbox.minX - offset;
      x2 = bbox.maxX + offset;
    } else {
      x1 = bbox.minX + offset;
      x2 = bbox.maxX - offset;
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
}
