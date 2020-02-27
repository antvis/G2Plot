/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import { View } from '@antv/g2';
import * as _ from '@antv/util';
import { VALUE_FIELD, IS_TOTAL } from '../../layer';
import { VIEW_LIFE_CIRCLE } from '@antv/g2/lib/constant';
import { IGroup } from '@antv/g-base';

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
  private container: IGroup;
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
    const data = _.clone(this.view.getData());
    this.container = this.view.foregroundGroup.addGroup();
    const shapes = this.view.geometries[0].elements.map((value) => value.shape);
    _.each(shapes, (shape, idx) => {
      if (!shape.cfg.origin) return;
      const _origin = shape.cfg.origin.data;
      const shapeBox = shape.getBBox();
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
      const text = this.container.addShape('text', {
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
    this.view.getCanvas().draw();
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  private _init() {
    this.view.on(VIEW_LIFE_CIRCLE.BEFORE_RENDER, () => {
      this.clear();
    });

    this.view.on(VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
      this.draw();
    });
  }
}
