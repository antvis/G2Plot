import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import GaugeLayer, { GaugeLayerConfig } from './layer';

export interface GaugeConfig extends GaugeLayerConfig, PlotCfg {}

export default class Gauge<T extends GaugeConfig = GaugeConfig> extends BasePlot<T> {
  public static getDefaultProps = GaugeLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'gauge';
    super.createLayers(layerProps);
  }
}
