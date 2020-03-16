import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import StackedBarLayer, { StackedBarViewConfig } from '../../stacked-bar/layer';

export interface StackBarConfig extends StackedBarViewConfig, PlotConfig {}

export default class StackBar extends BasePlot<StackBarConfig> {
  public static getDefaultOptions: typeof StackedBarLayer.getDefaultOptions = StackedBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedBar';
    super.createLayers(layerProps);
    warning(false, 'Please use "StackedBar" instead of "StackBar" which was not recommended.');
  }
}
