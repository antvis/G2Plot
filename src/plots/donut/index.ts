import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import DonutLayer, { DonutViewConfig } from './layer';

export interface DonutConfig extends DonutViewConfig, PlotConfig {}

export default class Donut extends BasePlot<DonutConfig> {
  public static getDefaultOptions: typeof DonutLayer.getDefaultOptions = DonutLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'donut';
    super.createLayers(layerProps);
  }
}
