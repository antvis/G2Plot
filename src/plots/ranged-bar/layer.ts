import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';

export interface RangedBarViewConfig extends BarViewConfig {
    data: any; // todo: 补上data类型定义
}

export interface RangedBarLayerConfig extends RangedBarViewConfig, LayerConfig {}

export default class RangedBarLayer extends BaseBarLayer<RangedBarLayerConfig> {
  public static getDefaultOptions(): Partial<RangedBarViewConfig> {
    return _.deepMix({
       
    }, super.getDefaultOptions(), {});
  }

  public type: string = 'rangedBar';

  protected extractLabel(){}
}

registerPlotType('rangedBar', RangedBarLayer);