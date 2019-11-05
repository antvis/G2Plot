import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import HistogramLayer, { HistogramLayerConfig } from './layer-refactor';

export interface HistogramConfig extends HistogramLayerConfig, PlotCfg {}


export default class Histogram<T extends HistogramConfig = HistogramConfig> extends BasePlot<T> {
  public static getDefaultProps = HistogramLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'histogram';
    super.createLayers(layerProps);
  }
}