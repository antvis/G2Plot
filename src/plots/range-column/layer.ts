import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';
import RangeColumnLabel, { RangeColumnLabelConfig } from './component/label';
import { setShapeCache } from './animation';

export interface RangeColumnViewConfig extends ColumnViewConfig {
  label?: RangeColumnLabelConfig;
}

export interface RangeColumnLayerConfig extends RangeColumnViewConfig, LayerConfig {}

export default class RangeColumnLayer extends BaseColumnLayer<RangeColumnLayerConfig> {
  public static getDefaultOptions(): Partial<RangeColumnViewConfig> {
    return _.deepMix(
      super.getDefaultOptions(),
      {
        label: {
          visible: true,
          position: 'outer',
        },
      },
      {}
    );
  }

  public type: string = 'rangeColumn';

  public afterRender() {
    if (this.options.label && this.options.label.visible) {
      const label = new RangeColumnLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
    // 为更新动画缓存shape
    const shapeCaches = [];
    const geoms = this.view.get('elements');
    _.each(geoms, (geom) => {
      const shapes = geom.getShapes();
      _.each(shapes, (shape) => {
        shapeCaches.push(shape);
      });
    });
    setShapeCache(shapeCaches);
    super.afterRender();
  }

  protected extractLabel() {}

  protected animation() {
    super.animation();
    this.column.animate = {
      appear: {
        animation: 'clipInFromCenterVertical',
        duration: 600,
      },
      update: {
        animation: 'updateFromCenterVertical',
        duration: 600,
      },
    };
  }
}

registerPlotType('rangeColumn', RangeColumnLayer);
