import { deepMix, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseColumnLayer from '../column/layer';
import { ColumnViewConfig } from '../column/interface';
import RangeColumnLabel, { RangeColumnLabelConfig } from './component/label';
import { setShapeCache } from './animation';

export interface RangeColumnViewConfig extends ColumnViewConfig {
  label?: RangeColumnLabelConfig;
}

export interface RangeColumnLayerConfig extends RangeColumnViewConfig, LayerConfig {}

export default class RangeColumnLayer extends BaseColumnLayer<RangeColumnLayerConfig> {
  public static getDefaultOptions(): Partial<RangeColumnViewConfig> {
    return deepMix(
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
    this.renderLabel();
    // 为更新动画缓存shape
    const shapeCaches = [];
    const geoms = this.view.geometries;
    each(geoms, (geom) => {
      const elements = geom.elements;
      each(elements, (ele) => {
        shapeCaches.push(ele.shape);
      });
    });
    setShapeCache(shapeCaches);
    super.afterRender();
  }

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

  protected renderLabel() {
    if (this.options.label && this.options.label.visible) {
      const label = new RangeColumnLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
  }
}

registerPlotType('rangeColumn', RangeColumnLayer);
