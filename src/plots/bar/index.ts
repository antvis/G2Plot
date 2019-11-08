import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import BarLayer, { BarViewConfig } from './layer';

export interface BarConfig extends BarViewConfig, PlotConfig {}

export default class Bar<T extends BarConfig = BarConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof BarLayer.getDefaultOptions = BarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'bar';
    super.createLayers(layerProps);
  }
}
