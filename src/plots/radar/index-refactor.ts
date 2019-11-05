import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import RadarLayer, { RadarLayerConfig } from './layer-refactor';

export interface RadarConfig extends RadarLayerConfig, PlotCfg {}

export default class Radar<T extends RadarConfig = RadarConfig> extends BasePlot<T> {
  public static getDefaultProps = RadarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'radar';
    super.createLayers(layerProps);
  }
}
