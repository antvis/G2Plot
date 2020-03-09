import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import RoseLayer, { RoseViewConfig } from '../rose/layer';

export interface StackedRoseViewConfig extends RoseViewConfig {
  stackField: string;
}

export interface StackedRoseLayerConfig extends StackedRoseViewConfig, LayerConfig {}

export default class StackedRoseLayer<
  T extends StackedRoseLayerConfig = StackedRoseLayerConfig
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

  public type: string = 'stackedRose';

  protected adjustRoseAdjust() {
    return [
        {
          type: 'stack',
        },
    ];
  }  
}

registerPlotType('stackedRose', StackedRoseLayer);
