import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import PercentStackedAreaLayer, { PercentStackedAreaLayerConfig } from './layer';

export interface PercentStackedAreaConfig extends PercentStackedAreaLayerConfig, PlotConfig {}

export default class PercentStackedArea extends BasePlot<PercentStackedAreaConfig> {
  public static getDefaultOptions: typeof PercentStackedAreaLayer.getDefaultOptions =
    PercentStackedAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'percentStackedArea';
    super.createLayers(layerProps);
  }
}
