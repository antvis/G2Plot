import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import LiquidLayer, { LiquidLayerConfig } from './layer';

export interface LiquidConfig extends LiquidLayerConfig, PlotCfg {}

export default class Liquid<T extends LiquidConfig = LiquidConfig> extends BasePlot<T> {
  public static getDefaultProps = LiquidLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'liquid';
    super.createLayers(layerProps);
  }
}
