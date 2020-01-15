import LineLayer, { LineLayerConfig, LineViewConfig } from '../line/layer';
import { LayerConfig } from '../..';
import { registerPlotType } from '../../base/global';
import * as _ from '@antv/util';

export interface StepLineViewConfig extends LineViewConfig {
  readonly step?: 'hv' | 'vh' | 'vhv' | 'hvh'; // 默认为 hv
}

export interface StepLineLayerConfig extends StepLineViewConfig, LayerConfig {}

export class StepLineLayer extends LineLayer<StepLineLayerConfig> {
  public type: string = 'step-line'; // 覆写父类的 type

  public static getDefaultOptions(): Partial<LineLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
      step: 'hv',
    });
  }
}

registerPlotType('step-line', StepLineLayer);
