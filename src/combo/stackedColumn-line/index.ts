import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackedColumnLineLayer, { StackedColumnLineViewConfig } from './layer';

export interface StackedColumnLineConfig extends StackedColumnLineViewConfig, PlotConfig {}

export default class StackedColumnLine extends BasePlot<StackedColumnLineConfig> {
  public static getDefaultOptions: typeof StackedColumnLineLayer.getDefaultOptions =
    StackedColumnLineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedColumnLine';
    super.createLayers(layerProps);
  }
}
