import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GaugeLayer, { GaugeLayerConfig } from './layer';

export interface GaugeConfig extends GaugeLayerConfig, PlotConfig {}

export default class Gauge<T extends GaugeConfig = GaugeConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof GaugeLayer.getDefaultOptions = GaugeLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'gauge';
    super.createLayers(layerProps);
  }
}
