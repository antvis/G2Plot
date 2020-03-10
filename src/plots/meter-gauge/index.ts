import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import MeterGaugeLayer, { MeterGaugeLayerConfig } from './layer';

export interface MeterGaugeConfig extends MeterGaugeLayerConfig, PlotConfig {}

export default class MeterGauge extends BasePlot<MeterGaugeConfig> {
  public static getDefaultOptions: typeof MeterGaugeLayer.getDefaultOptions = MeterGaugeLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'meterGauge';
    super.createLayers(layerProps);
  }
}
