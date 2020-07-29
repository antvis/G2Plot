import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import RoseLayer, { RoseViewConfig } from '../rose/layer';

export interface StackedRoseViewConfig extends RoseViewConfig {
  stackField: string;
}

export interface StackedRoseLayerConfig extends StackedRoseViewConfig, LayerConfig {}

export default class StackedRoseLayer<T extends StackedRoseLayerConfig = StackedRoseLayerConfig> extends RoseLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: true,
          alignTick: false,
          style: {
            lineWidth: 0.5,
          },
        },
        label: {
          offset: 5,
          autoRotate: true,
        },
      },
      yAxis: {
        visible: false,
      },
    });
  }

  public type: string = 'stackedRose';
  public baseType: string = 'rose';

  public getColorScale() {
    const { stackField } = this.options;
    return this.view.getScaleByField(stackField);
  }

  protected adjustRoseAdjust() {
    return [
      {
        type: 'stack',
      },
    ];
  }

  protected geometryTooltip() {
    this.rose.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.rose.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.rose.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.rose.tooltip.fields = [this.options.radiusField, this.options.categoryField, this.options.stackField];
      }
    }
  }
}

registerPlotType('stackedRose', StackedRoseLayer);
