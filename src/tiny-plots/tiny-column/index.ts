import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import TinyColumnLayer, { TinyColumnLayerConfig } from './layer';

export interface TinyColumnConfig extends TinyColumnLayerConfig, PlotCfg {}

export default class TinyColumn<T extends TinyColumnConfig = TinyColumnConfig> extends BasePlot<T> {
  public static getDefaultOptions = TinyColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'tinyColumn';
    super.createLayers(layerProps);
  }
}
