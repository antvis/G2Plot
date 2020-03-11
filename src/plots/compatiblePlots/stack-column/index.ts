import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import StackedColumnLayer, { StackedColumnViewConfig } from '../../stacked-column/layer';

export interface StackColumnConfig extends StackedColumnViewConfig, PlotConfig {}

export default class StackColumn extends BasePlot<StackColumnConfig> {
  public static getDefaultOptions: typeof StackedColumnLayer.getDefaultOptions = StackedColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedColumn';
    super.createLayers(layerProps);
    warning(false, 'Please use "StackedColumn" instead of "StackColumn" which was not recommended.');
  }
}
