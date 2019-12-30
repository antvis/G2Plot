import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';
import * as _ from '@antv/util';
import { VALUE_FIELD, IS_TOTAL } from '../../layer';

export interface DiffLabelcfg {
  view: View;
  fields: string[];
  formatter: (text: string, item: object, idx: number) => string;
  style?: {
    fill?: string;
    stroke?: string;
    strokeOpacity?: number;
    [k: string]: any;
  };
}

function getDefaultCfg() {
  return {
    fill: '#fff',
    fontSize: 12,
    lineHeight: 12,
    stroke: 'rgba(0, 0, 0, 0.45)',
  };
}

export default class DiffLabel {
  private view: View;
  private fields: string[];
  private container: Group;
  private formatter: (text: string, item: object, idx: number) => string;
  private textAttrs: object = {};

  constructor(cfg: DiffLabelcfg) {
    this.view = cfg.view;
    this.fields = cfg.fields;
    this.formatter = cfg.formatter;
    this.textAttrs = _.mix(getDefaultCfg(), cfg.style);

    this._init();
  }

  /** 绘制辅助labels */
  public draw() {
    if (!this.view || this.view.destroyed) {
      return;
    }
    const data = _.clone(this.view.get('data'));
    this.container = this.view.get('frontgroundGroup').addGroup();
    const shapes = this.view
      .get('elements')[0]
      .getShapes()
      .filter((s) => s.name === 'interval');
    const labelsGroup = new Group();

    _.each(shapes, (shape, idx) => {
      if (!shape.get('origin')) return;
      const _origin = shape.get('origin')._origin;
      const shapeBox: BBox = shape.getBBox();
      const values = _origin[VALUE_FIELD];
      let diff = values;
      if (_.isArray(values)) {
        diff = values[1] - values[0];
      }
      diff = diff > 0 ? `+${diff}` : diff;
      /** is total, total do not need `+` sign */
      if (_origin[IS_TOTAL]) {
        diff = values[0] - values[1];
      }
      let formattedText = diff;
      if (this.formatter) {
        const color = shapes[idx].attr('fill');
        formattedText = this.formatter(`${diff}`, { _origin: data[idx], color }, idx);
      }
      const text = labelsGroup.addShape('text', {
        attrs: {
          text: formattedText,
          textBaseline: 'middle',
          textAlign: 'center',
          x: (shapeBox.minX + shapeBox.maxX) / 2,
          y: (shapeBox.minY + shapeBox.maxY) / 2,
          ...this.textAttrs,
        },
      });
      if (text.getBBox().height > shapeBox.height) {
        text.set('visible', false);
      }
    });
    this.container.add(labelsGroup);
    this.view.get('canvas').draw();
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  private _init() {
    this.view.on('beforerender', () => {
      this.clear();
    });

    this.view.on('afterrender', () => {
      this.draw();
    });
  }
}
