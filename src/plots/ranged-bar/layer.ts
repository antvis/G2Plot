import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';
import RangedBarLabel, { RangedBarLabelConfig } from './component/label';
import './animation';

export interface RangedBarViewConfig extends BarViewConfig {
  data: any; // todo: 补上data类型定义
  label: RangedBarLabelConfig;
}

export interface RangedBarLayerConfig extends RangedBarViewConfig, LayerConfig {}

export default class RangedBarLayer extends BaseBarLayer<RangedBarLayerConfig> {
  public static getDefaultOptions(): Partial<RangedBarViewConfig> {
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

  public type: string = 'rangedBar';

  public afterRender() {
    if (this.options.label && this.options.label.visible) {
      const label = new RangedBarLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
    super.afterRender();
  }

  protected extractLabel() {}

  protected animation() {
    super.animation();
    this.bar.animate = {
      appear: {
        animation: 'clipInFromCenter',
        duration: 600,
      },
    };
  }
}

registerPlotType('rangedBar', RangedBarLayer);
