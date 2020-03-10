import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption, Label } from '../../interface/config';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';
import StackBarLabel from './component/label';

export interface StackedBarViewConfig extends BarViewConfig {
  stackField: string;
}

export interface StackedBarLayerConfig extends StackedBarViewConfig, LayerConfig {}

export default class StackedBarLayer<T extends StackedBarLayerConfig = StackedBarLayerConfig> extends BaseBarLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
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
          visible: true,
        },
        label: {
          visible: true,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: true,
          offset: 12,
        },
      },
      yAxis: {
        visible: true,
        autoRotateTitle: true,
        grid: {
          visible: false,
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
          visible: false,
          offset: 12,
        },
      },
      legend: {
        visible: true,
        position: 'top-left',
        offsetY: 0,
      },
    });
  }

  public type: string = 'stackedBar';

  protected adjustBar(bar: ElementOption) {
    bar.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected renderLabel() {
    const { scales } = this.config;
    const { yField } = this.options;
    const scale = scales[yField];
    if (this.options.label && this.options.label.visible) {
      const label = new StackBarLabel({
        view: this.view,
        plot: this,
        formatter: scale.formatter,
        ...this.options.label,
      });
      label.render();
    }
  }
}

registerPlotType('stackedBar', StackedBarLayer);
