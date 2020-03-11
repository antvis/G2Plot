import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import HistogramLayer, { HistogramViewConfig } from './layer';

export interface HistogramConfig extends HistogramViewConfig, PlotConfig {}

export default class Histogram extends BasePlot<HistogramConfig> {
  public static getDefaultOptions: typeof HistogramLayer.getDefaultOptions = HistogramLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'histogram';
    super.createLayers(layerProps);
  }
}
