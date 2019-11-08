import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import TinyAreaLayer, { TinyAreaViewConfig } from './layer';

export interface TinyAreaConfig extends TinyAreaViewConfig, PlotConfig {}

export default class TinyArea<T extends TinyAreaConfig = TinyAreaConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof TinyAreaLayer.getDefaultOptions = TinyAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'tinyArea';
    super.createLayers(layerProps);
  }
}
