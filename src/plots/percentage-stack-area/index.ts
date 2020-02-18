import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import PercentageStackAreaLayer, { PercentageStackAreaLayerConfig } from './layer';

export interface PercentageStackAreaConfig extends PercentageStackAreaLayerConfig, PlotConfig {}

export default class PercentageStackArea<
  T extends PercentageStackAreaConfig = PercentageStackAreaConfig
> extends BasePlot<T> {
  public static getDefaultOptions: typeof PercentageStackAreaLayer.getDefaultOptions =
    PercentageStackAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'percentageStackArea';
    super.createLayers(layerProps);
  }
}
