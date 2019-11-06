import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import DensityLayer, { DensityLayerConfig } from './layer';

export interface DensityConfig extends DensityLayerConfig, PlotCfg {}

export default class Density<T extends DensityConfig = DensityConfig> extends BasePlot<T> {
  public static getDefaultProps = DensityLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'density';
    super.createLayers(layerProps);
  }
}
