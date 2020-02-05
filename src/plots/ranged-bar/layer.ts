import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';

export interface RangedBarViewConfig extends BarViewConfig {
  groupField: string;
}

export interface RangedBarLayerConfig extends RangedBarViewConfig, LayerConfig {}

export default class RangedBarLayer extends BaseBarLayer<RangedBarLayerConfig> {
  public static getDefaultOptions(): Partial<RangedBarViewConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {});
  }

  public type: string = 'rangedBar';
}

registerPlotType('rangedBar', RangedBarLayer);
