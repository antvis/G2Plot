import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import StackedAreaLayer from '../../stacked-area/layer';
import { StackedAreaViewConfig } from '../../stacked-area/interface';

export interface StackAreaConfig extends StackedAreaViewConfig, PlotConfig {}

export default class StackArea extends BasePlot<StackAreaConfig> {
  public static getDefaultOptions: typeof StackedAreaLayer.getDefaultOptions = StackedAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedArea';
    super.createLayers(layerProps);
    warning(false, 'Please use "StackedArea" instead of "StackArea" which was not recommended.');
  }
}
