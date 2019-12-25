import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import LiquidLayer, { LiquidViewConfig } from './layer-dev';

export interface LiquidConfig extends LiquidViewConfig, PlotConfig {}

export default class Liquid extends BasePlot<LiquidConfig> {
  public static getDefaultOptions: typeof LiquidLayer.getDefaultOptions = LiquidLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'liquid';
    super.createLayers(layerProps);
  }
}
