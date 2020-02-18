import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import BarLayer, { BarViewConfig } from './layer';

export interface BarConfig extends BarViewConfig, PlotConfig {}

export default class Bar extends BasePlot<BarConfig> {
  public static getDefaultOptions: typeof BarLayer.getDefaultOptions = BarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'bar';
    super.createLayers(layerProps);
  }
}
