import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import TinyAreaLayer, { TinyAreaLayerConfig } from './layer';

export interface TinyAreaConfig extends TinyAreaLayerConfig, PlotCfg {}

export default class TinyArea<T extends TinyAreaConfig = TinyAreaConfig> extends BasePlot<T> {
  public static getDefaultOptions = TinyAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'tinyArea';
    super.createLayers(layerProps);
  }
}
