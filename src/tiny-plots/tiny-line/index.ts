import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import TinyLineLayer, { TinyLineViewConfig } from './layer';

export interface TinyLineConfig extends TinyLineViewConfig, PlotConfig {}

export default class TinyLine<T extends TinyLineConfig = TinyLineConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof TinyLineLayer.getDefaultOptions = TinyLineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'tinyLine';
    super.createLayers(layerProps);
  }
}
