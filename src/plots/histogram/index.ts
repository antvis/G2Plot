import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import HistogramLayer, { HistogramLayerConfig } from './layer';

export interface HistogramConfig extends HistogramLayerConfig, PlotCfg {}

export default class Histogram<T extends HistogramConfig = HistogramConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof HistogramLayer.getDefaultOptions = HistogramLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'histogram';
    super.createLayers(layerProps);
  }
}
