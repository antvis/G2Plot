import { deepMix, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBarLayer from '../bar/layer';
import { BarViewConfig } from '../bar/interface';
import RangeBarLabel, { RangeBarLabelConfig } from './component/label';
import { setShapeCache } from './animation';

export interface RangeBarViewConfig extends BarViewConfig {
  label?: RangeBarLabelConfig;
}

export interface RangeBarLayerConfig extends RangeBarViewConfig, LayerConfig {}

export default class RangeBarLayer extends BaseBarLayer<RangeBarLayerConfig> {
  public static getDefaultOptions(): Partial<RangeBarViewConfig> {
    return deepMix(
      super.getDefaultOptions(),
      {
        label: {
          visible: true,
          position: 'outer',
        },
        xAxis: {
          visible: true,
          autoRotateTitle: false,
          grid: {
            visible: true,
          },
          line: {
            visible: false,
          },
          tickLine: {
            visible: false,
          },
          label: {
            visible: true,
            autoRotate: true,
            autoHide: true,
          },
          title: {
            visible: true,
            spacing: 12,
          },
        },
        yAxis: {
          visible: true,
          autoRotateTitle: true,
          grid: {
            visible: false,
          },
          line: {
            visible: true,
          },
          tickLine: {
            visible: true,
          },
          label: {
            visible: true,
            autoHide: true,
            autoRotate: false,
          },
          title: {
            visible: false,
            spacing: 12,
          },
        },
      },
      {}
    );
  }

  public type: string = 'rangeBar';

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

  protected renderLabel() {
    if (this.options.label && this.options.label.visible) {
      const label = new RangeBarLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
  }

  protected animation() {
    super.animation();
  }
}

registerPlotType('rangeBar', RangeBarLayer);
