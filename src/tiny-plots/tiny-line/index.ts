import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import TinyLineLayer, { TinyLineLayerConfig } from './layer';

export interface TinyLineConfig extends TinyLineLayerConfig, PlotCfg {}

export default class TinyLine<T extends TinyLineConfig = TinyLineConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof TinyLineLayer.getDefaultOptions = TinyLineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'tinyLine';
    super.createLayers(layerProps);
  }
}
