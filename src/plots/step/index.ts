import * as _ from '@antv/util';
import { LineConfig, PlotConfig } from '../..';
import { StepViewConfig, StepLayer } from './layer';
import BasePlot from '../../base/plot';

export interface StepConfig extends StepViewConfig, PlotConfig {}

export default class Step extends BasePlot<LineConfig> {
  public static getDefaultOptions: typeof StepLayer.getDefaultOptions = StepLayer.getDefaultOptions;

  /**
   * 复写父类方法
   * @param props
   */
  protected createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'step';
    super.createLayers(layerProps);
  }
}
