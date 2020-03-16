import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import DensityLayer, { DensityViewConfig } from './layer';

export interface DensityConfig extends DensityViewConfig, PlotConfig {}

export default class Density extends BasePlot<DensityConfig> {
  public static getDefaultOptions: typeof DensityLayer.getDefaultOptions = DensityLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'density';
    super.createLayers(layerProps);
  }
}
