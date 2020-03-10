import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackedBarLayer, { StackedBarViewConfig } from './layer';

export interface StackedBarConfig extends StackedBarViewConfig, PlotConfig {}

export default class StackedBar extends BasePlot<StackedBarConfig> {
  public static getDefaultOptions: typeof StackedBarLayer.getDefaultOptions = StackedBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedBar';
    super.createLayers(layerProps);
  }
}
