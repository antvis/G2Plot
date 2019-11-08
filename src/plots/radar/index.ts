import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RadarLayer, { RadarViewConfig } from './layer';

export interface RadarConfig extends RadarViewConfig, PlotConfig {}

export default class Radar<T extends RadarConfig = RadarConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof RadarLayer.getDefaultOptions = RadarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'radar';
    super.createLayers(layerProps);
  }
}
