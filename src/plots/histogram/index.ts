import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import HistogramLayer, { HistogramViewConfig } from './layer';

export interface HistogramConfig extends HistogramViewConfig, PlotConfig {}

export default class Histogram<T extends HistogramConfig = HistogramConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof HistogramLayer.getDefaultOptions = HistogramLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'histogram';
    super.createLayers(layerProps);
  }
}
