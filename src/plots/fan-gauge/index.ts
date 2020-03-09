import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import FanGaugeLayer, { FanGaugeLayerConfig } from './layer';

export interface FanGaugeConfig extends FanGaugeLayerConfig, PlotConfig {}

export default class FanGauge extends BasePlot<FanGaugeConfig> {
  public static getDefaultOptions: typeof FanGaugeLayer.getDefaultOptions = FanGaugeLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'fanGauge';
    super.createLayers(layerProps);
  }
}
