import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import PercentStackedBarLayer, { PercentStackedBarViewConfig } from '../../percent-stacked-bar/layer';

export interface PercentageStackBarConfig extends PercentStackedBarViewConfig, PlotConfig {}

export default class PercentageStackBar extends BasePlot<PercentageStackBarConfig> {
  public static getDefaultOptions: typeof PercentStackedBarLayer.getDefaultOptions =
    PercentStackedBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'percentStackedBar';
    super.createLayers(layerProps);
    warning(false, 'Please use "PercentStackedBar" instead of "PercentageStackBar" which was not recommended.');
  }
}
