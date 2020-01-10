import LineLayer, { LineLayerConfig, LineViewConfig } from '../line/layer';
import { LayerConfig } from '../..';
import { registerPlotType } from '../../base/global';
import * as _ from '@antv/util';

export interface StepViewConfig extends LineViewConfig {
  readonly step?: 'hv' | 'vh' | 'vhv' | 'hvh'; // 默认为 hv
}

export interface StepLayerConfig extends StepViewConfig, LayerConfig {}

export class StepLayer extends LineLayer<StepLayerConfig> {

  public type: string = 'step'; // 覆写父类的 type

  public static getDefaultOptions(): Partial<LineLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
      step: 'hv',
    });
  }
}

registerPlotType('step', StepLayer);
