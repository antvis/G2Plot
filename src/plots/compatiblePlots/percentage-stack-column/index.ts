import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import PercentStackedColumnLayer, { PercentStackedColumnViewConfig } from '../../percent-stacked-column/layer';

export interface PercentageStackColumnConfig extends PercentStackedColumnViewConfig, PlotConfig {}

export default class PercentageStackColumn extends BasePlot<PercentageStackColumnConfig> {
  public static getDefaultOptions: typeof PercentStackedColumnLayer.getDefaultOptions =
    PercentStackedColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'percentStackedColumn';
    super.createLayers(layerProps);
    warning(false, 'Please use "PercentStackedColumn" instead of "PercentageStackColumn" which was not recommended.');
  }
}
