import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import RoseLayer, { RoseViewConfig } from '../rose/layer';

export interface GroupedRoseViewConfig extends RoseViewConfig {
  groupField: string;
}

export interface GroupedRoseLayerConfig extends GroupedRoseViewConfig, LayerConfig {}

export default class GroupedRoseLayer<T extends GroupedRoseLayerConfig = GroupedRoseLayerConfig> extends RoseLayer<T> {
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

  public type: string = 'groupedRose';

  public getColorScale() {
    const { groupField } = this.options;
    if (groupField) {
      return this.view.getScaleByField(groupField);
    }
  }

  protected adjustRoseAdjust() {
    return [
      {
        type: 'dodge',
        marginRatio: 1,
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
        this.rose.tooltip.fields = [this.options.radiusField, this.options.categoryField, this.options.groupField];
      }
    }
  }
}

registerPlotType('groupedRose', GroupedRoseLayer);
