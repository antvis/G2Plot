import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import PercentStackedAreaLayer, { PercentStackedAreaViewConfig } from '../../percent-stacked-area/layer';

export interface PercentageStackAreaConfig extends PercentStackedAreaViewConfig, PlotConfig {}

export default class PercentageStackArea extends BasePlot<PercentageStackAreaConfig> {
  public static getDefaultOptions: typeof PercentStackedAreaLayer.getDefaultOptions =
    PercentStackedAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'percentStackedArea';
    super.createLayers(layerProps);
    warning(false, 'Please use "PercentStackedArea" instead of "PercentageStackArea" which was not recommended.');
  }
}
