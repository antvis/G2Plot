import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';
import RangeBarLabel, { RangeBarLabelConfig } from './component/label';
import { setShapeCache } from './animation';

export interface RangeBarViewConfig extends BarViewConfig {
  label?: RangeBarLabelConfig;
}

export interface RangeBarLayerConfig extends RangeBarViewConfig, LayerConfig {}

export default class RangeBarLayer extends BaseBarLayer<RangeBarLayerConfig> {
  public static getDefaultOptions(): Partial<RangeBarViewConfig> {
    return _.deepMix(
      super.getDefaultOptions(),
      {
        label: {
          visible: true,
          position: 'outer',
        },
        xAxis: {
          visible: true,
          autoHideLabel: false,
          autoRotateLabel: false,
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
          },
          title: {
            visible: true,
            offset: 12,
          },
        },
        yAxis: {
          visible: true,
          autoHideLabel: false,
          autoRotateLabel: false,
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
          },
          title: {
            visible: false,
            offset: 12,
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
    _.each(geoms, (geom) => {
      const elements = geom.elements;
      _.each(elements, (ele) => {
        shapeCaches.push(ele.shape);
      });
    });
    setShapeCache(shapeCaches);
    super.afterRender();
  }

  protected renderLabel(){
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
    this.bar.animate = {
      appear: {
        animation: 'clipInFromCenter',
        duration: 600,
      },
      update: {
        animation: 'updateFromCenter',
        duration: 600,
      },
    };
  }
}

registerPlotType('rangeBar', RangeBarLayer);
