import { deepMix } from '@antv/util';
import { PlotConfig } from '../..';
import { StepLineViewConfig, StepLineLayer } from './layer';
import BasePlot from '../../base/plot';

export interface StepLineConfig extends StepLineViewConfig, PlotConfig {}

export default class StepLine extends BasePlot<StepLineConfig> {
  public static getDefaultOptions: typeof StepLineLayer.getDefaultOptions = StepLineLayer.getDefaultOptions;

  /**
   * 复写父类方法
   * @param props
   */
  protected createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'step-line';
    super.createLayers(layerProps);
  }
}
