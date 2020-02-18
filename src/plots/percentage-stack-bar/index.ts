import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import PercentageStackBarLayer, { PercentageStackBarLayerConfig } from './layer';

export interface PercentageStackBarConfig extends PercentageStackBarLayerConfig, PlotConfig {}

export default class PercentageStackBar<T extends PercentageStackBarConfig = PercentageStackBarConfig> extends BasePlot<
  T
> {
  public static getDefaultOptions: typeof PercentageStackBarLayer.getDefaultOptions =
    PercentageStackBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'percentageStackBar';
    super.createLayers(layerProps);
  }
}
