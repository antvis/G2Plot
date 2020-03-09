import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import RoseLayer, { RoseViewConfig } from '../rose/layer';

export interface GroupedRoseViewConfig extends RoseViewConfig {
  groupField: string;
}

export interface GroupedRoseLayerConfig extends GroupedRoseViewConfig, LayerConfig {}

export default class GroupedRoseLayer<
  T extends GroupedRoseLayerConfig = GroupedRoseLayerConfig
> extends RoseLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
        xAxis: {
            visible: true,
            autoRotateLabel: true,
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
            },
          },
          yAxis: {
            visible: false,
          },
    });
  }

  public type: string = 'groupedRose';

  protected adjustRoseAdjust() {
    return [
        {
          type: 'dodge',
          marginRatio: 1,
        },
      ];
  }  
}

registerPlotType('groupedRose', GroupedRoseLayer);
