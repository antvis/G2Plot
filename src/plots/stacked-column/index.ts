import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackedColumnLayer, { StackedColumnViewConfig } from './layer';

export interface StackedColumnConfig extends StackedColumnViewConfig, PlotConfig {}

export default class StackedColumn extends BasePlot<StackedColumnConfig> {
  public static getDefaultOptions: typeof StackedColumnLayer.getDefaultOptions = StackedColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedColumn';
    super.createLayers(layerProps);
  }
}
