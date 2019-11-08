import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import DensityLayer, { DensityViewConfig } from './layer';

export interface DensityConfig extends DensityViewConfig, PlotConfig {}

export default class Density<T extends DensityConfig = DensityConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof DensityLayer.getDefaultOptions = DensityLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'density';
    super.createLayers(layerProps);
  }
}
